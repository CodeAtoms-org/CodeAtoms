"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { Dialog } from "@headlessui/react";
import { Star } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if already given feedback
  useEffect(() => {
    const hasGivenFeedback = sessionStorage.getItem("feedbackGiven");
    if (hasGivenFeedback) setSubmitted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !rating) {
      toast.error("Email and rating are required!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("feedback").insert([
      {
        email,
        rating,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    sessionStorage.setItem("feedbackGiven", "true");
    setSubmitted(true);
    setIsOpen(false);
    toast.success("Thank you for your feedback ❤️");
  };

  if (submitted) return null;

  return (
    <>
      {/* Toast Notification */}
      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />

      {/* Floating Vertical Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="feedback-button"
      >
        Feedback
      </button>

      {/* Feedback Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Share Your Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (required)
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#006D77]"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (required)
              </label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 cursor-pointer transition-all ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400 scale-110"
                        : "text-gray-300 hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optional)
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#006D77]"
                rows="4"
                placeholder="Your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00ADB5] to-[#006D77] hover:opacity-90"
              }`}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
      </Dialog>
    </>
  );
}
