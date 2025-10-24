"use client";
import { useState } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email/Password Sign In or Sign Up
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Signed in successfully!");
        router.push("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Account created! Please verify your email before signing in.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#edf2f4] via-white to-[#f8f9fa] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl w-full max-w-md p-8 border border-gray-100"
      >
        <h1 className="text-3xl font-semibold text-center text-[#006D77] mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006D77] outline-none"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-[#006D77] text-white py-2 rounded-lg font-medium hover:bg-[#005960] transition-all"
          >
            {loading ? "Please wait..." : isLogin ? (
              <>
                <LogIn className="mr-2" size={18} /> Sign In
              </>
            ) : (
              <>
                <UserPlus className="mr-2" size={18} /> Create Account
              </>
            )}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2 text-sm">or continue with</p>
          <button
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium">Google</span>
          </button>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-sm text-[#006D77] font-medium">
            {message}
          </p>
        )}

        {/* Toggle between Login / Signup */}
        <div className="mt-6 text-center text-sm">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-[#006D77] font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#006D77] font-medium hover:underline"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
