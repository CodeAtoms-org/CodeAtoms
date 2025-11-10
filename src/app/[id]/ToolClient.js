"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loading from "@/components/Loading";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";
import "../globals.css";

export default function ToolClient({ tool }) {
    const [user, setUser] = useState(null);
    const [alreadyPurchased, setAlreadyPurchased] = useState(false);
    const [loading, setLoading] = useState(false);

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
                    <h1 className="text-4xl text-gray-900 mb-4">{tool.title}</h1>
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

                    <hr className="mt-10 max-w-xl"></hr>
                    <div className="h-20"></div>

                    {/* Two-column layout */}
<div className="flex flex-col-reverse md:flex-row md:items-start gap-12 mb-10 px-8 md:px-16 lg:px-22">




                        {/* Markdown (Left Half) */}
                        <div className="w-full md:w-2/3 prose text-lg prose-invert markdown-body text-black max-w-none">
                            {tool.content && (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {tool.content}
                                </ReactMarkdown>
                            )}
                        </div>

                        {/* Right Column */}
<div className="w-full md:w-2/3 text-black space-y-6 self-start flex justify-center">


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
                                {tool.link && tool.link.trim() !== "" && (
                                    <button
                                        onClick={() => window.open(tool.link, "_blank")}
                                        className="w-full px-6 py-3 bg-transparent border-2 border-[#006D77] text-[#006D77] font-semibold rounded-xl hover:bg-[#006D77] hover:text-white shadow-md transition-all duration-300 transform hover:scale-105"
                                    >
                                        View Demo
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Toaster position="top-right" toastOptions={{ duration: 5000 }} />

        </>
    );
}
