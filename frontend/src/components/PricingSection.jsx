import { Check, X } from "lucide-react";
import "./Testimonials.css";

export default function PricingCards() {
  return (
    <div className="w-full px-4 py-12 bg-black select-none">
      <h2 className="text-center my-6 text-white inset-0 flex items-center justify-center text-5xl md:text-7xl select-none"
        style={{ fontFamily: '"Dancing Script", cursive' }}>
        Pricing
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recruit Basic */}
        <div className="rounded-2xl border border-[#fff2] p-6 text-white hover:bg-[linear-gradient(to_bottom_right,#0f172a,#1e293b,#fff1)] transition-all duration-300 glass-card shadow-lg hover:shadow-2xl">

          <h3 className="text-xl font-semibold mb-2">Recruit Basic</h3>
          <p className="text-3xl font-bold">
            $17 <span className="text-base font-medium text-gray-400">/month</span>
          </p>
          <p className="text-gray-400 mb-4">$228 billed yearly</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Access to core HR features</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Employee record management</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Basic reporting tools</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Manage up to 10 team members</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Track employee attendance</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Assign and monitor tasks</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Email support</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Simple onboarding process</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Designed user-focused interface</li>
          </ul>
          <button className="mt-6 w-full rounded-xl bg-yellow-400 text-black py-2 font-semibold hover:bg-yellow-300 shadow-md cursor-pointer">
            Start 7-days Free Trial
          </button>
        </div>

        {/* Talent Pro (Highlighted) */}
        <div className="rounded-2xl border-2 border-yellow-400 p-6 bg-black text-white shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:bg-[linear-gradient(to_bottom_right,#000,#111,#facc1515)] transition-all duration-300 relative">
          <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
            Save 27%
          </span>
          <h3 className="text-xl font-semibold mb-2">Talent Pro</h3>
          <p className="text-3xl font-bold">
            $19 <span className="text-base font-medium text-gray-400">/month</span>
          </p>
          <p className="line-through text-gray-500">$26</p>
          <p className="text-gray-400 mb-4">$228 billed yearly</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Access to core HR features</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Employee record management</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Basic reporting tools</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Manage up to 10 team members</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Track employee attendance</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Assign and monitor tasks</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Email support</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Simple onboarding process</li>
            <li className="flex items-center"><X className="text-red-400 w-5 h-5 mr-2" /> Designed user-focused interface</li>
          </ul>
          <button className="mt-6 w-full rounded-xl bg-yellow-400 text-black py-2 font-semibold hover:bg-yellow-300 shadow-md cursor-pointer">
            Start 7-days Free Trial
          </button>
        </div>

        {/* HR Master */}
        <div className="rounded-2xl border border-[#fff2] p-6 bg-[#0f172a] text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:bg-[linear-gradient(to_bottom_right,#0f172a,#1e293b,#fff1)] transition-all duration-300 glass-card">
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Popular
          </span>
          <h3 className="text-xl font-semibold mb-2">HR Master</h3>
          <p className="text-3xl font-bold">$34 <span className="text-base font-medium text-gray-400">/month</span></p>
          <p className="text-gray-400 mb-4">$408 billed yearly</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Access to core HR features</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Employee record management</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Basic reporting tools</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Manage up to 10 team members</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Track employee attendance</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Assign and monitor tasks</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Email support</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Simple onboarding process</li>
            <li className="flex items-center"><Check className="text-green-400 w-5 h-5 mr-2" /> Designed user-focused interface</li>
          </ul>
          <button className="mt-6 w-full rounded-xl bg-yellow-400 text-black py-2 font-semibold hover:bg-yellow-300 shadow-md cursor-pointer">
            Start 7-days Free Trial
          </button>
        </div>

      </div>
    </div>
  );
}
