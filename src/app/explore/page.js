import ToolsSection from "./cli";

import { Suspense } from "react";


export const metadata = {
  title: "Explore Tools | CodeAtoms",
  description:
    "Discover a wide range of developer tools, APIs, and SaaS products on CodeAtoms. Explore, filter, and find the perfect tools to enhance your development workflow.",
};

export default function ToolsPage() {
  

  return (
    <Suspense fallback={<Loading />}>
      <ToolsSection />
    </Suspense>
  );
}


function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading support…</p>
    </div>
  );
}
