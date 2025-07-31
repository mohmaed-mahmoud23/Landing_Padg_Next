"use client";
import React, { useState } from "react";
import { TypesList } from "../../components/TypesList";
import { useTypes } from "../../hooks/useTypes";
import Link from "next/link";
import type { Type } from "../../lib/types";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const { types, links, isLoading, isError } = useTypes(page);

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_rgb(16,13,33)_0%,_#0b0a1a_100%)] pt-20">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Browse Vehicle Parts
        </h1>
        {isLoading ? (
          <div  className="text-white">Loading types...</div>
        ) : isError ? (
          <div className="text-white">Error loading types.</div>
        ) : (
          <TypesList
            types={types}
            links={links}
            onSelect={() => {}}
            onPageChange={setPage}
            renderItem={(type: Type, children) => (
              <Link href={`/types/${type.id}`} key={type.id} legacyBehavior>
                <a className="block h-full w-full">{children}</a>
              </Link>
            )}
          />
        )}
      </div>
    </main>
  );
}
