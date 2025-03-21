import type { Node } from "@/types/Node";

export interface SearchResultsProps {
  query: string;
  onSelect: (node: Node, path: Node[]) => void;
  onClose: () => void;
}

export const pageSize = 20;
