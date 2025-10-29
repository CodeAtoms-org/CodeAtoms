"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import toast from 'react-hot-toast';
import { Toaster } from "react-hot-toast";

export default function UploadTool() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "", // ✅ user’s name (will be used as owner)
    title: "",
    description: "",
    type: [],
    content: "",
    buynow: "",
    link: "",
    price: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const predefinedTags = [
  "API",
  "SAAS",
  "CLI TOOL",
  "VS CODE EXTENSION",
  "REACT COMPONENT",
  "NPM PACKAGE",
  "AI TOOL",
  "MACOS APP",
  "DEV UTILITY",
  "MOBILE DEVELOPMENT",
  "DESIGN TOOL",
  "OPEN SOURCE",
];


  // Check if user is logged in
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/onboard");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push("/onboard");
      else setUser(session.user);
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.name || !form.title || form.type.length === 0) {
    setError("Name, Title, and at least one Tag are required!");
    return;
  }

  setSubmitting(true);

  // Convert JS array → PostgreSQL array format for text[]
  const formattedTags = `{${form.type.map(tag => `"${tag}"`).join(",")}}`;

  const { error: insertError } = await supabase.from("tools").insert([
    {
      owner: form.name,
      owner_uid: user?.id,
      title: form.title,
      description: form.description,
      type: formattedTags, // ✅ send in correct Postgres array syntax
      content: form.content,
      download: form.buynow,
      link: form.link,
      price: form.price,
    },
  ]);

  setSubmitting(false);

  if (insertError) {
    setError(insertError.message);
  } else {
    router.push("/profile");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
        <h1 className="text-3xl font-bold mb-6">Upload Your Tool</h1>

        <p className="text-gray-600 text-lg mb-10 mt-4">
          You can refer to the Publishing guide
          <a
            href="/guides/how-to-publish-your-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#006D77] font-medium hover:underline ml-1"
          >
            here
          </a>.
        </p>

        <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
          {error && <p className="text-red-500 mb-4 font-medium">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* ✅ Owner Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="E.g., Abhinav Sharma"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                required
              />
            </div>

            {/* Multiple Tags Input for Type */}
            {/* Tags / Type Field */}
<div>
  <label className="block text-gray-700 font-medium mb-1">
    Tags / Type *
  </label>

  {/* Tag Chips */}
  <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#006D77]">
    {form.type.map((tag, index) => (
      <span
        key={index}
        className="bg-[#E0F2F1] text-[#006D77] px-3 py-1 rounded-full text-sm flex items-center gap-1"
      >
        {tag}
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              type: prev.type.filter((_, i) => i !== index),
            }))
          }
          className="text-[#006D77] hover:text-red-500 font-bold ml-1"
        >
          ×
        </button>
      </span>
    ))}

    {/* Custom Tag Input */}
    <input
      type="text"
      placeholder={
        form.type.length >= 3
          ? "Maximum 3 tags allowed"
          : "Type and press Enter"
      }
      disabled={form.type.length >= 3}
      className="flex-grow outline-none p-1 disabled:opacity-50"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          e.preventDefault();
          const newTag = e.target.value.trim().toUpperCase();
          if (
            !form.type.includes(newTag) &&
            form.type.length < 3
          ) {
            setForm((prev) => ({
              ...prev,
              type: [...prev.type, newTag],
            }));
          }
          e.target.value = "";
        }
      }}
    />
  </div>

  {/* Dropdown for Predefined Tags */}
  <select
    onChange={(e) => {
      const selectedTag = e.target.value;
      if (
        selectedTag &&
        !form.type.includes(selectedTag) &&
        form.type.length < 3
      ) {
        setForm((prev) => ({
          ...prev,
          type: [...prev.type, selectedTag],
        }));
      }
      e.target.value = ""; // reset dropdown
    }}
    disabled={form.type.length >= 3}
    className="mt-3 w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77] disabled:opacity-50"
  >
    <option value="">
      {form.type.length >= 3
        ? "Maximum 3 tags selected"
        : "Select Tags"}
    </option>
    {predefinedTags.map((tag) => (
      <option key={tag} value={tag}>
        {tag}
      </option>
    ))}
  </select>
</div>




            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Content / Markdown</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                rows={5}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Download URL *</label>
              <input
                type="url"
                name="buynow"
                value={form.buynow}
                onChange={handleChange}
                onBlur={(e) => {
                  try {
                    new URL(e.target.value);
                  } catch {
                    toast.error("Please enter a valid Download URL");
                    e.target.focus();
                  }
                }}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="https://example.com/download"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Demo / Tool Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                onBlur={(e) => {
                  const value = e.target.value.trim();
                  if (value.length === 0) return; // Skip validation if empty
                  try {
                    new URL(value);
                  } catch {
                    toast.error("Please enter a valid Demo / Tool URL");
                    e.target.focus();
                  }
                }}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="https://example.com/demo"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (in INR)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="E.g., 199.99"
                min="0"
                step="0.01"
              />
            </div>


            <button
              type="submit"
              disabled={submitting}
              className="mt-4 bg-[#006D77] hover:bg-[#005d66] text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {submitting ? "Uploading..." : "Upload Tool"}
            </button>
          </form>
        </div>
      </div>

      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <Footer />
    </>
  );
}
