"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase";
import { Search, X, Send } from "lucide-react";
import toast from "react-hot-toast";

import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch";

import { searchClient } from "../../algolia";
import { useRouter } from "next/navigation";
import { useSearchBox } from "react-instantsearch";

function ConditionalHits({ hitComponent }) {
  const { query } = useSearchBox();

  if (!query || query.trim().length === 0) {
    return null; // 👈 hide when empty
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl max-h-80 overflow-y-auto border">
      <Hits hitComponent={hitComponent} />
    </div>
  );
}


/* ---------------- HIT COMPONENT ---------------- */

function Hit({ hit }) {
  const router = useRouter();

  return (
    <div
  className="px-4 py-3 cursor-pointer hover:bg-gray-100"
  onClick={() => router.push(`/${hit.uid}`)}
>
  {/* Title + Price row */}
  <div className="flex items-start justify-between gap-4">
    <h3 className="font-semibold text-gray-800 truncate">
      {hit.title}
    </h3>

    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
      {hit.price === 0 ? "Free" : `₹${hit.price}`}
    </span>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
    {hit.description}
  </p>

  {/* Tags / Type */}
  {hit.type && (
    <div className="text-xs text-[#006D77] mt-1">
      {Array.isArray(hit.type)
        ? hit.type.join(" • ")
        : hit.type}
    </div>
  )}
</div>

  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Tell me what kind of tool you are looking for.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  const handleOpenChat = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      toast.error("Login to chat");
      return;
    }
    setOpen(true);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEARCH BAR */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mt-10 px-4 sm:px-6 md:px-20"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full mb-10">
          <div className="relative flex-1 w-full rounded-xl border bg-white z-10">
  {/* Left search icon */}
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

  {/* Right Algolia logo */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
    <span className="text-[10px] text-gray-400 hidden sm:inline">
      Search by
    </span>
    <img
      src="/algolia.svg"
      alt="Algolia"
      className="h-10 opacity-80"
    />
  </div>

  <InstantSearch searchClient={searchClient} indexName="tools">
    <Configure hitsPerPage={3} />

    <SearchBox
      placeholder="Search tools, features, or use-cases..."
      classNames={{
        root: "w-full",
        form: "relative w-full",
        input:
          "w-full pl-12 px-2 py-3 rounded-xl focus:outline-none border-0", // 👈 extra right padding
        submit: "hidden",
        reset: "hidden",
      }}
    />

    <ConditionalHits hitComponent={Hit} />
  </InstantSearch>
</div>

          
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenChat}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#006D77] to-[#00A896] text-white font-medium shadow-md"
          >
            Help me find the right tool
          </motion.button>
        </div>
      </motion.div>

      {/* CHAT MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg h-[70vh] rounded-2xl shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="font-semibold">
                  Help me find the right tool
                </h2>
                <button onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.role === "user"
                        ? "ml-auto bg-[#00A896] text-white"
                        : "bg-gray-100"
                      }`}
                  >
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <div className="text-sm text-gray-400">
                    Thinking…
                  </div>
                )}
              </div>

              <div className="p-3 border-t flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage()
                  }
                  placeholder="Describe your use case..."
                  className="flex-1 border rounded-xl px-4 py-2 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#00A896] text-white p-2 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



    </>
  );
}
