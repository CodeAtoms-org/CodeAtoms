"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "@/components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";

import "./style.css";
import { Flag } from "lucide-react";

import "../globals.css";

export default function ToolClient({ tool }) {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    const docsRef = useRef(null);
    const reviewsRef = useRef(null);
    const [activeTab, setActiveTab] = useState("docs");

    const [alreadyPurchased, setAlreadyPurchased] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const REPORT_CATEGORIES = [
        "Tool does not work / Misleading",
        "Security / Malware / Data Risk",
        "Not a developer tool / Policy violation",
    ];

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportCategory, setReportCategory] = useState("");
    const [reportMessage, setReportMessage] = useState("");
    const [reportSubmitting, setReportSubmitting] = useState(false);

    const handleSubmitReport = async () => {
        if (!user) {
            toast.error("Please log in to report this tool");
            return;
        }

        if (!reportCategory || !reportMessage.trim()) {
            toast.error("Please select a category and add a message");
            return;
        }

        const weightage = alreadyPurchased ? 1 : 0.2;

        setReportSubmitting(true);

        const { error } = await supabase.from("reports").insert({
            tool_uid: tool.uid,
            user_uid: user.id,
            category: reportCategory,
            message: reportMessage,
            weightage,
        });

        setReportSubmitting(false);

        if (error) {
            toast.error("You have already reported this tool");
            return;
        }

        toast.success("Report submitted. Thank you for helping keep the platform safe.");

        // reset + close
        setReportCategory("");
        setReportMessage("");
        setShowReportModal(false);
    };



    useEffect(() => {
        if (!user) return;

        const fetchUserProfile = async () => {
            const { data, error } = await supabase
                .from("user_data")
                .select("name, purchased_tools")
                .eq("user_uid", user.id)
                .single();

            if (!error) {
                setUserProfile(data);
                if (data?.purchased_tools?.includes(tool.uid)) {
                    setAlreadyPurchased(true);
                }
            }
        };

        fetchUserProfile();
    }, [user, tool?.uid]);




    useEffect(() => {
        if (!tool?.uid) return;

        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from("reviews")
                .select("*")
                .eq("tool_uid", tool.uid)
                .order("created_at", { ascending: false });

            if (!error) setReviews(data || []);
        };

        fetchReviews();
    }, [tool?.uid]);


    const handleSubmitReview = async () => {
        if (!user || !userProfile) {
            toast.error("Please log in to review");
            return;
        }

        if (!reviewText.trim()) {
            toast.error("Review cannot be empty");
            return;
        }

        const weightage = alreadyPurchased ? 1 : 0.2;

        const { error } = await supabase.from("reviews").insert({
            tool_uid: tool.uid,
            user_uid: user.id,
            user_name: userProfile.name, // 🔥 FROM user_data
            review: reviewText,
            rating,
            weightage,
        });

        if (error) {
            toast.error("You have already reviewed this tool");
            return;
        }

        toast.success("Review submitted");

        setReviewText("");
        setRating(5);
        fetchReviews();
    };


    const fetchReviews = async () => {
        const { data } = await supabase
            .from("reviews")
            .select("*")
            .eq("tool_uid", tool.uid)
            .order("weightage", { ascending: false })
            .order("created_at", { ascending: false });

        setReviews(data || []);
    };

    useEffect(() => {
        if (tool?.uid) fetchReviews();
    }, [tool?.uid]);



    // Fetch current user
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        fetchUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // Check if purchased
    useEffect(() => {
        if (!user || !tool?.uid) return;

        const checkPurchased = async () => {
            const { data, error } = await supabase
                .from("user_data")
                .select("purchased_tools")
                .eq("user_uid", user.id)
                .single();

            if (!error && data?.purchased_tools?.includes(tool.uid)) {
                setAlreadyPurchased(true);
            }
        };

        checkPurchased();
    }, [user, tool?.uid]);

    const handleBuy = async () => {
        if (!user) {
            toast.error("Please log in to buy this tool!");
            window.location.href = "/onboard";
            return;
        }

        toast.success("Payment successful!");
        setLoading(true);

        const { data: userData, error: fetchError } = await supabase
            .from("user_data")
            .select("purchased_tools")
            .eq("user_uid", user.id)
            .single();

        if (fetchError) {
            toast.error("Could not fetch your account info. Please try again.");
            setLoading(false);
            return;
        }

        const existingTools = userData?.purchased_tools || [];
        if (existingTools.includes(tool.uid)) {
            toast.error("You already own this tool!");
            setAlreadyPurchased(true);
            setLoading(false);
            return;
        }

        const updatedTools = [...existingTools, tool.uid];

        const { error: updateError } = await supabase
            .from("user_data")
            .update({ purchased_tools: updatedTools })
            .eq("user_uid", user.id);

        setLoading(false);

        if (updateError) {
            toast.error("Something went wrong while saving your purchase.");
        } else {
            toast.success("Order saved successfully");
            setAlreadyPurchased(true);
        }
    };

    const handleDownload = () => {
        window.open(tool.download, "_blank");
    };

    if (!tool) return <Loading />;

    return (
        <>
            <div className="min-h-screen flex flex-col mt-10 md:mt-20 px-4 md:px-16">
                <div className="w-full bg-white rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-4xl text-gray-900 ">
                            {tool.title}
                        </h1>

                        <button
                            onClick={() => {
                                setShowReportModal(true);
                            }}
                            className="flex items-center gap-1 text-sm text-[#006D77] italic hover:text-[#004F56] transition cursor-pointer"
                        >
                            <Flag size={14} />
                            Report tool
                        </button>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {Array.isArray(tool.type) && tool.type.length > 0 ? (
                            tool.type.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-sm font-medium text-white bg-[#006D77] px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm font-medium text-white bg-gray-400 px-3 py-1 rounded-full">
                                Dev Tools
                            </span>
                        )}
                    </div>


                    <div className="h-10"></div>
                    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 mb-20">
                        <div className="flex gap-10 text-lg font-medium ">
                            <button
                                onClick={() => {
                                    setActiveTab("docs");
                                    docsRef.current?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`pb-3 relative ${activeTab === "docs"
                                    ? "text-[#1f4fd8]"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                Documentation
                                {activeTab === "docs" && (
                                    <span className="absolute left-0 -bottom-[1px] h-[3px] w-full bg-[#1f4fd8]" />
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    setActiveTab("reviews");
                                    reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`pb-3 relative ${activeTab === "reviews"
                                    ? "text-[#1f4fd8]"
                                    : "text-gray-500 hover:text-gray-800"
                                    }`}
                            >
                                Community Reviews ({reviews.length})
                                {activeTab === "reviews" && (
                                    <span className="absolute left-0 -bottom-[1px] h-[3px] w-full bg-[#1f4fd8]" />
                                )}
                            </button>
                        </div>
                    </div>



                    {/* Two-column layout */}
                    <div className="flex flex-col-reverse md:flex-row md:items-start gap-12 mb-10 ">

                        {/* Markdown (Left Half) */}
                        <div
                            ref={docsRef}
                            className="w-full md:w-2/3 prose text-lg prose-invert markdown-body text-black max-w-none"
                        >
                            {tool.content && (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {tool.content}
                                </ReactMarkdown>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="w-full md:w-1/3 text-black space-y-6 self-start flex justify-center">

                            <div className="flex flex-col bg-[#f0f0f0]  rounded-2xl p-8  sm:flex-col gap-2 w-full justify-center">

                                {/* Conditional Download or Purchase */}
                                {alreadyPurchased ? (
                                    <>
                                        {/* 🔥 Map all download keys */}
                                        <p>You can Download:</p>
                                        {tool.download && typeof tool.download === "object" ? (
                                            Object.entries(tool.download).map(([platform, url]) => (
                                                <button
                                                    key={platform}
                                                    onClick={() => window.open(url, "_blank")}
                                                    className="w-full px-6 py-3 bg-[#006D77] hover:bg-[#00545C] text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
                                                >
                                                    {platform}
                                                </button>
                                            ))
                                        ) : (
                                            <button
                                                onClick={() => handleDownload()}
                                                className="w-full px-6 py-3 bg-[#006D77] hover:bg-[#00545C] text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
                                            >
                                                Download
                                            </button>
                                        )}

                                        <p className="text-gray-600 italic text-sm text-start mb-2">
                                            Purchased ✓
                                        </p>
                                    </>
                                ) : (
                                    <div>
                                        <p className="mb-4 text-[#00545C] font-bold">Price in INR: {tool.price}</p>
                                        <button
                                            onClick={handleBuy}
                                            className={`w-full px-6 py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
              ${user ? "bg-[#006D77] hover:bg-[#00545C]" : "bg-gray-400 cursor-not-allowed"}`}
                                            disabled={!user}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                )}

                                {/* Login message */}
                                {!user && (
                                    <p className="text-gray-500 italic text-sm text-start mb-2">
                                        *Login to purchase*
                                    </p>
                                )}

                                {/* View Demo Button */}
                                {/* View Demo OR Customer Support */}
{alreadyPurchased ? (
  <button
  onClick={() =>
    window.location.href = `/customer-support?tool=${tool.uid}`
  }
  className="w-full px-6 py-3 bg-transparent border-2 border-[#006D77] text-[#006D77] font-semibold rounded-xl hover:bg-[#006D77] hover:text-white shadow-md transition-all duration-300 transform hover:scale-105"
>
  Talk to Customer Support
</button>

) : (
  tool.link && tool.link.trim() !== "" && (
    <button
      onClick={() => window.open(tool.link, "_blank")}
      className="w-full px-6 py-3 bg-transparent border-2 border-[#006D77] text-[#006D77] font-semibold rounded-xl hover:bg-[#006D77] hover:text-white shadow-md transition-all duration-300 transform hover:scale-105"
    >
      View Demo
    </button>
  )
)}

                                {tool.license && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                                            License
                                        </h3>
                                        <p className="text-sm text-gray-600 bg-white border rounded-lg px-3 py-2">
                                            {tool.license}
                                        </p>
                                    </div>
                                )}

                                {/* 🔌 Integration */}
                                {tool.integration && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                                            Integration
                                        </h3>

                                        <div className="text-sm text-gray-600 bg-white border rounded-lg px-3 py-2 whitespace-pre-line leading-relaxed">
                                            {tool.integration}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* 📄 License */}


                        </div>

                    </div>
                    {/* ⭐ Reviews Section */}
                    <div ref={reviewsRef} className="mt-20 scroll-mt-32">
                        <h2 className="text-2xl font-semibold mb-6">
                            Community Reviews ({reviews.length})
                        </h2>

                        {/* ✍️ Write Review */}
                        {user && userProfile && (
                            <div className="bg-gray-50 p-5 rounded-xl mb-8">
                                <p className="font-medium text-gray-700 mb-2">
                                    Reviewing as <span className="text-[#006D77]">{userProfile.name}</span>
                                </p>

                                {/* Rating */}
                                <div className="mb-3">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                                    }`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>

                                </div>

                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    rows={4}
                                    placeholder="Write a detailed, honest review..."
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#006D77]"
                                />

                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-xs text-gray-500 italic">
                                        {alreadyPurchased ? "(Verified Purchase)" : "(Unverified Purchase)"}
                                    </p>

                                    <button
                                        onClick={handleSubmitReview}
                                        className="px-4 py-2 bg-[#006D77] text-white rounded-lg hover:bg-[#00545C]"
                                    >
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        )}

                        {!user && (
                            <p className="italic text-gray-500">
                                Log in to write a review.
                            </p>
                        )}

                        {/* 🧾 Review List */}
                        {/* 🧾 Review List / Empty State */}
                        {reviews.length === 0 ? (
                            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
                                <p className="text-gray-600 font-medium">
                                    No reviews yet
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Be the first to share your experience with this tool.
                                </p>
                            </div>
                        ) : (
                            <>
                                {(showAllReviews ? reviews : reviews.slice(0, 3)).map((r) => (
                                    <div key={r.id} className="p-4 bg-gray-50 mb-4 rounded-lg">
                                        <div className="flex justify-between mb-1">
                                            <p className="font-medium">{r.user_name}</p>
                                            <span className="text-xs text-gray-500">
                                                {r.weightage === 1 ? "Verified Purchase" : "Unverified"}
                                            </span>
                                        </div>

                                        {r.rating && (
                                            <div className="text-yellow-400 mb-1">
                                                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                            </div>
                                        )}

                                        <p className="text-gray-700">{r.review}</p>
                                    </div>
                                ))}

                                {reviews.length > 3 && (
                                    <button
                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                        className="text-[#006D77] underline mt-4"
                                    >
                                        {showAllReviews ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
            {/* 🚩 Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xl font-semibold mb-4">
                            Report this tool
                        </h3>

                        {/* Category */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Reason *
                            </label>
                            <select
                                value={reportCategory}
                                onChange={(e) => setReportCategory(e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">Select a reason</option>
                                {REPORT_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Message */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Details *
                            </label>
                            <textarea
                                rows={4}
                                value={reportMessage}
                                onChange={(e) => setReportMessage(e.target.value)}
                                placeholder="Please describe the issue in detail..."
                                className="w-full border rounded-lg p-2 resize-none"
                            />
                        </div>


                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitReport}
                                disabled={reportSubmitting}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                            >
                                {reportSubmitting ? "Submitting..." : "Submit Report"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
