"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { PlusCircle, DollarSign, BarChart2, ToolCase, Package } from "lucide-react";
import Loading from "@/components/Loading";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        // Fetch profile data
        const { data, error } = await supabase
          .from("user_data")
          .select("*")
          .eq("user_uid", session.user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data || null);
        }
      } else {
        router.push("/onboard"); // redirect if not logged in
      }
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        router.push("/onboard");
      }
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
        stats: {}
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating profile:", error);
    } else {
      setProfile(data);
    }
  };

  if (loading || !user) return <Loading />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
        <h2 className="text-2xl mb-8 md:text-3xl text-[#006D77]">
          Your Profile
        </h2>

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
            {/* Left Column */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center gap-4">
                <img
                  src={user.user_metadata?.avatar_url || "/images/user.png"}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
                >
                  Logout
                </button>
              </div>

              {/* Your Orders */}
              <div
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer transition"
                onClick={() => router.push("/orders")}
              >
                <div className="flex items-center gap-4">
                  <Package size={32} className="text-[#006D77]" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Your Orders</h3>
                    <p className="text-gray-500 text-sm">View purchased tools</p>
                  </div>
                </div>
              </div>

              {/* Upload Your Tool */}
              <div
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between cursor-pointer  transition"
                onClick={() => router.push("/upload")}
              >
                <div className="flex items-center gap-4">
                  <PlusCircle size={32} className="text-[#006D77]" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Upload Your Tool</h3>
                    <p className="text-gray-500 text-sm">Share your innovation with the community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
  <ToolCase size={32} className="text-[#006D77]" />
  <div>
    <h3 className="text-lg font-semibold text-gray-800">Your Tools</h3>
    <p className="text-gray-500 text-sm">
      {profile.sell_tools ? profile.sell_tools.length : 0} tools uploaded
    </p>
  </div>
</div>


              

              {/* Earnings moved here */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
                <DollarSign size={32} className="text-[#006D77]" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Earnings</h3>
                  <p className="text-gray-500 text-sm">₹{profile.earning}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
