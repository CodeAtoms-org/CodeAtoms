import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | CodeAtoms",
  description:
    "Learn more about CodeAtoms — the developer tool marketplace empowering developers to build their best ideas with ease and speed.",
};

export default function About() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl mb-8 text-center text-[#006D77]">
            About CodeAtoms
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            CodeAtoms is a developer tool marketplace built to help developers access,
            share, and discover tools that accelerate innovation.  
            
          </p>

          {/* Mission Section */}
          <div className="grid gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl mb-4 text-[#006D77]">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to make high-quality developer tools accessible to everyone.
                We want to eliminate the barriers that slow down innovation by bringing
                together a community-driven marketplace where developers can publish,
                explore, and utilize tools that make building faster and smarter.
              </p>
            </div>
            
          </div>

          {/* Vision Section */}
          

          <div className="mb-20">
  <h2 className="text-2xl mb-6 text-[#006D77] text-start">
    Our Founder
  </h2>

  <div className="flex flex-col md:flex-row py-10 items-start gap-10">
    
    {/* Left: Founder Image & Name */}
    <div className="flex-shrink-0 text-center px-16  md:text-start">
      <img
        src="https://ifybiljwxpukkfycuxyr.supabase.co/storage/v1/object/public/avatars/6d44dfbe-f170-4cfb-a098-1d8a3992a5de/6d44dfbe-f170-4cfb-a098-1d8a3992a5de-1757566656331.png"
        alt="Abhinav Sharma"
        className="w-50 h-70 rounded-2xl object-cover mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">
        Abhinav Sharma
      </h3>
      <p className="text-gray-500">
        Founder & CEO
      </p>
    </div>

    {/* Right: Founder Story */}
    <div className="text-gray-600 text-start py-6 leading-relaxed">
      <p className="mb-4">
        CodeAtoms was founded by Abhinav Sharma with a simple but powerful vision:
        to create a platform where developers can discover, showcase, and monetize
        high-quality tools without noise or friction.
      </p>

      <p className="mb-4">
        As a builder himself, Abhinav experienced firsthand how difficult it was
        to find reliable tools, validate quality, and trust marketplaces filled
        with poorly documented or abandoned projects. CodeAtoms was born out of
        that frustration.
      </p>

      <p>
        Today, CodeAtoms focuses on clarity, documentation quality, and developer
        trust—helping tool creators reach the right audience while giving users
        confidence in what they build with.
      </p>
    </div>

  </div>
</div>

<div className="">
  <h2 className="text-2xl mb-6 text-[#006D77] text-start">
    Join Us on Our Journey
  </h2>
  <p className="text-gray-600  mx-auto leading-relaxed">
    We are just getting started.  
    Our vision is to become the go-to platform for developers worldwide to find
    and share tools that empower innovation.  
    Whether you are a tool creator, buyer, or enthusiast, we invite you to join
    us on this exciting journey.
  </p>
  <p className="text-gray-600 mx-auto leading-relaxed mt-4">
    Together, we can build a thriving ecosystem where developers have everything
    they need to turn ideas into reality—faster and better than ever before.
  </p>
  </div>

         
        </div>
      </section>
      <Footer />
    </>
  );
}
