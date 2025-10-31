"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function UploadTool() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    type: [],
    content: "",
    link: "",
    price: "",
  });

  // ✅ Multiple download links (up to 5)
  const [downloads, setDownloads] = useState([{ platform: "", url: "" }]);

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

  // Auth check
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) router.push("/onboard");
      else setUser(session.user);
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push("/onboard");
      else setUser(session.user);
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle adding/removing multiple download links
  const handleDownloadChange = (index, field, value) => {
    const updated = [...downloads];
    updated[index][field] = value;
    setDownloads(updated);
  };

  const addDownload = () => {
    if (downloads.length >= 5) {
      toast.error("You can add up to 5 download links only.");
      return;
    }
    setDownloads([...downloads, { platform: "", url: "" }]);
  };

  const removeDownload = (index) => {
    const updated = downloads.filter((_, i) => i !== index);
    setDownloads(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.title || form.type.length === 0) {
      setError("Name, Title, and at least one Tag are required!");
      return;
    }

    // ✅ Validate download URLs
    for (const d of downloads) {
      if (!d.platform || !d.url) {
        setError("All download entries must have both platform and URL!");
        return;
      }
      try {
        new URL(d.url);
      } catch {
        setError(`Invalid URL: ${d.url}`);
        return;
      }
    }

    setSubmitting(true);

    // Convert array to Postgres-compatible text[]
    const formattedTags = `{${form.type.map(tag => `"${tag}"`).join(",")}}`;

    // ✅ Convert to JSON object
    const downloadJSON = {};
    downloads.forEach(d => {
      downloadJSON[d.platform.trim()] = d.url.trim();
    });

    const { error: insertError } = await supabase.from("tools").insert([
      {
        owner: form.name,
        owner_uid: user?.id,
        title: form.title,
        description: form.description,
        type: formattedTags,
        content: form.content,
        download: downloadJSON, // ✅ Upload as JSON
        link: form.link,
        price: form.price ? Number(form.price) : 0,
      },
    ]);

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      toast.success("Tool uploaded successfully!");
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

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Tags / Type *</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {form.type.map((tag, i) => (
                  <span key={i} className="bg-[#E0F2F1] text-[#006D77] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() =>
                      setForm((p) => ({ ...p, type: p.type.filter((_, idx) => idx !== i) }))
                    }>×</button>
                  </span>
                ))}
              </div>

              <input
                type="text"
                placeholder={form.type.length >= 3 ? "Maximum 3 tags" : "Press Enter to add tag"}
                disabled={form.type.length >= 3}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    const val = e.target.value.trim().toUpperCase();
                    if (!form.type.includes(val) && form.type.length < 3) {
                      setForm((p) => ({ ...p, type: [...p.type, val] }));
                    }
                    e.target.value = "";
                  }
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Content / Markdown</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            {/* ✅ Multiple Download Links */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Download Links *</label>

              {downloads.map((d, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Windows, Mac)"
                    value={d.platform}
                    onChange={(e) => handleDownloadChange(i, "platform", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                  />
                  <input
                    type="url"
                    placeholder="https://example.com/download"
                    value={d.url}
                    onChange={(e) => handleDownloadChange(i, "url", e.target.value)}
                    className="flex-[2] border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                  />
                  {downloads.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDownload(i)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addDownload}
                disabled={downloads.length >= 5}
                className="text-[#006D77] hover:underline mt-2"
              >
                + Add another download link
              </button>
            </div>

            {/* Demo / Tool Link */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Demo / Tool Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                placeholder="https://example.com/demo"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (INR)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                placeholder="E.g., 199.99"
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
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Footer />
    </>
  );
}
