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
            Our goal is simple — to empower developers so they can focus on building
            great things that shape the future.
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
          

          {/* Team Section */}
          <div className="text-start mb-20">
            <h2 className="text-2xl mb-8 text-[#006D77]">Our Team</h2>
            <p className="text-gray-600 text-start  mx-auto mb-10">
              Behind CodeAtoms is a small but dedicated team of developers and builders
              who understand what developers truly need — simplicity, accessibility,
              and a community that fuels innovation.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Aryan Vishwa", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740" },
                { name: "Riya Patel", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=60" },
                { name: "Arjun Mehta", role: "Community Lead", img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=400&q=60" },
              ].map((member, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="text-start">
            <h2 className="text-2xl mb-6 text-[#006D77]">Our Values</h2>
            <p className="text-gray-600 mx-auto mb-10">
              At CodeAtoms, we believe in collaboration, innovation, and empowerment.  
              We aim to build a platform that supports developers — not just with tools,
              but with opportunities to grow, share, and inspire the global tech community.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
