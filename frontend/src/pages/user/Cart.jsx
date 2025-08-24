import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      title: "Custom AI Chatbot",
      desc: "Conversational assistant for your business.",
      price: 120,
      quantity: 1,
    },
    {
      id: 2,
      title: "RAG System Setup",
      desc: "Retrieval Augmented Generation pipeline.",
      price: 200,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const discount = 20;
  const tax = 10;
  const estimatedTotal = subtotal + shipping - discount + tax;

  return (
    <div className="bg-black">
      <Header />
      <section className="w-full min-h-screen bg-black text-gray-200 py-10 px-6">
        <h2 className="mt-13 text-2xl font-bold mb-6 flex items-center gap-2">
          🛒 My Service Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Side (Services) */}
          <Card className="lg:col-span-3 bg-neutral-900 border border-neutral-700 shadow-lg">
            <CardContent className="p-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b border-neutral-700 pb-4 mb-4"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <button className="flex items-center gap-1 text-red-400 hover:underline">
                        <Trash2 size={16} /> Remove
                      </button>
                      <button className="flex items-center gap-1 text-blue-400 hover:underline">
                        <Heart size={16} /> Wishlist
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-400">${item.price}</p>
                    <select
                      defaultValue={item.quantity}
                      className="bg-neutral-800 border border-neutral-600 text-sm rounded px-2 py-1 mt-2"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-yellow-300 font-bold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <p className="mt-4 text-white font-semibold">
                {cartItems.length} Services — ${subtotal}
              </p>
            </CardContent>
          </Card>

          {/* Right Side (Summary) */}
          <Card className="bg-neutral-900 border border-neutral-700 shadow-lg">
            <CardContent className="p-6">
              <label className="text-sm text-white font-medium">ENTER PROMO CODE</label>
              <div className="flex gap-2 mt-2 mb-4">
                <Input
                  placeholder="Promo Code"
                  className="bg-neutral-800 border-neutral-600"
                />
                <Button className="bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-4 py-2 text-white rounded-lg transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                  Apply
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white ">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-white ">
                  <span>Shipping cost</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between text-white ">
                  <span>Discount</span>
                  <span>- ${discount}</span>
                </div>
                <div className="flex justify-between text-white ">
                  <span>Tax</span>
                  <span>${tax}</span>
                </div>
                <hr className="border-neutral-700 my-2" />
                <div className="flex justify-between font-bold text-yellow-400">
                  <span>Estimated Total</span>
                  <span>${estimatedTotal}</span>
                </div>
              </div>

              <p className="mt-3 text-yellow-400 text-sm">
                ✅ Free shipping on orders over $300!
              </p>

              <Button className="w-full bg-[linear-gradient(to_right,#fff2,transparent)] border-[1px] border-[#000] hover:bg-[#fff2] px-6 py-2 text-white rounded-lg transition shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] mt-4 font-semibold">
                Place Order
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
