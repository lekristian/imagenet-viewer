import React from "react";

interface IParentBox {}

const ParentBox: React.FC<IParentBox> = () => {
  return (
    <div>
      <h3 className="mb-2 font-semibold">Parent tree</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md bg-muted"
            style={{
              backgroundImage: `url(/placeholder.svg?height=100&width=100)`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParentBox;
