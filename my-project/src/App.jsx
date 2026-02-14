import React, { useState } from "react";
import products from "./data.json";
import ProductsCard from "./components/ProductsCard";
import Cart from "./components/Cart";
import OrderModal from "./components/OrderModal";
import { CartProvider } from "./Context/CartContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FCF8F5] py-20 px-6 md:px-16 lg:px-32 relative">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="lg:w-2/3">
              <h1 className="text-4xl font-bold text-stone-900 mb-10">
                Desserts
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {products.map((product, index) => (
                  <ProductsCard key={index} product={product} />
                ))}
              </div>
            </main>

            <aside className="lg:w-1/3">
              {/* Pass the onConfirm function to the Cart */}
              <Cart onConfirm={() => setIsModalOpen(true)} />
            </aside>
          </div>
        </div>

        {/* Modal will appear here when onConfirm is clicked */}
        {isModalOpen && (
          <OrderModal onNewOrder={() => window.location.reload()} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
