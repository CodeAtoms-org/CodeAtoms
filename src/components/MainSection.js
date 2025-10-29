"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";

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
      .eq("home", "yes")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching tools:", error);
    else setTools(data || []);
    setLoading(false);
  };

  // ✅ Flatten all tags from text[] into a single array
  const tags = [
    "All",
    ...new Set(
      tools.flatMap((tool) => Array.isArray(tool.type) ? tool.type : [])
    ),
  ];

  // ✅ Filter tools by selected tag
  const filteredTools =
    selectedTag === "All"
      ? tools
      : tools.filter(
          (tool) =>
            Array.isArray(tool.type) && tool.type.includes(selectedTag)
        );

  // ✅ Group tools by type for “All” view
  const groupedTools = {};
  tools.forEach((tool) => {
    if (Array.isArray(tool.type)) {
      tool.type.forEach((tag) => {
        if (!groupedTools[tag]) groupedTools[tag] = [];
        if (groupedTools[tag].length < 4) groupedTools[tag].push(tool);
      });
    }
  });

  const typeOrder = ["API", "AI TOOL", "CLI TOOL", "MACOS APP", "OPEN SOURCE"];
  const sortedTypes = Object.keys(groupedTools).sort(
    (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b)
  );

  return (
    <section className="px-6 md:mx-20 py-10 rounded-md bg-white">
      <Link href="/explore">
        <p className="text-center mb-10 text-xl hover:underline underline-offset-2 font-medium">
          Explore
        </p>
      </Link>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#000" size={45} />
        </div>
      ) : tools.length === 0 ? (
        // EMPTY STATE MESSAGE
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
          {/* TAG FILTER BUTTONS */}
          <div className="flex flex-wrap mx-4 md:mx-10 gap-3 mb-10">
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

          {/* DISPLAY TOOLS */}
          {selectedTag === "All" ? (
            sortedTypes.map((type) => (
              <div key={type} className="mb-10">
                <Link href={`/explore`}>
                  <h2 className="text-xl hover:text-[#006D77] mb-6 px-4 md:px-10 text-gray-600 capitalize pb-2 underline underline-offset-2">
                    {type}
                  </h2>
                </Link>

                <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {groupedTools[type].map((tool) => (
                    <div
  key={tool.id}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg"
>
  <div className="flex-grow">
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.description}
    </p>
  </div>

  {/* ✅ Render tags neatly */}
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

                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="mx-auto grid grid-cols-1 md:px-10 px-4 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredTools.slice(0, 8).map((tool) => (
                <div
  key={tool.id}
  onClick={() => router.push(`/${tool.uid}`)}
  className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg"
>
  <div className="flex-grow">
    <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.title}
    </h3>
    <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
    <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
      {tool.description}
    </p>
  </div>

  {/* ✅ Render tags neatly */}
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

              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
