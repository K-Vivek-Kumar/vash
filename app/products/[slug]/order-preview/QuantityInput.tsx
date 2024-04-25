import React, { useState } from "react";

const QuantityInput = ({ onChange }: { onChange: (value: number) => void }) => {
  const [val, setVal] = useState(1);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVal(value);
    onChange(value);
  };

  return (
    <input
      type="number"
      value={val}
      onChange={handleInputChange}
      min={1}
      className="w-16 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default QuantityInput;
