"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PartsList } from "../../../../../../../../../../components/PartsList";

export default function PartsPage({
  params,
}: {
  params: {
    typeId: string;
    modelId: string;
    submodelId: string;
    yearId: string;
  };
}) {
  const { typeId, modelId, submodelId, yearId } = React.use(params);
  const router = useRouter();

  return (
    <div className="min-h-screen  text-black dark:text-white bg-white dark:bg-[radial-gradient(ellipse_at_center,_rgb(16,13,33)_0%,_#0b0a1a_100%)]">
      <main className="max-w-7xl mx-auto p-8 pt-20 text-white">
        <button
          onClick={() => router.back()}
          className="text-blue-400 hover:underline mb-6 mt-14 inline-block"
        >
          ← Back to Model Year
        </button>
        <h1 className="text-3xl font-bold mb-8   text-black dark:text-white">
          Parts
        </h1>
        <PartsList modelYearId={yearId} />
      </main>
    </div>
  );
}
