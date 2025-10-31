"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  const gradients = [
    "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)",
    "linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(90deg, #fccb90 0%, #d57eeb 100%)",
    "linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(90deg, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(90deg, #89f7fe 0%, #66a6ff 100%)",
  ];

  // Fetch user session
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
      setChecked(true);
    };
    fetchSession();
  }, []);

  // Fetch purchased tools
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data: meta, error: metaError } = await supabase
        .from("user_data")
        .select("purchased_tools")
        .eq("user_uid", user.id)
        .single();

      if (metaError || !meta?.purchased_tools?.length) {
        setTools([]);
        setLoading(false);
        return;
      }

      const { data: toolData, error: toolError } = await supabase
        .from("tools")
        .select("*")
        .in("uid", meta.purchased_tools);

      if (toolError) console.error(toolError);
      else setTools(toolData || []);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!checked) return <Loading />;

  // If user is not logged in
  if (!user) {
    return (
      <>
        <Header />
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
          <h2 className="text-2xl md:text-3xl text-gray-800 mb-4">
            Please login to view your orders
          </h2>
          <button
            onClick={() => router.push("/onboard")}
            className="bg-[#006D77] text-white px-6 py-3 rounded-xl hover:bg-[#00545C] transition-all duration-300"
          >
            Login
          </button>
        </section>
        <Footer />
      </>
    );
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <h2 className="text-2xl text-center mt-10 mb-8 md:text-3xl text-[#006D77]">
        Your Orders
      </h2>

      {tools.length === 0 ? (
        <p className="text-center text-gray-600 mb-16">
          You haven not purchased any tools yet.
        </p>
      ) : (
        <div className="px-6 md:px-16 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const gradient = gradients[index % gradients.length];
            return (
              <div
                key={tool.id}
                onClick={() => router.push(`/${tool.uid}`)}
                className="group relative p-6 pt-14 bg-white shadow-md cursor-pointer flex flex-col justify-between min-h-[16rem] border border-gray-100 transition-all duration-200 rounded-xl hover:shadow-lg overflow-hidden"
              >
                {/* 🌈 Gradient Banner */}
                <div
                  className="absolute top-0 left-0 right-0 h-10 rounded-t-xl"
                  style={{ background: gradient }}
                />

                <div className="flex-grow">
                  <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{tool.owner}</p>
                  <p className="text-gray-500 mt-3 text-md leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
                    {tool.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {Array.isArray(tool.type) && tool.type.length > 0 ? (
                    tool.type.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 group-hover:text-[#006D77]"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Dev Tools
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </>
  );
}
