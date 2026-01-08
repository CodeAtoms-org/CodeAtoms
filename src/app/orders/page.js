import OrdersPage from "./cli";

export const metadata = {
  title: "Your Orders | CodeAtoms",
  description:
    "View and manage your purchased developer tools, APIs, and SaaS products on CodeAtoms",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  alternates: {
    canonical: "https://www.codeatoms.org/orders",
  },
};

export default function Orders() {  
  return (
    <OrdersPage />
  );
}
