import axios from "axios";

const PushOrderStatusButton = (props: { orderId: number; status: number }) => {
  const handlePushOrderStatus = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/push-status/${props.orderId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Order status pushed successfully");
      } else {
        alert("Failed to push order status");
      }
    } catch (error: any) {
      console.error("Error pushing order status:", error.message);
      alert("Failed to push order status");
    }
  };

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handlePushOrderStatus}
    >
      {props.status == 1 ? "Dispatch Done" : ""}
      {props.status == 2 ? "Delivery Done" : ""}
      {props.status == 3 ? "Delivered Already" : ""}
    </button>
  );
};

export default PushOrderStatusButton;
