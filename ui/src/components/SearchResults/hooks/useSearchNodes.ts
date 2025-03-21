import { useCallback, useEffect, useState } from "react";
import { pageSize } from "../types";
// Types
import type { Node } from "@/types/Node";

const apiUrl = import.meta.env.VITE_API_URL || "http://finvix_api:8080";
const resolvedApiUrl =
  window.location.hostname === "localhost" ? "http://localhost:8080" : apiUrl;
export const useSearchNodes = (query: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Node[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleLoadMore = useCallback(() => {
    setPage(page + 1);
  }, [page, setPage]);

  useEffect(() => {
    const searchNodes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${resolvedApiUrl}/search?query=${query}&page=${page}&limit=${pageSize}`
        );
        const data = await response.json();

        setResults(data);
        setHasMore(data.length > pageSize);
      } catch (error) {
        console.error("Error searching nodes:", error);
      } finally {
        setLoading(false);
      }
    };

    searchNodes();
  }, [query, page]);

  return {
    isLoading: loading,
    nodes: results,
    onLoadMorePages: handleLoadMore,
    hasMore,
    page,
  };
};
