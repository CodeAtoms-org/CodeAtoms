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

  const [ticketCount, setTicketCount] = useState(0);

  const [downloadFiles, setDownloadFiles] = useState({});
  const uploadReplacementFile = async (file, platform, toolUid) => {
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/${toolUid}/${platform}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("tool-downloads")
      .upload(filePath, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
      .from("tool-downloads")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const deleteStorageFileIfAny = async (url) => {
    if (!url?.includes("/storage/v1/object/public/")) return;

    const path = url.split("/storage/v1/object/public/tool-downloads/")[1];
    if (!path) return;

    await supabase.storage
      .from("tool-downloads")
      .remove([path]);
  };



  useEffect(() => {
    if (!user) return;

    const fetchTicketCount = async () => {
      const { count } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", "open")
        .eq("developer_uid", user.id);


      setTicketCount(count || 0);
    };

    fetchTicketCount();
  }, [user]);



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
    if (!selectedTool) return;

    setUpdating(true);

    const updatedDownloads = { ...selectedTool.download };

    try {
      for (const [platform, file] of Object.entries(downloadFiles)) {
        if (!file) continue;

        // Delete old file if exists
        await deleteStorageFileIfAny(updatedDownloads[platform]);

        // Upload new file
        const newUrl = await uploadReplacementFile(
          file,
          platform,
          selectedTool.uid
        );

        updatedDownloads[platform] = newUrl;
      }

      const updateData = {
        title: selectedTool.title,
        description: selectedTool.description,
        content: selectedTool.content,
        link: selectedTool.link,
        price: selectedTool.price ? Number(selectedTool.price) : 0,
        type: selectedTool.type,
        download: updatedDownloads,
      };

      const { error } = await supabase
        .from("tools")
        .update(updateData)
        .eq("id", selectedTool.id);

      if (error) throw error;

      toast.success("Tool updated successfully!");
      setShowDialog(false);
      setDownloadFiles({});
      handleShowTools();

    } catch (err) {
      console.error(err);
      toast.error("Failed to update tool");
    }

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
                      Share your creations with the world
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:w-1/2 flex flex-col gap-6">

              <div
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer"
                onClick={() => router.push("/customer-support?mode=developer")}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    View Your Tool Status
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {ticketCount} active support ticket{ticketCount !== 1 ? "s" : ""}
                  </p>
                </div>

                <span className="text-[#006D77] font-semibold">
                  Open →
                </span>
              </div>

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
                    ${profile.earnings || 0}
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
                Downloads
              </label>

              {Object.entries(selectedTool.download || {}).map(([platform, url]) => (
                <div key={platform} className="border rounded-xl p-3 mb-3 space-y-2">

                  {/* Platform */}
                  <input
                    type="text"
                    value={platform}
                    placeholder="Platform (e.g., Windows, MacOS)"
                    onChange={(e) => {
                      const newKey = e.target.value.trim();
                      if (!newKey) return;

                      const updated = { ...selectedTool.download };
                      delete updated[platform];
                      updated[newKey] = url;

                      setSelectedTool({ ...selectedTool, download: updated });
                    }}
                    className="w-full border rounded-xl px-3 py-2"
                  />

                  {/* URL */}
                  <input
                    type="url"
                    value={url}
                    placeholder="Paste link"
                    onChange={(e) => {
                      setSelectedTool({
                        ...selectedTool,
                        download: {
                          ...selectedTool.download,
                          [platform]: e.target.value,
                        },
                      });
                    }}
                    disabled={!!downloadFiles[platform]}
                    className="w-full border rounded-xl px-3 py-2 disabled:opacity-50"
                  />

                  {/* File Upload */}
                  <input
                    type="file"
                    disabled={!!selectedTool.download[platform] && selectedTool.download[platform].startsWith("http") && !downloadFiles[platform]}
                    onChange={(e) => {
                      setDownloadFiles(prev => ({
                        ...prev,
                        [platform]: e.target.files[0],
                      }));
                    }}
                    className="text-sm text-gray-600"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteStorageFileIfAny(url);

                      const updated = { ...selectedTool.download };
                      delete updated[platform];

                      setSelectedTool({ ...selectedTool, download: updated });
                    }}
                    className="text-red-500 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setSelectedTool({
                    ...selectedTool,
                    download: { ...(selectedTool.download || {}), "": "" },
                  })
                }
                className="text-[#006D77] hover:underline text-sm"
              >
                + Add download
              </button>
            </div>


            {/* 🏷️ Type (Tags) Editor */}
            {/* 🏷️ Type (Tags) Editor */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>

              <div className="flex flex-wrap gap-2 mb-3">
                {(selectedTool.type || []).map((t, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-xl"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = selectedTool.type.filter((_, i) => i !== index);
                        setSelectedTool({ ...selectedTool, type: updated });
                      }}
                      className="text-red-500 font-bold hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="text"
                placeholder="Add a TYPE (press Enter)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    let value = e.target.value.trim().toUpperCase();
                    if (!value) return;

                    let current = selectedTool.type || [];

                    // Limit to max 3 tags
                    if (current.length >= 3) {
                      toast.error("You can add maximum 3 tags.");
                      e.target.value = "";
                      return;
                    }

                    // Prevent duplicates
                    if (current.includes(value)) {
                      toast.error("Tag already exists.");
                      e.target.value = "";
                      return;
                    }

                    const updated = [...current, value];
                    setSelectedTool({ ...selectedTool, type: updated });
                    e.target.value = "";
                  }
                }}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#006D77]"
              />
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
