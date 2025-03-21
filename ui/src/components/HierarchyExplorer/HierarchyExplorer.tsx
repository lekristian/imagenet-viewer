"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { TreeNode } from "@/components/TreeNode/TreeNode";
import { NodeDetails } from "@/components/NodeDetails/NodeDetails";
import { SearchResults } from "@/components/SearchResults/SearchResults";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Node } from "@/types/Node";
import CustomBreadcrumb from "../Breadcrumb/CustomBreadcrumb";

interface IHierarchyExplorer {}

const HierarchyExplorer: React.FC<IHierarchyExplorer> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  // TODO implement zustand to optimise state management
  const [breadcrumbs, setBreadcrumbs] = useState<Node[]>([]);

  // Handle node selection
  // TODO move to custom hook
  const handleNodeSelect = useCallback(
    (node: Node, path: Node[]): void => {
      setSelectedNode(node);
      setBreadcrumbs(path);
    },
    [setSelectedNode, setBreadcrumbs]
  );

  // Handle search
  const handleSearch = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (searchQuery.trim()) {
        setIsSearching(true);
      }
    },
    [searchQuery, setIsSearching]
  );

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      {/* Left panel - Tree navigation */}
      <div className="w-full border-r md:w-1/3 lg:w-1/4 xl:w-1/4">
        <div className="sticky top-0 border-b bg-background p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search by name or WNID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4">
          {isSearching ? (
            <SearchResults
              query={searchQuery}
              onSelect={handleNodeSelect}
              onClose={() => setIsSearching(false)}
            />
          ) : (
            <TreeNode nodeId={1} onSelect={handleNodeSelect} level={0} />
          )}
        </div>
      </div>

      {/* Right panel - Node details */}
      <div className="flex-1 p-6">
        <CustomBreadcrumb
          breadcrumbs={breadcrumbs}
          onSelect={handleNodeSelect}
        />
        <NodeDetails node={selectedNode} />
      </div>
    </div>
  );
};

export default HierarchyExplorer;
