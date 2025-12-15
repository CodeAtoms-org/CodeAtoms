"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingBar from "react-top-loading-bar";

export default function OpenSourcePage() {
  const [tools, setTools] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadingBar = useRef(null);

  const gradients = [
    "linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(90deg, #fccb90 0%, #d57eeb 100%)",
  ];

  const handleCardClick = (uid) => {
    loadingBar.current.continuousStart();
    router.push(`/${uid}`);
  };

  useEffect(() => {
    fetchOpenSourceTools();
  }, []);

  // 🔥 DB-LEVEL FILTERING
  const fetchOpenSourceTools = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .contains("type", ["OPEN SOURCE"])
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setTools([]);
    } else {
      setTools(data || []);
    }

    setLoading(false);
  };

  // 🏷️ Extract tags (excluding OPEN SOURCE)
  const tags = [
    "All",
    ...new Set(
      tools.flatMap((tool) =>
        Array.isArray(tool.type)
          ? tool.type.filter((t) => t !== "OPEN SOURCE")
          : []
      )
    ),
  ];

  // 🔍 Filter tools by tag
  const filteredTools =
    selectedTag === "All"
      ? tools
      : tools.filter(
          (tool) =>
            Array.isArray(tool.type) && tool.type.includes(selectedTag)
        );

  return (
    <>
      <Header />

      <section className="px-6 md:mx-20 pt-20 md:pt-10 bg-white">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl">
            Explore Open Source Tools
          </h1>
          <p className="text-gray-500 mt-2">
            Community-driven, transparent & free developer tools
          </p>
        </div>

        {/* TAG FILTERS */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedTag === tag
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#000" size={45} />
          </div>
        ) : filteredTools.length === 0 ? (
          <p className="text-center text-gray-500">
            No tools found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredTools.map((tool, index) => {
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={tool.id}
                  viewport={{ once: true }}
                  onClick={() => handleCardClick(tool.uid)}
                  className="group relative p-6 pt-14 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 rounded-xl hover:shadow-lg overflow-hidden"
                >
                  {/* FEATURED */}
                  {tool.featured === "yes" && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                      ⭐ Featured
                    </div>
                  )}

                  {/* GRADIENT */}
                  <div
                    className="absolute top-0 left-0 right-0 h-10 rounded-t-xl"
                    style={{ background: gradient }}
                  />

                  <div className="flex-grow">
                    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77]">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {tool.owner}
                    </p>
                    <p className="text-gray-500 mt-3 line-clamp-4">
                      {tool.description}
                    </p>
                  </div>

                  {/* TAGS */}
                  {Array.isArray(tool.type) && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tool.type
                        .filter((t) => t !== "OPEN SOURCE")
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 border border-gray-200 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <LoadingBar ref={loadingBar} />
      </section>

      <Footer />
    </>
  );
}
