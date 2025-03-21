import React from "react";
import { Node } from "@/types/Node";
import {
  Breadcrumb as ExternalBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface IBreadcrum {
  breadcrumbs: Node[];
  onSelect: (node: Node, path: Node[]) => void;
}

const CustomBreadcrumb: React.FC<IBreadcrum> = ({ onSelect, breadcrumbs }) => {
  if (!breadcrumbs) return null;

  return (
    <ExternalBreadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((node, index) => (
          <BreadcrumbItem key={node.id}>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelect(node, breadcrumbs.slice(0, index + 1));
              }}
            >
              {node.name}
            </BreadcrumbLink>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </ExternalBreadcrumb>
  );
};

export default CustomBreadcrumb;
