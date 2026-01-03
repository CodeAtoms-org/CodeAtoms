"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function CustomerSupport() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const toolUid = searchParams.get("tool");
    const mode = searchParams.get("mode"); // "developer" | null

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const [tool, setTool] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [activeTicket, setActiveTicket] = useState(null);

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const closeTicket = async () => {
        if (!activeTicket) return;

        const { error } = await supabase
            .from("tickets")
            .update({ status: "closed" })
            .eq("id", activeTicket.id);

        if (error) {
            toast.error("Failed to close issue");
            return;
        }

        toast.success("Issue closed");

        setActiveTicket(null);
        setReply("");

        // Remove from developer list if needed
        setTickets(prev => prev.filter(t => t.id !== activeTicket.id));
    };


    /* ---------------- FETCH USER TICKET (USER MODE) ---------------- */
    useEffect(() => {
        if (!user || !toolUid || mode === "developer") return;

        const fetchUserTicket = async () => {
            const { data, error } = await supabase
                .from("tickets")
                .select("*")
                .eq("tool_uid", toolUid)
                .eq("user_uid", user.id)
                .eq("status", "open")
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setActiveTicket(data);
            }
        };

        fetchUserTicket();
    }, [user, toolUid, mode]);

    /* ---------------- AUTH ---------------- */
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data?.user) {
                router.push("/onboard");
                return;
            }
            setUser(data.user);
        });
    }, [router]);

    /* ---------------- PROFILE ---------------- */
    useEffect(() => {
        if (!user) return;

        supabase
            .from("user_data")
            .select("name")
            .eq("user_uid", user.id)
            .single()
            .then(({ data }) => setProfile(data));
    }, [user]);

    /* ---------------- TOOL (USER MODE) ---------------- */
    useEffect(() => {
        if (!toolUid || mode === "developer") return;

        supabase
            .from("tools")
            .select("uid, title, owner_uid")
            .eq("uid", toolUid)
            .single()
            .then(({ data }) => setTool(data));
    }, [toolUid, mode]);

    /* ---------------- FETCH DEVELOPER TICKETS ---------------- */
    useEffect(() => {
        if (!user || mode !== "developer") return;

        supabase
            .from("tickets")
            .select("*")
            .eq("developer_uid", user.id)
            .eq("status", "open")
            .order("created_at", { ascending: false })
            .then(({ data }) => setTickets(data || []));
    }, [user, mode]);

    /* ---------------- CREATE TICKET (USER) ---------------- */
    const createTicket = async () => {
        if (!tool) {
            toast.error("Tool information not loaded yet. Please wait.");
            return;
        }

        if (!subject || !message) {
            toast.error("All fields required");
            return;
        }

        setLoading(true);

        const { error } = await supabase.from("tickets").insert({
            tool_uid: tool.uid,
            tool_title: tool.title,
            user_uid: user.id,
            user_name: profile?.name || "User",
            developer_uid: tool.owner_uid,
            subject,
            status: "open",
            priority: "normal",
            message: message,

        });

        setLoading(false);

        if (error) {
            toast.error("Failed to create ticket");
            return;
        }

        toast.success("Ticket created");
        setSubject("");
        setMessage("");
    };


    /* ---------------- SEND MESSAGE ---------------- */
    const sendReply = async () => {
        if (!reply.trim() || !activeTicket) return;

        const updatedMessages = [
            ...(activeTicket.messages || []),
            {
                sender_uid: user.id,
                sender_role: mode === "developer" ? "developer" : "user",
                message: reply,
                created_at: new Date().toISOString(),
            },
        ];

        const { data, error } = await supabase
            .from("tickets")
            .update({ messages: updatedMessages })
            .eq("id", activeTicket.id)
            .select()
            .single();

        if (error) {
            toast.error("Failed to send message");
            return;
        }

        setActiveTicket(data);
        setReply("");

    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-16">
                <div className="mx-auto bg-white rounded-2xl shadow-md p-8">
                    <h1 className="text-3xl font-semibold mb-6">Customer Support</h1>

                    {/* ---------------- DEVELOPER VIEW ---------------- */}
                    {mode === "developer" ? (
                        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">

                            {/* ================= LEFT: TICKET LIST ================= */}
                            <div className="border rounded-2xl bg-white overflow-hidden">
                                <div className="px-5 py-4 border-b bg-gray-50">
                                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Support Tickets
                                    </h2>
                                </div>

                                <div className="divide-y max-h-[600px] overflow-y-auto">
                                    {tickets.length === 0 ? (
                                        <p className="p-6 text-sm text-gray-500 italic">
                                            No open tickets
                                        </p>
                                    ) : (
                                        tickets.map((t) => (
                                            <div
                                                key={t.id}
                                                onClick={() => setActiveTicket(t)}
                                                className={`px-5 py-4 cursor-pointer transition ${activeTicket?.id === t.id
                                                        ? "bg-[#E6F4F5] border-l-4 border-[#006D77]"
                                                        : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <p className="font-medium text-gray-800 line-clamp-1">
                                                    {t.subject}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {t.tool_title}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* ================= RIGHT: CONVERSATION ================= */}
                            <div className=" bg-white overflow-hidden flex flex-col h-[600px]">

                                {!activeTicket ? (
                                    /* 🟢 EMPTY STATE */
                                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            Select a ticket to start conversation
                                        </h3>

                                    </div>
                                ) : (
                                    <>
                                        <div className="border rounded-xl">
                                            {/* ===== HEADER ===== */}
                                            <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {activeTicket.subject}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Tool: {activeTicket.tool_title}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={closeTicket}
                                                    className="text-sm px-4 py-1.5 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
                                                >
                                                    Close Issue
                                                </button>
                                            </div>

                                            {/* ===== INITIAL MESSAGE ===== */}
                                            {activeTicket.messages?.length > 0 && (
                                                <div className="px-6 py-4 bg-yellow-50 border-b">
                                                    <p className="text-xs font-semibold text-gray-500 mb-1">
                                                        Initial Issue
                                                    </p>
                                                    <p className="text-gray-800">
                                                        {activeTicket.message}
                                                    </p>
                                                </div>
                                            )}

                                            {/* ===== CONVERSATION ===== */}
                                            <div className="flex-1 overflow-y-auto px-6 py-3 space-y-4 bg-white">
                                                {activeTicket.messages?.map((m, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex ${m.sender_uid === user.id
                                                                ? "justify-end"
                                                                : "justify-start"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.sender_uid === user.id
                                                                    ? "bg-[#006D77] text-white"
                                                                    : "bg-gray-200 text-gray-800"
                                                                }`}
                                                        >
                                                            <p className="text-sm">{m.message}</p>
                                                            <p className="text-[10px] opacity-60 mt-1 text-right">
                                                                {new Date(m.created_at).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* ===== REPLY BOX ===== */}
                                            <div className="border-t px-6 py-4 bg-gray-50">
                                                <textarea
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    rows={2}
                                                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#006D77]"
                                                    placeholder="Type your reply..."
                                                />

                                                <button
                                                    onClick={sendReply}
                                                    className="mt-3 px-6 py-2 bg-[#006D77] text-white rounded-xl hover:bg-[#00545C]"
                                                >
                                                    Send Reply
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    ) : (
                        <>{/* ---------------- USER VIEW ---------------- */}
                            {activeTicket ? (
                                /* 🔁 Existing Ticket Conversation */
                                <div className="flex flex-col border rounded-xl overflow-hidden">
                                    {/* Header */}
                                    <div className="flex justify-between p-4 items-center">
                                        <div>
                                            <h3 className="font-semibold text-lg">{activeTicket.subject}</h3>
                                            <p className="text-sm text-gray-500">
                                                Tool: {activeTicket.tool_title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {activeTicket.message}
                                            </p>
                                        </div>

                                        <button
                                            onClick={closeTicket}
                                            className="text-sm px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50"
                                        >
                                            Close Issue
                                        </button>
                                    </div>


                                    {/* Initial Message */}


                                    {/* Conversation */}
                                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
                                        {activeTicket.messages?.slice().map((m, i) => (
                                            <div
                                                key={i}
                                                className={`flex ${m.sender_uid === user.id ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-xl px-4 py-2 ${m.sender_uid === user.id
                                                        ? "bg-[#006D77] text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                        }`}
                                                >
                                                    <p className="text-sm">{m.message}</p>
                                                    <p className="text-[10px] opacity-70 mt-1 text-right">
                                                        {new Date(m.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Reply Box */}
                                    <div className="border-t px-6 py-4 bg-gray-50">
                                        <textarea
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            rows={2}
                                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#006D77]"
                                            placeholder="Type your reply..."
                                        />

                                        <button
                                            onClick={sendReply}
                                            className="mt-3 px-5 py-2 bg-[#006D77] text-white rounded-lg hover:bg-[#00545C]"
                                        >
                                            Send Reply
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* 🆕 Create Ticket */
                                <>
                                    <p className="mb-4 text-sm text-gray-600">
                                        Creating ticket for{" "}
                                        <span className="font-medium">{tool?.title}</span>
                                    </p>

                                    <input
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full border p-3 rounded-lg mb-3"
                                        placeholder="Subject"
                                    />

                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={5}
                                        className="w-full border p-3 rounded-lg mb-4"
                                        placeholder="Describe your issue..."
                                    />

                                    <button
                                        onClick={createTicket}
                                        disabled={loading}
                                        className="w-full bg-[#006D77] text-white py-3 rounded-xl"
                                    >
                                        {loading ? "Submitting..." : "Create Ticket"}
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Toaster position="top-right" />
            <Footer />
        </>
    );
}
