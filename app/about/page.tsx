"use client";

import React, { useState, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTypes, fetchTypes } from "../../hooks/useTypes";
import type { Type } from "../../lib/types";
import { useQueryClient } from "@tanstack/react-query";

const TypesList = dynamic(
  () => import("../../components/TypesList").then((m) => memo(m.TypesList)),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 aspect-[4/3] animate-pulse"
          >
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    ),
  }
);

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center p-4 text-red-500">
      <p className="mb-2">Error loading vehicle types.</p>
      <button
        onClick={onRetry}
        className="text-blue-500 underline hover:text-blue-700"
      >
        Retry
      </button>
    </div>
  );
}

export default function HomePageClient() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Added
  const queryClient = useQueryClient();

  React.useEffect(() => {
    queryClient.prefetchQuery(["types", page], () => fetchTypes(page));
  }, [page, queryClient]);

  const { types, links, isLoading, isError, refetch } = useTypes(page);

  const handlePageChange = useCallback(
    (newPage: number) => setPage(newPage),
    []
  );
  const handleSelect = useCallback(() => {}, []);
  const renderItem = useCallback(
    (type: Type, children: React.ReactNode) => (
      <Link href={`/types/${type.id}`} key={type.id} prefetch>
        <div className="block h-full w-full">{children}</div>
      </Link>
    ),
    []
  );

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-[#e5f1fc] to-[#f2f4ff] dark:bg-[radial-gradient(ellipse_at_center,_rgb(16,13,33)_0%,_#0b0a1a_100%)]">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
          Browse Vehicle Parts
        </h1>

        {/* ✅ Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vehicle types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-slate-800 dark:text-white"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 aspect-[4/3] animate-pulse"
              >
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <ErrorFallback onRetry={refetch} />
        ) : types.length === 0 ? (
          <div className="text-gray-500 mt-6">No types found.</div>
        ) : (
          <TypesList
            types={types}
            links={links}
            onSelect={handleSelect}
            onPageChange={handlePageChange}
            renderItem={renderItem}
            searchTerm={searchTerm} // ✅ Added here
          />
        )}
      </div>
    </main>
  );
}
