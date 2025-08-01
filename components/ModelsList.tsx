import React from "react";
import { useModels } from "../hooks/useModels";
import type { Model } from "../lib/types";

interface ModelsListProps {
  typeId: string;
  onSelect: (model: Model) => void;
  renderItem?: (model: Model, children: React.ReactNode) => React.ReactNode;
}

export const ModelsList: React.FC<ModelsListProps> = ({
  typeId,
  onSelect,
  renderItem,
}) => {
  const { models, isLoading, isError } = useModels(typeId);

  if (isLoading) return <div>Loading models...</div>;
  if (isError) return <div>Error loading models.</div>;
  if (!models || models.length === 0) return <div>No models found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {models.map((model) => {
        const card = (
          <button
            key={model.id}
            className="flex flex-col items-center justify-center 
      bg-white dark:bg-gradient-to-b dark:from-[#4998a455] dark:to-[#4998a4] 
      border border-transparent rounded-2xl shadow-md 
      transition-all duration-300 ease-in-out 
      hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30 
      hover:shadow-[0_0_30px_#8b5cf6] dark:hover:shadow-[0_0_30px_#8b5cf6] 
      p-12 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(model)} 
            style={{ minHeight: 0 }}
          >
            {model.image ? (
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-40 object-contain mb-6 rounded flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-white text-4xl">🚗</span>
              </div>
            )}

            <span
              className="font-medium text-center text-base 
  w-full flex items-center justify-center overflow-hidden 
  text-ellipsis px-4 min-h-[1.5rem] line-clamp-1 whitespace-nowrap 
  text-black dark:text-white"
              title={model.name}
              aria-label={model.name}
            >
              {model.name}
            </span>
          </button>
        );
        return renderItem ? renderItem(model, card) : card;
      })}
    </div>
  );
};
