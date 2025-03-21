import { Loader2 } from "lucide-react";
import React from "react";

export const SearchResultsSearchingBanner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      <span>Searching...</span>
    </div>
  );
};
