import React from "react";
//Types
import type { Node } from "@/types/Node";

interface SearchResultsListProps {
  visibleResults: Node[];
  onSelect: (node: Node) => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  visibleResults,
  onSelect,
}) => {
  return (
    <>
      {visibleResults.map((result) => (
        <div
          key={result.id}
          className="cursor-pointer rounded-md p-3 hover:bg-muted"
          onClick={() => onSelect(result)}
        >
          <div className="font-medium">{result.name}</div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{result.wnid}</span>
            <span>•</span>
            <span>{result.size.toLocaleString()} items</span>
          </div>
        </div>
      ))}
    </>
  );
};
