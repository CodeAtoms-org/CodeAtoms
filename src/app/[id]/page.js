import { supabase } from "../../../supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import ToolClient from "./ToolClient";
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Fetch tool data
    const { data: tool } = await supabase
        .from("tools")
        .select("title, description")
        .eq("uid", id)
        .single();

    if (!tool) {
        return { title: "Tool not found | CodeAtoms" };
    }

    return {
        title: `${tool.title} | CodeAtoms`,
        description: tool.description?.slice(0, 150),
        openGraph: {
            title: tool.title,
            description: tool.description?.slice(0, 150),
            url: `https://www.codeatoms.org/${id}`,
            images: [
                {
                    url: `https://www.codeatoms.org/api/og?title=${encodeURIComponent(
                        tool.title
                    )}&description=${encodeURIComponent(
                        tool.description?.slice(0, 100) || ""
                    )}`,
                    width: 1200,
                    height: 630,
                    alt: tool.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: tool.title,
            description: tool.description?.slice(0, 150),
            images: [
                `https://www.codeatoms.org/api/og?title=${encodeURIComponent(
                    tool.title
                )}&description=${encodeURIComponent(tool.description?.slice(0, 100) || "")}`,
            ],
        },
    };
}

export default async function ToolPage({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { data: tool, error } = await supabase
        .from("tools")
        .select("*")
        .eq("uid", id)
        .single();

    if (!tool || error) return notFound();

    // ✅ Pass server-fetched tool to client component
    return (
        <>
            <Header />
            <ToolClient tool={tool} />
            <Footer />
        </>
    );
}