
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | CodeAtoms",
  description:
    "Learn more about CodeAtoms, our mission, vision, and the passionate team behind the developer tools marketplace.",
};

export default function About() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl mb-8 md:text-3xl  text-center text-[#006D77]">
            About Us
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            We are a passionate team of innovators building technology that empowers creators, developers, and researchers across the world.
          </p>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-2xl  mb-4 text-[#006D77]">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to democratize access to cutting-edge technology and AI tools that drive real-world impact.  
                From robotics to next-gen software, we strive to make innovation open, transparent, and accessible to everyone.  
                We believe in enabling the next generation of thinkers, creators, and builders.
              </p>
            </div>
            <img
              src="https://plus.unsplash.com/premium_photo-1682309701556-f6d7a9cac246?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1812"
              alt="Innovation"
              className="rounded-2xl shadow-md"
            />
          </div>

          {/* Vision Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60"
              alt="Vision"
              className="rounded-2xl shadow-md"
            />
            <div>
              <h2 className="text-2xl  mb-4 text-[#006D77]">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where technology fuels creativity,  
                where open collaboration bridges boundaries,  
                and where every innovator has the power to bring bold ideas to life.  
                Our platforms aim to make AI and robotics not just advanced — but approachable.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl  mb-8 text-[#006D77]">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              We are a diverse team of engineers, designers, and dreamers — united by the belief that technology can solve problems previously unimaginable.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Abhinav Sharma", role: "Founder & CEO", img: "https://works-of-rudr.github.io/images/logo.png?raw=true" },
                { name: "Riya Patel", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=60" },
                { name: "Arjun Mehta", role: "AI Research Lead", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=60" },
              ].map((member, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl ">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center">
            <h2 className="text-3xl  mb-6 text-[#006D77]">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-10">
              Integrity, innovation, and impact — these three words define everything we do.  
              We are not just building tools; we are building the foundation for a smarter, more connected future.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
