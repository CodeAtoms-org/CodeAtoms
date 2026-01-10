"use client";

import React from "react";
import { Boxes, Package, ShieldCheck } from "lucide-react";
import { BentoGrid, BentoCard } from "./BentoGrid";

export default function BelowSection() {

  const openSourceTools = [
    {
      name: "PocketMocker",
      type: "NPM · DEV UTILITY",
      description: "Browser-native visual API mocking tool.",
      color: "bg-purple-500",
    },
    {
      name: "Kint",
      type: "CLI · DEV UTILITY",
      description: "Advanced PHP data dumper.",
      color: "bg-indigo-500",
    },
    {
      name: "kubefwd",
      type: "CLI · PRODUCTIVITY",
      description: "Bulk Kubernetes port forwarding.",
      color: "bg-orange-500",
    },
    {
      name: "Pythagora",
      type: "NPM · DEV UTILITY",
      description: "Generate automated tests via LLMs.",
      color: "bg-blue-500",
    },
    {
      name: "Murex",
      type: "CLI · DEV UTILITY",
      description: "A smarter, more readable shell.",
      color: "bg-green-500",
    },
    {
      name: "Tach",
      type: "CLI · DEV UTILITY",
      description: "Enforce modular Python architecture.",
      color: "bg-sky-500",
    },
    {
      name: "Atom",
      type: "DESKTOP · EDITOR",
      description: "Hackable text editor (deprecated).",
      color: "bg-gray-500",
    },
    {
      name: "MiniSim",
      type: "MACOS · DEV TOOL",
      description: "Menu bar launcher for mobile emulators.",
      color: "bg-rose-500",
    },];
  return (
    <section className="px-10 md:px-20 py-10 bg-white">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-4">

        {/* Quote */}
        <p className="text-sm md:text-base text-gray-600 max-w-3xl">
          “Every great idea deserves the right tools — so you can build boldly,
          freely, and innovate without limits.”
        </p>

        {/* Icon */}
        <div className="flex items-center justify-center mt-20  text-[#006D77]">
          <h2 className="">CODEATOMS</h2>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
          The Home of Developer Tools
        </h2>

        {/* Subheading */}
        <p className="text-base md:text-md text-gray-600 max-w-2xl">
          The most trusted marketplace for developers
        </p>

        {/* Bento Grid */}
        <div className="mt-14 w-full">
          <BentoGrid>
            {/* Card 1 — Large */}
            <BentoCard
              name="Discover Developer Tools"
              description="Explore the best tools curated for modern developers."
              href="/explore"
              cta="Explore tools"
              className="md:col-span-2"
              background={
                <img
                  src="/images/cardtools.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              }
            />

            {/* Card 2 */}
            <BentoCard
              name="Browse by Category"
              description="Find tools by language, framework, or use case."
              href="/explore"
              cta="Get started"
              Icon={Boxes}
              className="md:col-span-1"
              background={
                <img
                  src="/images/cardcategories.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              }
            />

            {/* Card 3 */}
            <BentoCard
              name="Verified Developer Reviews"
              description="Real feedback from developers who actually use the tools."
              href="/"
              cta="Browse Marketplace"
              Icon={ShieldCheck}
              className="md:col-span-1"
              background={
                <img
                  src="/images/cardreview.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              }
            />

            {/* Card 4 — Full width */}
            <BentoCard
              name="Customer Support"
              description="Get help directly from tool creators when you need it."
              href="/"
              cta="Browse marketplace"
              Icon={Boxes}
              className="md:col-span-2"
              background={
                <img
                  src="/images/cardsupport.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              }
            />
          </BentoGrid>
        </div>
        <><h2 className="text-2xl mt-20 md:text-2xl lg:text-3xl font-semibold text-gray-900">
          OPEN SOURCE
        </h2>

          {/* Subheading */}
          <p className="text-base md:text-md text-gray-600 max-w-2xl">
            We contain some of the most popular open source developer tools in the world.
          </p>

          {/* OPEN SOURCE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 lg:grid-cols-4 gap-6">
            {openSourceTools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-2xl bg-white border border-gray-200 p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${tool.color}`} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tool.name}
                  </h3>
                </div>

                {/* Stars */}
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">

                  {tool.type}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>

        </>

        <div>
          <section className="mt-20 text-black ">
  <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
FOR YOU
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        title: "How to Sell a Developer Tool",
        href: "/how-to-sell-a-developer-tool",
      },
      {
        title: "Sell a Developer Tool Without Building a SaaS",
        href: "/article/sell-developer-tool-without-building-saas",
      },
      {
        title: "How to Publish Your Tool on CodeAtoms",
        href: "/guides/how-to-publish-your-tool",
      },
    ].map((post, idx) => (
      <a
        key={idx}
        href={post.href}
        className="
          group flex flex-col overflow-hidden
          rounded-2xl border 
          hover:shadow-lg transition
        "
      >
        {/* SVG IMAGE */}
        <div className="h-44 w-full flex items-center justify-center ">
          <img
            src="/logo.png"
            alt=""
            className=" h-24 object-contain opacity-80 group-hover:opacity-100 transition"
          />
        </div>

        {/* TITLE */}
        <div className="p-5">
          <h3 className="text-lg  leading-snug ">
            {post.title}
          </h3>
        </div>
      </a>
    ))}
  </div>
</section>



        </div>
        <h3 className="mt-10">Created with love for Developers.</h3>

      </div>
    </section>
  );
}
