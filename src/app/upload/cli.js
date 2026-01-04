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
  const [slugStatus, setSlugStatus] = useState("");
  const [slugChecking, setSlugChecking] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    type: [],
    content: "",
    link: "",
    price: "",
    uid: "",
    license: "",        // ✅ NEW
    integration: "",    // ✅ NEW
  });

  const [downloads, setDownloads] = useState([
    { platform: "", url: "", file: null, uploading: false }
  ]);


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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSlugChange = async (value) => {
    const slug = value.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    setForm((prev) => ({ ...prev, uid: slug }));
    setSlugStatus("");
    if (!slug) return;

    setSlugChecking(true);
    const { data } = await supabase.from("tools").select("uid").eq("uid", slug).maybeSingle();
    setSlugChecking(false);

    if (data) setSlugStatus("taken");
    else setSlugStatus("available");
  };

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


  const uploadFileToSupabase = async (file, platform) => {
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/${form.uid}/${platform}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("tool-downloads")
      .upload(filePath, file, { upsert: false });

    if (error) throw error;

    const { data } = supabase.storage
      .from("tool-downloads")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const downloadJSON = {};

    for (let d of downloads) {
      if (!d.platform?.trim()) {
        setError("Each download must have a platform name");
        setSubmitting(false);
        return;
      }

      try {
        if (d.file) {
          const publicUrl = await uploadFileToSupabase(d.file, d.platform.trim());
          downloadJSON[d.platform.trim()] = publicUrl;
        }
        else if (d.url?.trim()) {
          new URL(d.url);
          downloadJSON[d.platform.trim()] = d.url.trim();
        }
        else {
          throw new Error("Either upload a file or provide a URL");
        }
      } catch (err) {
        setError(err.message);
        setSubmitting(false);
        return;
      }
    }

    const formattedTags = `{${form.type.map(tag => `"${tag}"`).join(",")}}`;
    const { error: insertError } = await supabase.from("tools").insert([
      {
        uid: form.uid,
        owner: form.name,
        owner_uid: user.id,
        title: form.title,
        description: form.description,
        type: formattedTags,
        content: form.content,
        download: downloadJSON, // ✅ CORRECT DATA
        link: form.link,
        price: form.price ? Number(form.price) : 0,
        license: form.license.trim(),
        integration: form.integration.trim(),
      },
    ]);

    setSubmitting(false);

    if (insertError) setError(insertError.message);
    else {
      toast.success("Tool uploaded successfully!");
      router.push("/profile");
    }
  };


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );

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
            {/* URL Slug Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Enter your URL *</label>
              <div className="flex items-center border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-[#006D77]">
                <span className="text-gray-500">codeatoms.org/</span>
                <input
                  type="text"
                  name="uid"
                  value={form.uid}
                  onChange={(e) => handleSlugChange(e.target.value)}

                  placeholder="your-tool-name"
                  className="flex-1 outline-none ml-1"
                />
              </div>
              {slugChecking && (
                <p className="text-sm text-gray-500 mt-1">Checking availability...</p>
              )}
              {slugStatus === "available" && (
                <p className="text-sm text-green-600 mt-1">Available</p>
              )}
              {slugStatus === "taken" && (
                <p className="text-sm text-red-500 mt-1">Already taken</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name or organization name"

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

                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

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

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="A brief description of your tool."
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
                placeholder="Use Markdown format here."
                rows={5}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            {/* License */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                License *
              </label>
              <input
                type="text"
                name="license"
                value={form.license}
                onChange={handleChange}

                placeholder="MIT • Commercial use allowed • No attribution"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Keep it short. Example: <em>MIT • Commercial use allowed • No attribution</em>
              </p>
            </div>

            {/* Integration */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Integration *
              </label>
              <textarea
                name="integration"
                value={form.integration}
                onChange={handleChange}

                rows={4}
                placeholder={`Works well with:
Node.js, Next.js, PostgreSQL

Requires:
Node.js 18+, PostgreSQL

Notes:
Docker recommended for local development.`}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Mention what it works with, what it requires, and any setup notes.
              </p>
            </div>


            {/* ✅ Multiple Download Links */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Download Links *
              </label>

              {downloads.map((d, i) => (
                <div key={i} className="border rounded-xl p-4 mb-3 space-y-3">
                  {/* Platform */}
                  <input
                    type="text"
                    placeholder="Platform (Windows, Mac, Linux)"
                    value={d.platform}
                    onChange={(e) =>
                      handleDownloadChange(i, "platform", e.target.value)
                    }
                    className="w-full border rounded-xl p-3"
                  />

                  {/* OR Divider */}


                  {/* URL input */}
                  <input
                    type="url"
                    placeholder="https://example.com/download"
                    value={d.url}
                    onChange={(e) =>
                      handleDownloadChange(i, "url", e.target.value)
                    }
                    disabled={!!d.file}
                    className="w-full border rounded-xl p-3 disabled:opacity-50"
                  />
                  <p className="text-sm text-gray-500 text-center">OR upload file</p>

                  {/* File Upload */}
                  <input
                    type="file"
                    disabled={!!d.url}
                    onChange={(e) => {
                      const updated = [...downloads];
                      updated[i].file = e.target.files[0];
                      setDownloads(updated);
                    }}
                    className="w-full  text-gray-600 text-sm"
                  />

                  {downloads.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDownload(i)}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addDownload}
                disabled={downloads.length >= 5}
                className="text-[#006D77] hover:underline"
              >
                + Add another download
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
          <p className="mt-4 text-red-400">*Tools with missing, misleading, or low-quality information may be rejected
      during review.*</p>
        </div>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Footer />
    </>
  );
}
