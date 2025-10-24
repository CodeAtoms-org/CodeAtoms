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

export default function ToolPage() {
  const router = useRouter();
  const { id } = router.query; // uid of the tool
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

      if (error) {
        console.error("Error fetching tool:", error.message);
      } else {
        setTool(data);
      }
      setLoading(false);
    };

    fetchTool();
  }, [id]);

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

  const handleBuy = () => {
    if (!user) {
      alert("Please log in to buy this tool!");
      router.push("/onboard");
      return;
    }
    window.open(tool.buynow, "_blank");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-10 md:mt-20 px-4 md:px-16">
        <div className="w-full bg-white rounded-2xl p-8">
          <h1 className="text-4xl text-gray-900 mb-4">{tool.title}</h1>
          <span className="text-sm font-medium text-white bg-[#006D77] px-3 py-1 rounded-full">
            {tool.type || "N/A"}
          </span>

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
              <div className="flex flex-col sm:flex-col gap-2 w-full justify-center ">
  {/* Buy Now Button */}
  <button
    onClick={handleBuy}
    className={`w-full px-6 py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105
      ${user ? "bg-[#006D77] hover:bg-[#00545C]" : "bg-gray-400 cursor-not-allowed"}`}
    disabled={!user}
  >
    Buy Now
  </button>

  {/* Login message */}
  {!user && (
    <p className="text-gray-500 italic text-sm text-start mb-2">
      *Login to purchase*
    </p>
  )}

  {/* View Demo Button */}
  <button
    onClick={() => window.open(tool.link, "_blank")}
    className="w-full px-6 py-3 bg-transparent border-2 border-[#006D77] text-[#006D77] font-semibold rounded-xl hover:bg-[#006D77] hover:text-white shadow-md transition-all duration-300 transform hover:scale-105"
  >
    View Demo
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
