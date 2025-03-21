"use client";

import { ChevronRight, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Node } from "@/types/Node";
import { useFetchNode } from "./hooks/useFetchNode";
import { TreeNodeChilds } from "./TreeNodeChilds";
import { useCallback } from "react";
import { useStyle } from "./hooks/useStyle";

interface TreeNodeProps {
  nodeId: number;
  onSelect: (node: Node, path: Node[]) => void;
  level: number;
  parentPath?: Node[];
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  nodeId,
  onSelect,
  level,
  parentPath = [],
}: TreeNodeProps) => {
  // Custom hooks
  const { paddingLeft } = useStyle(level);
  const {
    node,
    expanded,
    childrens,
    isLoading,
    visibleChildNodes,
    hasMore,
    onLoadMoreChildren,
    onToggleExpanded,
  } = useFetchNode(nodeId);

  // Hadlers
  const handleSelect = useCallback(() => {
    if (!node) {
      return;
    }
    const currentPath = [...(parentPath || []), node];
    onSelect(node, currentPath);
  }, [node, parentPath, onSelect]);

  // Render
  if (!node) {
    return (
      <div className="pl-4">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center py-1 hover:bg-muted/50"
        style={{ paddingLeft }}
      >
        {node.hasChildren ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggleExpanded}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" />
        )}

        <div
          className="ml-1 flex-1 cursor-pointer truncate"
          onClick={handleSelect}
        >
          <span className="font-medium">{node.name}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            {node.wnid}
          </span>
          {node.size > 0 && (
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">
              {node.size.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {expanded && (
        <TreeNodeChilds
          nodes={childrens}
          visibleNodes={visibleChildNodes}
          rootNode={node}
          level={level}
          parentPath={parentPath}
          isLoading={isLoading}
          hasMore={hasMore}
          onSelect={onSelect}
          onLoadMoreChildren={onLoadMoreChildren}
        />
      )}
    </div>
  );
};
