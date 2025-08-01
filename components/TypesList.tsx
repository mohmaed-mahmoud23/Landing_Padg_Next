import React from "react";
import type { Type } from "../lib/types";
import { PaginationLink } from "../hooks/useTypes";
import Pagination from "./ui/pagination";

interface TypesListProps {
  types: Type[];
  links: PaginationLink[];
  onSelect: (type: Type) => void;
  onPageChange: (page: number) => void;
  renderItem?: (type: Type, children: React.ReactNode) => React.ReactNode;
}

export const TypesList: React.FC<TypesListProps> = ({
  types,
  links,
  onSelect,
  onPageChange,
  renderItem,
}) => {
  if (!types || types.length === 0) return <div>No types found.</div>;

  return (
  <>
    <div className="w-full rounded-2xl p-4 
      dark:bg-transparent transition-colors duration-300">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {types.map((type) => {
          const card = (
            <button
              key={type.id}
              className="flex flex-col items-center justify-center 
                bg-white dark:bg-gradient-to-b dark:from-[#4998a455] dark:to-[#4998a4] 
                border border-transparent rounded-2xl shadow-md 
                transition-all duration-300 ease-in-out 
                hover:scale-105 hover:ring-4 hover:ring-[#8b5cf6]/30 
                hover:shadow-[0_0_30px_#8b5cf6] dark:hover:shadow-[0_0_30px_#8b5cf6] 
                p-12 cursor-pointer aspect-[4/3] w-full h-full min-h-[240px] min-w-0 overflow-hidden"
              onClick={() => onSelect(type)}
              style={{ minHeight: 0 }}
            >
              {type.image ? (
                <img
                  width={56}
                  src={type.image}
                  alt={type.name}
                  className="w-full h-40 object-contain mb-6 rounded flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 mb-6 rounded flex-shrink-0">
                  <span className="text-white text-4xl">🚗</span>
                </div>
              )}
              <span
                className="font-medium text-center text-base w-full flex items-center justify-center overflow-hidden text-ellipsis px-4 min-h-[1.5rem] line-clamp-1 whitespace-nowrap"
                title={type.name}
                aria-label={type.name}
              >
                {type.name}
              </span>
            </button>
          );
          return renderItem ? renderItem(type, card) : card;
        })}
      </div>
    </div>

    <Pagination links={links} onPageChange={onPageChange} />
  </>
);

};
