"use client";
// Hooks
import { useCallback, useMemo } from "react";
import { useSearchNodes } from "./hooks/useSearchNodes";
// Components
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { SearchResultsSearchingBanner } from "./SearchResultsSearchingBanner";
import { SearchResultsList } from "./SearchResultsList";
// Constants
import { pageSize } from "./types";
// Types
import type { SearchResultsProps } from "./types";
import type { Node } from "@/types/Node";

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  onSelect,
  onClose,
}: SearchResultsProps) => {
  // Custom hook
  const { isLoading, nodes, onLoadMorePages, hasMore, page } =
    useSearchNodes(query);

  const handleSelectResult = useCallback(
    (result: Node) => {
      onSelect(result, [result]);
      onClose();
    },
    [onSelect, onClose]
  );

  const visibleResults: Node[] = useMemo(() => {
    return nodes.slice(0, page * pageSize);
  }, [nodes, page]);

  // Render
  return (
    <div className="space-y-4">
      <SearchResultsHeader onClick={onClose} query={query} />

      {isLoading && page === 1 ? (
        <SearchResultsSearchingBanner />
      ) : (
        <>
          {visibleResults.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-2">
              <SearchResultsList
                visibleResults={visibleResults}
                onSelect={handleSelectResult}
              />

              {hasMore && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={onLoadMorePages}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load more results (${
                      nodes.length - visibleResults.length
                    } remaining)`
                  )}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
