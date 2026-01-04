"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

import { supabase } from "../../../../supabase";

const ADMIN_IDS = [
  "480d15a0-b9ea-4f16-a820-709e50635da5",
  "831be92d-408e-45c8-9973-62da8906f47d"
];

export default function ModerationPage() {

    if (process.env.NEXT_PUBLIC_ENABLE_MODERATION !== "true") {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            This page is not accessible.
          </p>
        </div>
      </>
    );
  }
  
  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [loading, setLoading] = useState(true);
  const [pendingTools, setPendingTools] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [reportedTools, setReportedTools] = useState([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user && ADMIN_IDS.includes(user.id)) {
      setAuthorized(true);
      fetchData();
    } else {
      setAuthorized(false);
    }

    setCheckingAuth(false);
  };

  const fetchData = async () => {
    setLoading(true);

    const { data: pending } = await supabase
      .from("tools")
      .select("*")
      .eq("done", "no");

    const { data: tools } = await supabase
      .from("tools")
      .select("*")
      .not("report_action", "is", null);

    const { data: reports } = await supabase
      .from("reports")
      .select("tool_uid, category, message, created_at");

    const { data: ticketsData } = await supabase
  .from("tickets")
  .select("*")
  .order("created_at", { ascending: false });


    const reportMap = {};
    reports?.forEach((r) => {
      if (!reportMap[r.tool_uid]) reportMap[r.tool_uid] = [];
      reportMap[r.tool_uid].push(r);
    });

    const ticketMap = {};
    tickets?.forEach((t) => {
      if (!ticketMap[t.tool_uid]) {
        ticketMap[t.tool_uid] = { open: 0, closed: 0, last: t.created_at };
      }
      ticketMap[t.tool_uid][t.status]++;
      if (new Date(t.created_at) > new Date(ticketMap[t.tool_uid].last)) {
        ticketMap[t.tool_uid].last = t.created_at;
      }
    });

    const enriched = tools.map((tool) => ({
      ...tool,
      reports: reportMap[tool.uid] || [],
      tickets: ticketMap[tool.uid] || null
    }));

    setPendingTools(pending || []);
setReportedTools(enriched || []);
setTickets(ticketsData || []);
setLoading(false);

  };

  const relistTool = async (uid) => {
    await supabase
      .from("tools")
      .update({
        done: "yes",
        home: "no",
        report_action: null
      })
      .eq("uid", uid);

    fetchData();
  };

  /* 🚫 BLOCK UNAUTHORIZED USERS */
  if (checkingAuth) {
    return <p className="p-6">Checking access…</p>;
  }

  if (!authorized) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            You are not authorized to access this page.
          </p>
        </div>
      </>
    );
  }

  if (loading) {
    return <p className="p-6">Loading moderation dashboard…</p>;
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* 🔥 HEADER */}
      <div className="p-6 max-w-7xl mx-auto space-y-16">
        <div>
          <h1 className="text-3xl font-bold">
            CodeAtoms Moderation System — Admin
          </h1>
          <p className="text-gray-500 mt-1">
            Restricted access · Internal use only
          </p>
        </div>

        {/* ⏳ WAITING FOR REVIEW */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Waiting for Review
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingTools.map((tool) => (
              <div key={tool.uid} className="bg-gray-50 p-5 rounded-xl border">
                <Link
                  href={`/${tool.uid}`}
                  className="font-semibold hover:underline"
                >
                  {tool.title}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 🚨 REPORTED TOOLS */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Reported Tools
          </h2>

          <div className="space-y-8">
            {reportedTools.map((tool) => (
              <div
                key={tool.uid}
                className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm"
              >
                <div className="flex justify-between">
                  <Link
                    href={`/${tool.uid}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {tool.title}
                  </Link>
                  <span className="text-sm text-red-700">
                    {tool.report_action}
                  </span>
                </div>

                {/* Reports */}
                <div>
                  <h3 className="font-semibold mb-3">Reports</h3>
                  <div className="grid gap-3">
                    {tool.reports.map((r, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 mb-1">
                          {r.category} ·{" "}
                          {new Date(r.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm">{r.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tickets */}
                

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => relistTool(tool.uid)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                  >
                    Re-list Tool
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm">
                    Keep Delisted
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* 🎫 CUSTOMER SUPPORT TICKETS */}
<section>
  <h2 className="text-2xl font-semibold mb-6">
    Customer Support Tickets
  </h2>

  {tickets.length === 0 && (
    <p className="text-gray-500">
      No customer support tickets found.
    </p>
  )}

  <div className="grid md:grid-cols-2 gap-4">
    {tickets.map((ticket) => (
      <div
        key={ticket.id}
        className="bg-white border rounded-xl p-5 shadow-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <Link
            href={`/${ticket.tool_uid}`}
            className="font-semibold hover:underline"
          >
            Tool: {ticket.tool_title || ticket.tool_uid}
          </Link>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              ticket.status === "open"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {ticket.status.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          Created: {new Date(ticket.created_at).toLocaleString()}
        </p>

        {ticket.subject && (
          <p className="mt-2 text-sm text-gray-800">
            <strong>Subject:</strong> {ticket.subject}
          </p>
        )}
      </div>
    ))}
  </div>
</section>

      </div>
    </>
  );
}
