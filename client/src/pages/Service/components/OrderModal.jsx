import React, { useState } from "react";
const OrderModal = ({ setShowOrderModal, service }) => {
  const [requirement, setRequirement] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const placeOrder = async () => {
    try {
      const response = await fetch(
        `https://freelance-lite.onrender.com/api/freelancer/service/${service._id}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ requirement }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
        setButtonDisable(false);
        setShowOrderModal(false);
      } else {
        const errorText = await response.text(); // yaha raw text milega
        console.error("❌ Failed to place order:", response.status, errorText);
        setButtonDisable(false);
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Order This Service</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{service?.title}</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery: {service?.deliveryTime} days</span>
              <span>Revisions: {service?.revisions}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">₹{service?.price}</span>
            </div>
          </div>

          <textarea
            placeholder="Describe your requirements (optional)"
            rows={3}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowOrderModal(false);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={buttonDisable}
              onClick={() => {
                setButtonDisable(true);
                console.log("clicked");
                placeOrder();
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
