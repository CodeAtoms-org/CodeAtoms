import OrdersPage from "./cli";

export const metadata = {
  title: "Your Orders | CodeAtoms",
  description:
    "View and manage your purchased developer tools, APIs, and SaaS products on CodeAtoms. Access your order history and download your tools easily.",
};

export default function Orders() {  
  return (
    <OrdersPage />
  );
}
