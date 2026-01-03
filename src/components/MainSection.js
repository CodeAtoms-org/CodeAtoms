"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";
import SearchBar from "./Searchbar";

export default function ToolsSection() {
  const [tools, setTools] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loadingBar = useRef(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("home", "yes")
      .eq("done", "yes")
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


  const handleCardClick = (uid) => {
    setPageLoading(true);
    loadingBar.current.continuousStart();
    router.push(`/${uid}`);
  };

  // 🎨 Gradient banner styles (20 modern palettes)
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

  // ✅ Flatten tags
  // ✅ Flatten tags (exclude OPEN SOURCE from filtering tags)
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

  // ➕ Manually append OPEN SOURCE as last CTA tag
  const FINAL_TAGS = [...baseTags, "OPEN SOURCE"];


  // ✅ Filter tools
  const filteredTools =
    selectedTag === "All"
      ? tools
      : tools.filter(
        (tool) => Array.isArray(tool.type) && tool.type.includes(selectedTag)
      );


  const groupedTools = {};
  tools.forEach((tool) => {
    if (Array.isArray(tool.type)) {
      tool.type.forEach((tag) => {
        if (!groupedTools[tag]) groupedTools[tag] = [];
        if (groupedTools[tag].length < 4) groupedTools[tag].push(tool);
      });
    }
  });

  const typeOrder = [
    "PRODUCTIVITY",
    "AI TOOL",
    "API",
    "CLI TOOL",
    "MACOS APP",

  ];

  const sortedTypes = Object.keys(groupedTools).sort((a, b) => {
    const indexA = typeOrder.indexOf(a);
    const indexB = typeOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // 🌈 Helper: get random gradient for each card
  const getRandomGradient = () =>
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <>
    <SearchBar />
    <section className="px-6 md:mx-20 py-10 rounded-md bg-white">
      <Link href="/explore">
        <p className="text-center mb-10 text-xl hover:underline underline-offset-2 font-medium">
          Explore
        </p>
      </Link>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#000" size={45} />
        </div>
      ) : tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-700 text-lg font-medium">
            We are currently building this platform.
          </p>
          <p className="text-gray-500 mt-2">
            Please give us 48 hours till we make it.
          </p>
        </div>
      ) : (
        <>
          {/* TAGS */}
          <div className="flex flex-wrap mx-4 md:mx-10 gap-3 mb-10">
            {FINAL_TAGS.map((tag) => {
              // 🚀 OPEN SOURCE → redirect CTA
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

              return (
                <button
  key={tag}
  onClick={() => {
    router.push(`/explore?tag=${encodeURIComponent(tag)}`);
  }}
  className="px-4 py-2 rounded-full border transition-all text-gray-700 hover:bg-gray-100"
>
  {tag}
</button>

              );
            })}

          </div>

          {/* ALL TOOLS VIEW */}
          {selectedTag === "All" ? (
            sortedTypes.map((type) => (
              <div key={type} className="mb-10">
                <Link href={`/explore`}>
                  <h2 className="text-xl hover:text-[#006D77] mb-6 px-4 md:px-10 text-gray-600 capitalize pb-2 underline underline-offset-2">
                    {type}
                  </h2>
                </Link>

                <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {groupedTools[type].map((tool) => {
                    const bg = getRandomGradient();
                    return (
                      <div
                        key={tool.id}
                        onClick={() => handleCardClick(tool.uid)}
                        className="group relative bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg overflow-hidden"
                      >
                        {tool.featured === "yes" && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
                            ⭐ Featured
                          </div>
                        )}
                        {/* Gradient Header */}
                        <div
                          className="h-10 w-full rounded-t-2xl"
                          style={{ background: bg }}
                        ></div>

                        <div className="p-6 flex-grow">
                          <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {tool.owner}
                          </p>
                          <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
                            {tool.description}
                          </p>

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
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            // FILTERED VIEW
            <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredTools.slice(0, 8).map((tool) => {
                const bg = getRandomGradient();
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleCardClick(tool.uid)}
                    className="group relative bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg overflow-hidden"
                  >
                    {tool.featured === "yes" && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
                        ⭐ Featured
                      </div>
                    )}
                    <div
                      className="h-10 w-full rounded-t-2xl"
                      style={{ background: bg }}
                    ></div>

                    <div className="p-6 flex-grow">
                      <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
                      <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
                        {tool.description}
                      </p>

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
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      <LoadingBar className="gradient-bar" ref={loadingBar} />

    </section>
    </>
  );
}
