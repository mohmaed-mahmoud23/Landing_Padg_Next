import React from 'react';
import { useParts } from '../hooks/useParts';
import type { Part } from '../lib/types';

interface PartsListProps {
  modelYearId: string;
  versionId?: string;
}

export const PartsList: React.FC<PartsListProps> = ({ modelYearId, versionId }) => {
  const { parts, isLoading, isError } = useParts(modelYearId, versionId);

  if (isLoading) return <div>Loading parts...</div>;
  if (isError) return <div>Error loading parts.</div>;
  if (!parts || parts.length === 0) return <div>No parts found.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {parts.map((part) => (
        <div
          key={part.id}
          className="flex flex-col items-center justify-center  bg-gradient-to-b from-[#4998a455] to-[#4998a4]  dark:bg-gray-900 border border-transparent rounded-2xl shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30 hover:shadow-[0_0_30px_#8b5cf6]  dark:hover:shadow-[0_0_30px_#8b5cf6] p-12 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
        >
          {part.image ? (
            <img
              src={part.image}
              alt={part.name}
              className="w-48 h-16 object-contain mb-2 rounded"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-2 rounded">
              <span className="text-white text-2xl">🔩</span>
            </div>
          )}
          <span className="font-medium text-center text-sm mt-1">
            {part.name}
          </span>
          {part.dimensions && (
            <span className="text-xs text-gray-500 mt-1">
              {part.dimensions}
            </span>
          )}
          {typeof part.points === "number" && (
            <span className="text-xs text-white mt-1">
              Points: {part.points}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}; 