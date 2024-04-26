import React from "react";
import jsPDF from "jspdf";

const PDFGeneratorButton = (props: {
  orderId: number;
  productName: string;
}) => {
  const handleGeneratePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set up content for the PDF
    doc.text(`Order ID: ${props.orderId}`, 10, 10);
    doc.text("Product Names:", 10, 20);

    doc.text(props.productName, 10, 50);

    // Save the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Create a Blob URL for the PDF
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = `order_${props.orderId}.pdf`; // Set filename

    // Append the download link to the document body and trigger click
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up: remove the download link
    document.body.removeChild(downloadLink);
  };

  return (
    <button onClick={handleGeneratePDF}>
      Generate PDF for Order {props.orderId}
    </button>
  );
};

export default PDFGeneratorButton;
