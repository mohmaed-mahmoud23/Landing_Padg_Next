"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTypes, fetchTypes } from "../../hooks/useTypes";
import { search as searchApi } from "../../lib/api";
import type { Type } from "../../lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const TypesList = dynamic(
  () => import("../../components/TypesList").then((m) => m.TypesList),
  { ssr: false }
);

export default function HomePageClient() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { types, links, isLoading, isError, refetch } = useTypes(page);

  // ✅ Prefetch للـ Types
  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["types", page],
      queryFn: () => fetchTypes(page),
    });
  }, [page, queryClient]);

  // ✅ فانكشن السيرش (زي الكود الأول)
  const handleSearch = async (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!value) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await searchApi(value);
        const flatRes =
          Array.isArray(res) && Array.isArray(res[0]) ? res[0] : res;
        setResults(flatRes);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
  };

  // ✅ Helper
  const getResultLink = (item: any): string => `/parts/${item.id || item._id}`;

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSelect = () => {};

  const renderTypeItem = (type: Type, children: React.ReactNode) => (
    <Link href={`/types/${type.id}`} key={type.id} prefetch>
      <div className="block h-full w-full">{children}</div>
    </Link>
  );

  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-[#e5f1fc] to-[#f2f4ff] dark:bg-[radial-gradient(ellipse_at_center,_rgb(16,13,33)_0%,_#0b0a1a_100%)]">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
          Browse Vehicle Parts
        </h1>

        {/* ✅ Search Input + Dropdown */}
        <div className="relative mb-6 w-full md:w-1/2">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-base bg-white dark:bg-gray-800"
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          {showDropdown && results.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
              {results.map((item, idx) => (
                <a
                  key={item.id || item._id || idx}
                  href={getResultLink(item)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setShowDropdown(false);
                    router.push(getResultLink(item));
                  }}
                >
                  <span className="font-semibold mr-2">
                    [
                    {[item.type, item.subtype, item.submodel, item.year]
                      .filter(Boolean)
                      .join(" - ")}
                    ]
                  </span>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ✅ لو مفيش بحث: اعرض الـ Types */}
        {isLoading ? (
          <div className="text-center text-gray-500">
            Loading vehicle types...
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Error loading vehicle types.
            <button onClick={refetch} className="underline text-blue-500 ml-2">
              Retry
            </button>
          </div>
        ) : (
          <TypesList
            types={types}
            links={links}
            onSelect={handleSelect}
            onPageChange={handlePageChange}
            renderItem={renderTypeItem}
          />
        )}
      </div>
    </main>
  );
}
