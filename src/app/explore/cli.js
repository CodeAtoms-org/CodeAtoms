"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ExploreSection() {
  const [tools, setTools] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching tools:", error);
    else setTools(data || []);
    setLoading(false);
  };

  // ✅ Flatten tags from Postgres text[] arrays
  const tags = [
    "All",
    ...new Set(
      tools.flatMap((tool) => (Array.isArray(tool.type) ? tool.type : []))
    ),
  ];

  // ✅ Filter by tag (works for multiple tags per tool)
  const filteredTools =
    selectedTag === "All"
      ? tools
      : tools.filter(
          (tool) =>
            Array.isArray(tool.type) && tool.type.includes(selectedTag)
        );

  // ✅ Group tools by type for All view
  const groupedTools = {};
  tools.forEach((tool) => {
    if (Array.isArray(tool.type)) {
      tool.type.forEach((tag) => {
        if (!groupedTools[tag]) groupedTools[tag] = [];
        groupedTools[tag].push(tool);
      });
    }
  });

  const typeOrder = ["API", "AI TOOL", "CLI TOOL", "MACOS APP", "OPEN SOURCE"];
  const sortedTypes = Object.keys(groupedTools).sort(
    (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b)
  );

  return (
    <>
      <Header />
      <section className="px-6 md:mx-20 pt-20 md:pt-10 rounded-md bg-white">
        {/* TAG FILTERS */}
        <div className="flex flex-col mx-4 md:mx-10 gap-3 mb-10">
          <p className="text-2xl mb-10 md:text-3xl text-center">
            Explore all tools here
          </p>

          <div className="flex flex-wrap gap-3 justify-start">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedTag === tag
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#000" size={45} />
          </div>
        ) : (
          <>
            {/* TOOL CARDS */}
            {selectedTag === "All" ? (
              sortedTypes.map((type) => (
                <div key={type} className="mb-10">
                  <h2 className="text-xl mb-6 px-4 md:px-10 text-gray-600 capitalize pb-2">
                    {type}
                  </h2>

                  <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {groupedTools[type].map((tool) => (
                      <motion.div
  key={tool.id}
  viewport={{ once: true }}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg"
>
  <div className="flex-grow">
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      {tool.owner}
    </p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77]">
      {tool.description}
    </p>
  </div>

  {/* ✅ Display tags neatly with wrapping */}
  {Array.isArray(tool.type) && tool.type.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">
      {tool.type.map((tag, i) => (
        <span
          key={i}
          className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 group-hover:text-[#006D77]"
        >
          {tag}
        </span>
      ))}
    </div>
  )}
</motion.div>

                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <motion.div
  key={tool.id}
  viewport={{ once: true }}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg"
>
  <div className="flex-grow">
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      {tool.owner}
    </p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77]">
      {tool.description}
    </p>
  </div>

  {/* ✅ Display tags neatly with wrapping */}
  {Array.isArray(tool.type) && tool.type.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-4">
      {tool.type.map((tag, i) => (
        <span
          key={i}
          className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 group-hover:text-[#006D77]"
        >
          {tag}
        </span>
      ))}
    </div>
  )}
</motion.div>

                ))}
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </>
  );
}
