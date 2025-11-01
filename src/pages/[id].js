"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Header from "@/components/Header";
import "../app/globals.css";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./style.css";
import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";
import Head from "next/head";


export default function ToolPage() {
  const router = useRouter();
  const { id } = router.query; // uid of the tool
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

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

  // Fetch tool data
  useEffect(() => {
    if (!id) return;

    const fetchTool = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("uid", id)
        .single();

      if (error) console.error("Error fetching tool:", error.message);
      else setTool(data);

      setLoading(false);
    };

    fetchTool();
  }, [id]);

  // Check if purchased
  useEffect(() => {
    if (!user || !id) return;

    const checkPurchased = async () => {
      const { data, error } = await supabase
        .from("user_data")
        .select("purchased_tools")
        .eq("user_uid", user.id)
        .single();

      if (!error && data?.purchased_tools?.includes(id)) {
        setAlreadyPurchased(true);
      }
    };

    checkPurchased();
  }, [user, id]);

  if (loading) return <Loading />;

  if (!tool) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen text-gray-700">
          <p>Tool not found.</p>
        </div>
      </>
    );
  }

  // Handle Buy simulation
  const handleBuy = async () => {
    if (!user) {
      toast.error("Please log in to buy this tool!");
      router.push("/onboard");
      return;
    }

    // Simulate payment success
    toast.success("Payment successful!");

    // Fetch the current purchased tools
    const { data: userData, error: fetchError } = await supabase
      .from("user_data")
      .select("purchased_tools")
      .eq("user_uid", user.id)
      .single();

    if (fetchError) {

      toast.error("Could not fetch your account info. Please try again.");
      return;
    }

    const existingTools = userData?.purchased_tools || [];

    // Avoid duplicates
    if (existingTools.includes(id)) {
      toast.error("You already own this tool!");
      setAlreadyPurchased(true);
      return;
    }

    const updatedTools = [...existingTools, id];

    // Update the array in Supabase
    const { error: updateError } = await supabase
      .from("user_data")
      .update({ purchased_tools: updatedTools })
      .eq("user_uid", user.id);

    if (updateError) {
      console.error("Error updating purchases:", updateError);
      toast.error("Something went wrong while saving your purchase.");
    } else {
      toast.success("Order saved successfully");
      setAlreadyPurchased(true);
    }
  };


  // Handle download
  const handleDownload = () => {
    window.open(tool.download, "_blank");
  };

  return (
    <>
    <Head>
  <title>{tool.title} | CodeAtoms</title>
  <meta name="description" content={tool.description?.slice(0, 150) || "Explore this developer tool on CodeAtoms"} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={tool.title} />
  <meta property="og:description" content={tool.description?.slice(0, 150) || "Check out this developer tool on CodeAtoms!"} />
  <meta property="og:url" content={`https://www.codeatoms.org/tools/${id}`} />

  {/* Dynamic OG Image */}
  <meta
    property="og:image"
    content={`http://localhost:3000/api/og?title=${encodeURIComponent(tool.title)}&description=${encodeURIComponent(tool.description?.slice(0, 100) || "")}`}
  />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={tool.title} />
  <meta name="twitter:description" content={tool.description?.slice(0, 150) || "Explore this developer tool on CodeAtoms"} />
  <meta
    name="twitter:image"
    content={`https://www.codeatoms.org/api/og?title=${encodeURIComponent(tool.title)}&description=${encodeURIComponent(tool.description?.slice(0, 100) || "")}`}
  />
</Head>

      <Header />
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

          <hr className="mt-10 max-w-2xl"></hr>
          <div className="h-20"></div>

          {/* Two-column layout */}
          <div className="flex flex-col-reverse md:flex-row gap-8">
            {/* Markdown (Left Half) */}
            <div className="w-full md:w-2/3 prose text-lg prose-invert markdown-body text-black max-w-none">
              {tool.content && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {tool.content}
                </ReactMarkdown>
              )}
            </div>

            {/* Right Column */}
            <div className="w-full h-full md:w-1/3 bg-[#f0f0f0] text-black flex flex-col items-center justify-center rounded-2xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-col gap-2 w-full justify-center">

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
      <Footer />
    </>
  );
}
