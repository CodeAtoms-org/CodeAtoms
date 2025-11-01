import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "CodeAtoms Tool";
  const description = searchParams.get("description") || "Explore the best developer tools on CodeAtoms";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #006D77, #83C5BE)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "900" }}>🧩 CodeAtoms</div>
        <div style={{ marginTop: 30 }}>{title}</div>
        <div style={{ fontSize: 28, fontWeight: "normal", marginTop: 20 }}>
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
