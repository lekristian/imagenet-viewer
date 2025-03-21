import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Node } from "@/types/Node";
import ChildBox from "./ChildBox";
import ParentBox from "./ParentBox";

interface NodeDetailsProps {
  node: Node | null;
}

export const NodeDetails: React.FC<NodeDetailsProps> = ({
  node,
}: NodeDetailsProps) => {
  if (!node) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a node to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{node.name}</CardTitle>
          <CardDescription>WNID: {node.wnid}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Details</h3>
              <dl className="grid grid-cols-[1fr_2fr] gap-x-4 gap-y-2">
                <dt className="text-sm font-medium text-muted-foreground">
                  Size:
                </dt>
                <dd>{node.size.toLocaleString()} items</dd>
                <dt className="text-sm font-medium text-muted-foreground">
                  Has children:
                </dt>
                <dd>{node.hasChildren ? "Yes" : "No"}</dd>
              </dl>
            </div>
            {/* TODO: Add parent tree details */}
            <ParentBox />
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add child distribution details*/}
      {node.hasChildren && <ChildBox />}
    </div>
  );
};
