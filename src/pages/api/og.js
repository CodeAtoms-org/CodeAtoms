import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "CodeAtoms Tool";
  const description =
    searchParams.get("description") ||
    "Discover and publish powerful developer tools at CodeAtoms";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
          color: "white",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at center, #00B4D8, transparent 70%)",
            opacity: 0.25,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle at center, #83C5BE, transparent 70%)",
            opacity: 0.25,
            borderRadius: "50%",
          }}
        />

        {/* Header - CodeAtoms logo + name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "40px 40px 0 40px",
            zIndex: 10,
          }}
        >
          {/* Logo from /logo.png */}
          <img
            src="https://www.codeatoms.org/logo.png" // use absolute URL for OG image
            alt="CodeAtoms Logo"
            style={{
              width: 70,
              height: 70,
              borderRadius: "14px",
              objectFit: "contain",
              background: "rgba(255,255,255,0.1)",
              padding: "8px",
            }}
          />

          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            CodeAtoms
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
            textAlign: "center",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,

              lineHeight: 1.2,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 28,
              opacity: 0.9,
              marginTop: 20,
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            width: "100%",
            height: "20px",
            background:
              "linear-gradient(90deg, #06D6A0, #118AB2, #073B4C, #118AB2, #06D6A0)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
