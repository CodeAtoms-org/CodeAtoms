import { Suspense } from "react";

import CustomerSupport from "./cli";

export default function CustomerSupportPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CustomerSupport />
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
