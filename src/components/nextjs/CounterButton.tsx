// CounterButton.tsx
import React from "react";

const CounterButton = React.memo(function CounterButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(`Rendering <${label} /> button`);

  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
});

export default CounterButton;
