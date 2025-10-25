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

  // Fetch user session
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) setUser(session.user);
      else router.push("/onboard");
    };
    fetchSession();
  }, [router]);

  // Fetch user_meta and tools
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

  if (loading) return <Loading />;
  return (
    <>
<Header />
<h2 className="text-2xl text-center mt-10 mb-8 md:text-3xl  text-[#006D77]">
          Your Orders
        </h2>
    <div className="px-6 md:px-16 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {tools.map((tool) => (
        <div
          key={tool.id}
          onClick={() => router.push(`/${tool.uid}`)}
          className="group p-6 bg-white shadow-md cursor-pointer flex flex-col justify-between h-64 border border-gray-100 transition-colors duration-200"
        >
          <div>
            <h3 className="text-lg text-gray-900 group-hover:text-[#006D77] transition-colors duration-200">
              {tool.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1 transition-colors duration-200">
              {tool.owner}
            </p>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed line-clamp-4 group-hover:text-[#006D77] transition-colors duration-200">
              {tool.description}
            </p>
          </div>
          <p className="text-gray-600 mt-4 text-sm font-medium group-hover:text-[#006D77] transition-colors duration-200">
            {tool.type}
          </p>
        </div>
      ))}
    </div>
    <Footer />
    </>
  );
}

