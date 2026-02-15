import React from "react";
import { useCart } from "../Context/CartContext";

// Direct imports for the icons in src/assets/images
import iconAddToCart from "../assets/images/icon-add-to-cart.svg";
import iconDecrement from "../assets/images/icon-decrement-quantity.svg";
import iconIncrement from "../assets/images/icon-increment-quantity.svg";

export default function ProductsCard({ product }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart?.find((item) => item.name === product.name);

  const fileName = product.image.desktop.split("/").pop();
  const finalImagePath = new URL(
    `../assets/images/${fileName}`,
    import.meta.url,
  ).href;

  return (
    <div className="flex flex-col w-full font-red-hat">
      <div className="relative mb-10 flex flex-col items-center">
        <img
          src={finalImagePath}
          alt={product.name}
          className={`rounded-xl w-full block border-2 transition-all duration-300 ${
            cartItem ? "border-red-custom" : "border-transparent"
          }`}
        />

        <div className="absolute -bottom-6 w-44 h-12 z-10">
          {!cartItem ? (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-2 w-full h-full bg-white border border-rose-400 rounded-full font-bold text-rose-900 hover:border-red-custom hover:text-red-custom transition-all shadow-md"
            >
              <img src={iconAddToCart} alt="" className="w-5 h-5 shrink-0" />
              <span className="text-sm font-bold whitespace-nowrap">
                Add to Cart
              </span>
            </button>
          ) : (
            <div className="flex items-center justify-between w-full h-full bg-red-custom text-white px-4 rounded-full shadow-lg">
              <button
                onClick={() => updateQuantity(product.name, -1)}
                className="flex items-center justify-center w-5 h-5 border border-white rounded-full hover:bg-white transition-all group/icon"
              >
                <img
                  src={iconDecrement}
                  alt="minus"
                  className="w-2.5 brightness-0 invert group-hover/icon:brightness-100 group-hover/icon:invert-0"
                />
              </button>
              <span className="font-bold text-sm">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(product.name, 1)}
                className="flex items-center justify-center w-5 h-5 border border-white rounded-full hover:bg-white transition-all group/icon"
              >
                <img
                  src={iconIncrement}
                  alt="plus"
                  className="w-2.5 brightness-0 invert group-hover/icon:brightness-100 group-hover/icon:invert-0"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col text-left">
        <p className="text-rose-400 text-xs font-semibold uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-bold text-rose-900 text-base leading-tight mt-1">
          {product.name}
        </h3>
        <p className="text-red-custom font-bold text-lg mt-1">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
