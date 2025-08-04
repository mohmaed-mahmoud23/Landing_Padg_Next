"use client";

import React, { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { useSubmodels } from "../hooks/useSubmodels";
import type { Submodel } from "../lib/types";

interface SubmodelsListProps {
  modelId: string;
  onSelect: (submodel: Submodel) => void;
  renderItem?: (
    submodel: Submodel,
    children: React.ReactNode
  ) => React.ReactNode;
}

export const SubmodelsList: React.FC<SubmodelsListProps> = memo(
  ({ modelId, onSelect, renderItem }) => {
    const {
      data: submodels,
      isLoading,
      isError,
      refetch,
    } = useSubmodels(modelId);

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = "none";
      },
      []
    );

    const renderCard = useCallback(
      (submodel: Submodel) => {
        const card = (
          <button
            className="flex flex-col items-center justify-center
              bg-white dark:bg-gradient-to-b dark:from-[#4998a455] dark:to-[#4998a4]
              border border-transparent rounded-2xl shadow-md
              transition-transform duration-300 ease-in-out
              hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30
              hover:shadow-[0_0_30px_#8b5cf6] dark:hover:shadow-[0_0_30px_#8b5cf6]
              p-8 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px]"
            onClick={() => onSelect(submodel)}
            aria-label={`Select submodel ${submodel.name}`}
          >
            {submodel.image ? (
              <div className="w-full h-32 relative mb-4">
                <Image
                  src={submodel.image}
                  alt={submodel.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                  onError={handleImageError}
                  priority={false}
                />
              </div>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded">
                <span className="text-gray-400 dark:text-white text-4xl">
                  🚙
                </span>
              </div>
            )}
            <span
              className="font-medium text-center text-base text-black dark:text-white
                w-full px-4 truncate"
              title={submodel.name}
            >
              {submodel.name}
            </span>
          </button>
        );

        return renderItem ? renderItem(submodel, card) : card;
      },
      [onSelect, renderItem, handleImageError]
    );

    const content = useMemo(() => {
      if (isLoading) {
        return (
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
        );
      }

      if (isError) {
        return (
          <div className="text-red-500 font-medium mt-6" role="alert">
            Error loading submodels.
            <button onClick={refetch} className="ml-2 text-blue-500 underline">
              Retry
            </button>
          </div>
        );
      }

      if (!submodels || submodels.length === 0) {
        return <div className="text-gray-500">No submodels found.</div>;
      }

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {submodels.map((submodel) => (
            <div key={submodel.id || submodel._id}>{renderCard(submodel)}</div>
          ))}
        </div>
      );
    }, [isLoading, isError, submodels, renderCard, refetch]);

    return content;
  }
);

SubmodelsList.displayName = "SubmodelsList";
