import { Suspense } from "react";

import CustomerSupport from "./cli";

export const metadata = {
  title: "Customer Support | CodeAtoms",
  description:
    "Get help and support for your developer tools on CodeAtoms. Our dedicated customer support team is here to assist you with any questions or issues you may have.",
};

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
