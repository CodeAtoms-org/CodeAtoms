"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UploadTool() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    content: "",
    buynow: "",
    link: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
  if (!form.title || !form.type) {
    setError("Title and Type are required!");
    return;
  }

  setSubmitting(true);

  const { error: insertError } = await supabase.from("tools").insert([{
    owner: user.email,
    title: form.title,
    description: form.description,
    type: form.type,
    content: form.content,
    buynow: form.buynow,
    link: form.link
    // DO NOT include uid, let Postgres generate it
  }]);

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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Your Tool</h1>
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
          {error && (
            <p className="text-red-500 mb-4 font-medium">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <div>
              <label className="block text-gray-700 font-medium mb-1">Type *</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="E.g., Software, Hardware"
                required
              />
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
              <label className="block text-gray-700 font-medium mb-1">Buy Now URL</label>
              <input
                type="url"
                name="buynow"
                value={form.buynow}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Demo / Tool Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
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
      <Footer />
    </>
  );
}
