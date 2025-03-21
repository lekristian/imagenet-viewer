import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IChildBox {}

const ChildBox: React.FC<IChildBox> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Child Distribution</CardTitle>
        <CardDescription>Overview of direct children</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 rounded-md bg-muted p-4">
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Child distribution visualization would appear here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildBox;
