"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header";
import LoadingBar from "react-top-loading-bar";
import Footer from "@/components/Footer";

export default function ExploreSection() {
  const [tools, setTools] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const gradients = [
    "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)",
    "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(90deg, #fccb90 0%, #d57eeb 100%)",
    "linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(90deg, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)",
    "linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)",
    "linear-gradient(90deg, #00c6ff 0%, #0072ff 100%)",
    "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(90deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(90deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(90deg, #cfd9df 0%, #e2ebf0 100%)",
    "linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(90deg, #d299c2 0%, #fef9d7 100%)",
  ];
  const loadingBar = useRef(null);
  const [pageLoading, setPageLoading] = useState(false);

  const handleCardClick = (uid) => {
    setPageLoading(true);
    loadingBar.current.continuousStart();
    router.push(`/${uid}`);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from("tools")
    .select("*")
    .not("type", "cs", '{"OPEN SOURCE"}') // 🚫 exclude open source
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tools:", error);
    setTools([]);
  } else {
    setTools(data || []);
  }

  setLoading(false);
};


  // ✅ Flatten tags from Postgres text[] arrays
  // ✅ Base tags (exclude OPEN SOURCE from filters)
const baseTags = [
  "All",
  ...new Set(
    tools.flatMap((tool) =>
      Array.isArray(tool.type)
        ? tool.type.filter((t) => t !== "OPEN SOURCE")
        : []
    )
  ),
];

// ➕ Append OPEN SOURCE as last CTA tag
const FINAL_TAGS = [...baseTags, "OPEN SOURCE"];

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

  // ✅ Define the order in which you want the tags/groups to appear
  const typeOrder = [
    "PRODUCTIVITY",
    "AI TOOL",
    "API",
    "CLI TOOL",
    "MACOS APP",

  ];

  // ✅ Sort types so that those in `typeOrder` come first (in order),
  // and others appear afterward alphabetically.
  const sortedTypes = Object.keys(groupedTools).sort((a, b) => {
    const indexA = typeOrder.indexOf(a);
    const indexB = typeOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });


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
            {FINAL_TAGS.map((tag) => {
  // 🚀 OPEN SOURCE → redirect
  if (tag === "OPEN SOURCE") {
    return (
      <button
        key={tag}
        onClick={() => router.push("/opensource")}
        className="px-4 py-2 rounded-full border border-[#006D77]  text-[#006D77] hover:border-black transition-all"
      >
OPEN SOURCE
      </button>
    );
  }

  // 🔍 Normal filtering tags
  return (
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
  );
})}

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
                    {groupedTools[type].map((tool, index) => {
                      const gradient = gradients[index % gradients.length]; // assign gradient per card

                      return (
                        <motion.div
                          key={tool.id}
                          viewport={{ once: true }}
                          onClick={() => handleCardClick(tool.uid)}
                          className="group relative p-6 pt-14 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg overflow-hidden"
                        >
                          {tool.featured === "yes" && (
    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
      ⭐ Featured
    </div>
  )}
                          {/* 🌈 Gradient Banner */}
                          <div
                            className="absolute top-0 left-0 right-0 h-10 rounded-t-xl"
                            style={{ background: gradient }}
                          />

                          <div className="flex-grow">
                            <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
                              {tool.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
                            <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
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
                      );
                    })}


                  </div>
                </div>
              ))
            ) : (
              <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredTools.map((tool, index) => {
                  const gradient = gradients[index % gradients.length]; // pick gradient dynamically

                  return (
                    <motion.div
                      key={tool.id}
                      viewport={{ once: true }}
                      onClick={() => handleCardClick(tool.uid)}
                      className="group relative bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg overflow-hidden"
                    >
                      {/* 🌈 Gradient Banner (Normal Flow) */}
                      {tool.featured === "yes" && (
    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
      ⭐ Featured
    </div>
  )}

                      <div
                        className="h-10 w-full rounded-t-2xl"
                        style={{ background: gradient }}
                      ></div>

                      <div className="p-6 flex-grow">
                        <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
                        <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
                          {tool.description}
                        </p>

                        {/* ✅ Display tags neatly with wrapping */}
                        {Array.isArray(tool.type) && tool.type.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {tool.type.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full group-hover:text-[#006D77]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}


              </div>
            )}
          </>
        )}
        <LoadingBar className="gradient-bar" ref={loadingBar} />
      </section>
      <Footer />
    </>
  );
}
