import React from "react";

const CashOnDeliveryCheckbox = (props: { setTrueOrFalse: Function }) => {
  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    props.setTrueOrFalse(isChecked);
  };

  return (
    <div className="flex items-center space-x-2 p-8">
      <input
        type="checkbox"
        id="cashOnDelivery"
        className="appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor="cashOnDelivery"
        className="text-sm text-gray-700 cursor-pointer"
      >
        Cash on Delivery
      </label>
    </div>
  );
};

export default CashOnDeliveryCheckbox;
