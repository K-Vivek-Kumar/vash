import React from "react";
import jsPDF from "jspdf";

const PDFGeneratorButton = (props: {
  orderId: number;
  productName: string;
  dateOfOrder: string;
  price: number;
  dateOfDelivery: string;
}) => {
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text(`Order ID: ${props.orderId}`, 10, 10);
    doc.text(`Product Name: ${props.productName}`, 10, 20);
    doc.text(`Amount: $ ${props.price}`, 10, 30);
    doc.text(`Ordered on: ${props.dateOfOrder}`, 10, 40);
    doc.text(`Delivered on: ${props.dateOfDelivery}`, 10, 50);
    doc.text(`This is a digitally signed receipt by vash.in`, 10, 80);
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = `order_${props.orderId}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <button
      className="bg-green-500 text-white rounded-lg p-2"
      onClick={handleGeneratePDF}
    >
      <DownloadButton />
    </button>
  );
};

export default PDFGeneratorButton;

const DownloadButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  );
};
