import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useVerifyUserMutation } from "@/apis/authApi";
import { toast } from "sonner";


const UserProfile = ({ messages }) => {
  const [verifyUser, { isLoading: verifyIsLoading }] = useVerifyUserMutation();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No user logged in.
      </div>
    );
  }

  // Dummy orders & messages if user has none
  const orders = user.orders && user.orders.length > 0 ? user.orders : [
    {
      items: ["Book - React Basics", "Headphones"],
      status: "Delivered",
    },
    {
      items: ["Laptop Stand", "USB-C Cable"],
      status: "Processing",
    },
  ];

  return (
    <div className="bg-black">
      <Header />
      <main className="min-h-screen py-24 text-white p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-700 pb-6">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-600 object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-gray-400">{user.email}</p>
            <p
              className={`mt-2 inline-block px-3 py-1 text-sm rounded-full ${user.isVerified ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {user.isVerified ? "Verified" : "Not Verified"}
            </p>
            {!user.isVerified && (
              <Button
                className="glass-card mt-3 px-4 py-2 rounded-xl cursor-pointer"
                onClick={async () => {
                  try {
                    const res = await verifyUser();
                    if (res.data.message === "Verification email sent successfully") {   // <-- use res.status
                      toast.success(res.data.message);
                    } else {
                      toast.error(res.data?.message || "Failed to send verification email");
                    }
                  } catch (err) {
                    toast.error("Something went wrong");
                  }
                }}
              >
                Verify Now
              </Button>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">My Orders</h2>
          <div className="flex flex-col gap-4">
            {orders.map((order, index) => (
              <div key={index} className="glass-card p-4 rounded-xl">
                <h3 className="font-semibold">Order #{index + 1}</h3>
                <ul className="list-disc list-inside text-gray-300 mt-2">
                  {order.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="mt-2 text-sm">
                  Status: <span className="font-semibold">{order.status}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">My Messages</h2>
          <div className="flex flex-col gap-4">
            {(messages && messages.length > 0 ? messages : []).map((msg, index) => (
              <div key={index} className="glass-card p-4 rounded-xl">
                <h3 className="font-semibold">{msg.subject}</h3>
                <p className="text-gray-300 mt-2">{msg.message}</p>
              </div>
            ))}

            {/* Empty State */}
            {(!messages || messages.length === 0) && (
              <p className="text-gray-400">No messages yet.</p>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default UserProfile;
