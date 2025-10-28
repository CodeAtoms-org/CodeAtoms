"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ToolsSection() {
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

    if (error) console.error("Error fetching tools:", error);
    else setTools(data);

    setLoading(false);
  };

  const tags = ["All", ...new Set(tools.map((tool) => tool.type))];

  const filteredTools =
    selectedTag === "All"
      ? tools
      : tools.filter((tool) => tool.type === selectedTag);

  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.type]) acc[tool.type] = [];
    acc[tool.type].push(tool);
    return acc;
  }, {});

  const typeOrder = ["API", "AI", "Tool", "Tool2"];
  const sortedTypes = Object.keys(groupedTools).sort(
    (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b)
  );

  return (
    <>
    <Header />
    <section className="px-6 md:mx-20 py-20 rounded-md bg-white">
      
      {/* TAG FILTERS */}
      <div className="flex flex-wrap flex-col mx-4 md:mx-10 gap-3 mb-10">
        <p className="text-2xl mb-10 md:text-3xl text-center ">Explore all tools here </p>
        <div className=" flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedTag === tag
                ? "bg-black text-white"
                : " text-gray-700"
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
                <h2 className="text-xl mb-6 px-4 md:px-10 text-gray-600 capitalize pb-2 ">
                  {type}
                </h2>
                <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {groupedTools[type].map((tool) => (
                    <motion.div
  key={tool.id}
  viewport={{ once: true }}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between h-64 border border-gray-100 transition-colors duration-200"
>
  <div>
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1  transition-colors duration-200">
      {tool.owner}
    </p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.description}
    </p>
  </div>
  <p className="text-gray-600 mt-4 text-sm font-medium group-hover:text-[#006D77] transition-colors duration-200">
    {tool.type}
  </p>
</motion.div>

                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="mx-auto grid grid-cols-1 md:px-10 px-4  sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <motion.div
  key={tool.id}
  viewport={{ once: true }}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between h-64 border border-gray-100  transition-colors duration-200"
>
  <div>
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1 transition-colors duration-200">
      {tool.owner}
    </p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.description}
    </p>
  </div>
  <p className="text-gray-600 mt-4 text-sm font-medium group-hover:text-[#006D77] transition-colors duration-200">
    {tool.type}
  </p>
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
