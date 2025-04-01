import { useEffect, useState } from "react";
// Types
import type { Node } from "@/types/Node";
const pageSize = 50;
const apiUrl = import.meta.env.VITE_API_URL || "http://finvix_api:8080";

const resolvedApiUrl =
  window.location.hostname === "localhost" ? "http://localhost:8080" : apiUrl;

export const useFetchNode = (nodeId: number, propNode?: Node) => {
  const [node, setNode] = useState<Node | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [childrens, setChildrens] = useState<Node[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleChildrens, setVisibleChildrens] = useState<Node[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadMoreChildren = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize;
    const end = start + pageSize;

    setVisibleChildrens([...visibleChildrens, ...childrens.slice(start, end)]);
    setPage(nextPage);
    setHasMore(end < childrens.length);
  };

  // Fetch node data
  useEffect(() => {
    const fetchNode = async () => {
      if (propNode) {
        setNode(propNode);
        return;
      }

      try {
        const response = await fetch(`${resolvedApiUrl}/hierarchy/${nodeId}`);
        const data = await response.json();

        setNode(data);
      } catch (error) {
        console.error("Error fetching node:", error);
      }
    };

    fetchNode();
  }, [nodeId, propNode]);

  // Fetch children when expanded
  useEffect(() => {
    if (expanded && childrens.length === 0) {
      const fetchChildren = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${resolvedApiUrl}/hierarchy/${nodeId}/children?page=${page}&limit=${pageSize}`
          );
          const { data } = await response.json();

          setChildrens(data);
          setVisibleChildrens(data.slice(0, pageSize));
          setHasMore(data.length > pageSize);
        } catch (error) {
          console.error("Error fetching children:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchChildren();
    }
  }, [expanded, nodeId, childrens.length, page]);

  return {
    node,
    expanded,
    childrens,
    isLoading: loading,
    visibleChildNodes: visibleChildrens,
    hasMore,
    onLoadMoreChildren: loadMoreChildren,
    onToggleExpanded: () => setExpanded(!expanded),
  };
};
