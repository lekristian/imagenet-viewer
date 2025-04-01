import { Loader2 } from "lucide-react";
import React from "react";
import { TreeNode } from "./TreeNode";
import { Button } from "../ui/button";
// Types
import type { Node } from "@/types/Node";

interface TreeNodeChildsProps {
  nodes: Node[];
  visibleNodes: Node[];
  parentPath?: Node[];
  rootNode: Node;
  level: number;
  isLoading: boolean;
  hasMore: boolean;
  onSelect: (node: Node, path: Node[]) => void;
  onLoadMoreChildren: () => void;
}

export const TreeNodeChilds: React.FC<TreeNodeChildsProps> = (props) => {
  const {
    isLoading,
    nodes,
    visibleNodes,
    rootNode,
    hasMore,
    level,
    parentPath,
    onLoadMoreChildren,
    onSelect,
  } = props;
  return (
    <div>
      {isLoading ? (
        <div className="flex items-center py-2 pl-8">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      ) : (
        <>
          {visibleNodes.map((child) => (
            <TreeNode
              key={child.id}
              nodeId={child.id}
              propNode={child}
              onSelect={onSelect}
              level={level + 1}
              parentPath={[...(parentPath || []), rootNode]}
            />
          ))}

          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-8 mt-1 text-xs"
              onClick={onLoadMoreChildren}
            >
              Load more ({nodes.length - visibleNodes.length} remaining)
            </Button>
          )}
        </>
      )}
    </div>
  );
};
