import React from "react";

const CashOnDeliveryCheckbox = (props: { setTrueOrFalse: Function }) => {
  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    props.setTrueOrFalse(isChecked);
  };

  return (
    <div>
      <label htmlFor="cashOnDelivery">Cash on Delivery:</label>
      <input
        type="checkbox"
        id="cashOnDelivery"
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default CashOnDeliveryCheckbox;
