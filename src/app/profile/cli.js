"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  DollarSign,
  ToolCase,
  Package,
  Pencil,
} from "lucide-react";
import Loading from "@/components/Loading";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userTools, setUserTools] = useState([]);
  const [showTools, setShowTools] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [updating, setUpdating] = useState(false);

  // 🟢 Fetch session and profile
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        const { data, error } = await supabase
          .from("user_data")
          .select("*")
          .eq("user_uid", session.user.id)
          .single();

        if (!error) setProfile(data);
      } else {
        router.push("/onboard");
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else router.push("/onboard");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCompleteProfile = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user_data")
      .insert({
        user_uid: user.id,
        name: user.user_metadata?.full_name || user.email,
        tools: 0,
        earnings: 0,
        stats: {},
      })
      .select()
      .single();

    if (!error) setProfile(data);
  };

  // 🟡 Fetch user tools on button click
  const handleShowTools = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .eq("owner_uid", user.id);
      if (error) throw error;
      setUserTools(data);
      setShowTools(true);
      toast.success("Tools loaded successfully!");
    } catch (err) {
      toast.error("Failed to load tools.");
    }
  };

  // 🟡 Open edit dialog
  const handleEditTool = (tool) => {
    setSelectedTool({ ...tool });
    setShowDialog(true);
  };

  // 🟢 Update tool in Supabase
  const handleUpdateTool = async () => {
    if (!selectedTool) {
      console.warn("⚠️ No tool selected for update.");
      return;
    }

    setUpdating(true);

    console.group("🧩 TOOL UPDATE DEBUG LOG");

    console.log("🟡 Selected tool object:", selectedTool);
    console.log("🟡 selectedTool.uid type:", typeof selectedTool.uid, "| value:", selectedTool.uid);

    // Check what’s actually in Supabase for this UID
    const { data: checkData, error: checkError } = await supabase
      .from("tools")
      .select("uid, title")
      .limit(10);

    if (checkError) {
      console.error("❌ Error fetching existing UIDs:", checkError);
    } else {
      console.log("📜 Sample of existing tool UIDs:", checkData.map(d => d.uid));
    }

    const updateData = {
      title: selectedTool.title,
      description: selectedTool.description,
      content: selectedTool.content,
      link: selectedTool.link,
      download: selectedTool.download,
      price: selectedTool.price ? Number(selectedTool.price) : 0,
    };

    console.log("🟢 Update payload:", updateData);

    try {
      const { data, error, status } = await supabase
        .from("tools")
        .update(updateData)
        .eq("id", selectedTool.id)
        .select();

      console.log("🟢 Supabase update response:", { status, data, error });

      if (error) {
        console.error("❌ Supabase error during update:", error);
        toast.error("Failed to update tool.");
      } else if (!data || data.length === 0) {
        console.warn("⚠️ No rows matched this UID:", selectedTool.id);
        toast.error("No matching tool found to update. Check UID.");
      } else {
        toast.success("Tool updated successfully!");
        setShowDialog(false);
        setUserTools(prev =>
          prev.map(tool => (tool.uid === selectedTool.uid ? { ...tool, ...selectedTool } : tool))
        );
      }
    } catch (err) {
      console.error("🔥 Unexpected error during update:", err);
      toast.error("Unexpected error occurred.");
    }

    console.groupEnd();
    setUpdating(false);
  };



  if (loading || !user) return <Loading />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
        <h2 className="text-2xl mb-8 md:text-3xl text-[#006D77]">Your Profile</h2>

        {!profile ? (
          <div className="flex justify-center">
            <button
              onClick={handleCompleteProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Complete Your Profile
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT COLUMN */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center gap-4">
                <img
                  src={user.user_metadata?.avatar_url || "/images/user.png"}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {profile.name}
                </h2>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
                >
                  Logout
                </button>
              </div>

              <div
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer"
                onClick={() => router.push("/orders")}
              >
                <div className="flex items-center gap-4">
                  <Package size={32} className="text-[#006D77]" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Orders
                    </h3>
                    <p className="text-gray-500 text-sm">View purchased tools</p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer"
                onClick={() => router.push("/upload")}
              >
                <div className="flex items-center gap-4">
                  <PlusCircle size={32} className="text-[#006D77]" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Upload Your Tool
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Share your innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:w-1/2 flex flex-col gap-6">
              {/* Tools Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-2">
                  <ToolCase size={32} className="text-[#006D77]" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Tools
                    </h3>

                  </div>
                </div>

                {!showTools ? (
                  <button
                    onClick={handleShowTools}
                    className="bg-[#006D77] text-white rounded-xl px-5 py-2 w-fit"
                  >
                    Show Tools
                  </button>
                ) : userTools.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tools uploaded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {userTools.map((tool) => (
                      <div
                        key={tool.uid}
                        className="flex items-center justify-between border rounded-xl p-3"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {tool.title}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {tool.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEditTool(tool)}
                          className="text-[#006D77] hover:text-[#004e54] transition"
                        >
                          <Pencil size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Earnings */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <DollarSign size={32} className="text-[#006D77]" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Earnings
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ₹{profile.earnings || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🧩 Edit Tool Dialog */}
      {showDialog && selectedTool && (
        <div className="fixed inset-0 bg-[#006D77]/70 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-lg sm:max-w-xl rounded-2xl shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Tool
            </h3>

            {/* 🧱 Basic Fields */}
            <div className="space-y-4">
              {["title", "description", "content", "link", "price"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                    {field}
                  </label>

                  {field === "description" || field === "content" ? (
                    <textarea
                      rows="3"
                      value={selectedTool[field] || ""}
                      onChange={(e) =>
                        setSelectedTool({ ...selectedTool, [field]: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                    />
                  ) : (
                    <input
                      type={field === "price" ? "number" : "text"}
                      value={selectedTool[field] || ""}
                      onChange={(e) =>
                        setSelectedTool({ ...selectedTool, [field]: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 🧩 Download JSON Editor */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Download Links
              </label>

              <div className="space-y-3">
                {Object.entries(selectedTool.download || {}).map(([platform, url], i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Platform (e.g. Windows)"
                      value={platform}
                      onChange={(e) => {
                        const newKey = e.target.value.trim();
                        const updated = { ...selectedTool.download };
                        delete updated[platform];
                        updated[newKey] = url;
                        setSelectedTool({ ...selectedTool, download: updated });
                      }}
                      className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                    />

                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => {
                        const updated = {
                          ...selectedTool.download,
                          [platform]: e.target.value,
                        };
                        setSelectedTool({ ...selectedTool, download: updated });
                      }}
                      className="flex-[2] border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...selectedTool.download };
                        delete updated[platform];
                        setSelectedTool({ ...selectedTool, download: updated });
                      }}
                      className="text-red-500 font-bold text-xl hover:text-red-600 sm:self-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTool({
                    ...selectedTool,
                    download: { ...(selectedTool.download || {}), "": "" },
                  });
                }}
                className="text-[#006D77] hover:underline text-sm mt-3 block"
              >
                + Add another download link
              </button>
            </div>

            {/* 🧭 Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTool}
                disabled={updating}
                className="px-5 py-2 rounded-xl bg-[#006D77] text-white hover:bg-[#005a63] transition"
              >
                {updating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}



      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <Footer />
    </>
  );
}
