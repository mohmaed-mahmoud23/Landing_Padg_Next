import React, { memo, useCallback, useMemo } from "react";
import { useModelYears } from "../hooks/useModelYears";
import type { ModelYear } from "../lib/types";

interface ModelYearsListProps {
  submodelId: string;
  onSelect: (modelYear: ModelYear) => void;
  renderItem?: (
    modelYear: ModelYear,
    children: React.ReactNode
  ) => React.ReactNode;
}

export const ModelYearsList: React.FC<ModelYearsListProps> = memo(
  ({ submodelId, onSelect, renderItem }) => {
    const { data: modelYears, isLoading, isError } = useModelYears(submodelId);

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = "none";
      },
      []
    );

    const renderCard = useCallback(
      (modelYear: ModelYear) => {
        const card = (
          <button
            key={modelYear.id || modelYear._id}
            className="flex flex-col items-center justify-center 
              bg-white dark:bg-gradient-to-b dark:from-[#4998a455] dark:to-[#4998a4] 
              border border-transparent rounded-2xl shadow-md 
              transition-all duration-300 ease-in-out 
              hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30 
              hover:shadow-[0_0_30px_#8b5cf6] dark:hover:shadow-[0_0_30px_#8b5cf6] 
              p-12 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(modelYear)}
            style={{ minHeight: 0 }}
          >
            {modelYear.image ? (
              <img
                src={modelYear.image}
                alt={String(modelYear.name)}
                className="w-full h-20 object-contain mb-6 rounded flex-shrink-0"
                onError={handleImageError}
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-gray-400 text-4xl">📅</span>
              </div>
            )}
            <p
              className="font-medium text-center text-sm w-full px-2 mt-2 leading-snug break-words text-black dark:text-white"
              title={String(modelYear.name)}
              aria-label={String(modelYear.name)}
            >
              {String(modelYear.name)}
            </p>
          </button>
        );

        return renderItem ? renderItem(modelYear, card) : card;
      },
      [onSelect, renderItem, handleImageError]
    );

    const content = useMemo(() => {
      if (isLoading) return <div>Loading model years...</div>;
      if (isError) return <div>Error loading model years.</div>;
      if (!modelYears || modelYears.length === 0)
        return <div>No model years found.</div>;

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {modelYears.map((modelYear) => (
            <div key={modelYear.id || modelYear._id}>
              {renderCard(modelYear)}
            </div>
          ))}
        </div>
      );
    }, [isLoading, isError, modelYears, renderCard]);

    return content;
  }
);

ModelYearsList.displayName = "ModelYearsList";
