import React from "react";
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

export const SubmodelsList: React.FC<SubmodelsListProps> = ({
  modelId,
  onSelect,
  renderItem,
}) => {
  const { submodels, isLoading, isError } = useSubmodels(modelId);

  if (isLoading) return <div>Loading submodels...</div>;
  if (isError) return <div>Error loading submodels.</div>;
  if (!submodels || submodels.length === 0)
    return <div>No submodels found.</div>;

  console.log("Submodels:", submodels);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
      {submodels.map((submodel) => {
        const card = (
          <button
            className="flex flex-col items-center justify-center 
              bg-gradient-to-b from-[#4998a455] to-[#4998a4] 
              dark:bg-gray-900 border border-transparent rounded-2xl shadow-md 
              transition-all duration-300 ease-in-out 
              hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30 
              hover:shadow-[0_0_30px_#8b5cf6] dark:hover:shadow-[0_0_30px_#8b5cf6] 
              p-12 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
            onClick={() => onSelect(submodel)}
          >
            {submodel.image ? (
              <img
                src={submodel.image}
                alt={submodel.name}
                className="w-full h-20 object-contain mb-6 rounded flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                <span className="text-gray-400 text-4xl">🚙</span>
              </div>
            )}
            <span
              className="font-medium text-center text-base mt-4 w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[1.5rem] line-clamp-1 whitespace-nowrap text-black dark:text-white"
              title={submodel.name}
              aria-label={submodel.name}
            >
              {submodel.name}
            </span>
          </button>
        );

        return (
          <div key={submodel._id ?? submodel.id}>
            {renderItem ? renderItem(submodel, card) : card}
          </div>
        );
      })}
    </div>
  );
};
