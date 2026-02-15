import React from "react";
import { useCart } from "../Context/CartContext";
import iconConfirmed from "../assets/images/icon-order-confirmed.svg";

export default function OrderModal({ onNewOrder }) {
  const { cart, resetCart } = useCart();
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const getImageUrl = (name) =>
    new URL(`../assets/images/${name}`, import.meta.url).href;

  const handleStartNewOrder = () => {
    resetCart();
    onNewOrder();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4 font-red-hat">
      <div className="bg-white w-full md:max-w-[590px] p-6 md:p-10 rounded-t-3xl md:rounded-2xl max-h-[95vh] overflow-y-auto">
        <img src={iconConfirmed} alt="Success" className="w-12 h-12 mb-6" />
        <h2 className="text-4xl font-bold text-rose-900 mb-2">
          Order Confirmed
        </h2>
        <p className="text-rose-400 mb-8">We hope you enjoy your food!</p>

        <div className="bg-rose-50 rounded-lg p-6 mb-8">
          <div className="divide-y divide-rose-100">
            {cart.map((item) => (
              <div
                key={item.name}
                className="py-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getImageUrl(item.image.thumbnail.split("/").pop())}
                    className="w-12 h-12 rounded-md"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-rose-900 text-sm truncate w-32 md:w-auto">
                      {item.name}
                    </p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-red-custom font-bold text-sm">
                        {item.quantity}x
                      </span>
                      <span className="text-rose-400 text-sm">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-rose-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-rose-100">
            <p className="text-rose-900 text-sm">Order Total</p>
            <p className="text-rose-900 text-2xl font-bold">
              ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>
        <button
          onClick={handleStartNewOrder}
          className="w-full bg-red-custom text-white font-bold py-4 rounded-full hover:bg-rose-900 transition-all"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
