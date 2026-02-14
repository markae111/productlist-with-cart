import React from "react";
import { useCart } from "../Context/CartContext";
import iconConfirmed from "../assets/images/icon-order-confirmed.svg";

export default function OrderModal({ onNewOrder }) {
  const { cart, resetCart } = useCart();

  // Calculate the total price for the final receipt
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Helper for thumbnail images
  function getImageUrl(name) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
  }

  const handleStartNewOrder = () => {
    resetCart(); // Clears local storage and state
    onNewOrder(); // Closes the modal in App.jsx
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4 font-red-hat">
      {/* Modal Container */}
      <div className="bg-white w-full md:max-w-[590px] p-6 md:p-10 rounded-t-3xl md:rounded-2xl max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* Success Header */}
        <img src={iconConfirmed} alt="Success" className="w-12 h-12 mb-6" />
        <h2 className="text-4xl font-bold text-rose-900 mb-2 leading-tight">
          Order Confirmed
        </h2>
        <p className="text-rose-400 mb-8 font-medium">
          We hope you enjoy your food!
        </p>

        {/* Receipt Container */}
        <div className="bg-rose-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col divide-y divide-rose-100">
            {cart.map((item) => (
              <div
                key={item.name}
                className="py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <img
                    src={getImageUrl(item.image.thumbnail.split("/").pop())}
                    className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                    alt={item.name}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-rose-900 text-sm truncate">
                      {item.name}
                    </p>
                    <div className="flex gap-4 items-center mt-1">
                      <span className="text-red-custom font-bold text-sm">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-400 text-sm">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-rose-900 flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Grand Total Section */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-rose-100">
            <p className="text-rose-900 text-sm font-medium">Order Total</p>
            <p className="text-rose-900 text-2xl font-bold">
              ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartNewOrder}
          className="w-full bg-red-custom text-white font-bold py-4 rounded-full hover:bg-rose-900 transition-all duration-300 shadow-lg active:scale-[0.98]"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
