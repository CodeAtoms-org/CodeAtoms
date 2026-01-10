export default function GuideCTAButtons({ links }) {
  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold mb-2">
        Continue Reading
      </h3>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="
              group flex rounded-xl text-center justify-center text-white bg-[#006D77]  p-4

            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium   group-hover:underline">
                  {link.label}
                </p>
                
              </div>
            
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
