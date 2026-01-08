
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | CodeAtoms",
  description:
    "Learn more about CodeAtoms, our mission, vision, and the passionate team behind the developer tools marketplace.",
};

export default function Contact() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-center mb-10 text-[#006D77]">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Have questions, feedback, or need assistance? We're here to help!  
            Reach out to us using the contact information below, and our team will get back to you as soon as possible.
          </p>

          <div className="grid gap-10">
            {/* Contact Form */}
            

            {/* Contact Info */}
            <div className="flex flex-col justify-center bg-[#f8f8f8] rounded-2xl p-8 ">
              <h2 className="text-2xl  mb-6 text-[#006D77]">Get in Touch</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are always open to new ideas, collaborations, and opportunities.  
                Reach out to us using the details below, and we will respond as soon as possible.
              </p>

              <div className="space-y-4">
                <p>
                  <span className=" text-gray-800">Address:</span>  
                  <br /> CodeAtoms HQ, India
                </p>
                <p>
                  <span className=" text-gray-800">Email:</span>  
                  <br /> hello@codeatoms.org
                </p>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
