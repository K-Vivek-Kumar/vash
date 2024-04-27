import axios from "axios";

const ActivateProductButton = (props: { productId: number }) => {
  const handleActivateProduct = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/activate/${props.productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Product activated successfully");
      } else {
        alert(response.data);
      }
    } catch (error: any) {
      console.error("Error activating product:", error.message);
      alert("Failed to activate product");
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleActivateProduct}
    >
      Activate Product
    </button>
  );
};

export default ActivateProductButton;
