import React from "react";
import { useCart } from "../Context/CartContext";

export default function Cart(props) {
  const { cart, updateQuantity } = useCart();
  const orderTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-10">
      <h2 className="text-2xl font-bold text-red-custom mb-6">
        Your Cart ({totalItems})
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <img
            src="/src/assets/images/illustration-empty-cart.svg"
            alt="Empty Cart"
          />
          <p className="text-rose-500 font-semibold mt-6 text-sm">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col divide-y divide-rose-100">
            {cart.map((item) => (
              <div
                key={item.name}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-rose-900 text-sm">{item.name}</p>
                  <div className="flex gap-4 items-center">
                    <span className="text-red-custom font-bold text-sm">
                      {item.quantity}x
                    </span>
                    <span className="text-rose-400 text-sm">
                      @ ${item.price.toFixed(2)}
                    </span>
                    <span className="text-rose-500 font-bold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => updateQuantity(item.name, -item.quantity)}
                  className="w-5 h-5 border border-rose-300 rounded-full flex items-center justify-center hover:border-rose-900 transition-colors"
                >
                  <img
                    src="/src/assets/images/icon-remove-item.svg"
                    alt="remove"
                    className="w-2.5"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <p className="text-rose-900 text-sm font-medium">Order Total</p>
            <p className="text-rose-900 text-2xl font-bold">
              ${orderTotal.toFixed(2)}
            </p>
          </div>

          <button
            onClick={props.onConfirm}
            className="w-full bg-red-custom text-white font-bold py-4 rounded-full hover:bg-rose-900 transition-all"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
