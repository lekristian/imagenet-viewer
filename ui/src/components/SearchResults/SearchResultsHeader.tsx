import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface SearchResultsHeaderProps {
  onClick: () => void;
  query: string;
}
export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  onClick,
  query,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">
        Search Results:{" "}
        <span className="font-normal text-muted-foreground">{query}</span>
      </h3>
      <Button variant="ghost" size="icon" onClick={onClick}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};
