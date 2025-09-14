import React from "react";
import { Truck, Leaf, Tag, Users } from "lucide-react";

const BottomBanner = () => {
  return (
    <section className="mt-24 bg-gradient-to-r from-green-50 via-white to-green-50 py-12 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="relative flex justify-center">
          {/* Desktop Image */}
          <img
            src="/src/assets/bottom_banner_landscape_1.jpg"
            alt="Eco Grocery Basket Desktop"
            className="hidden md:block rounded-lg object-cover w-full h-[400px] md:h-[500px]"
          />

          {/* Mobile Image */}
          <img
            src="/src/assets/bottom_banner_portrait.jpg" // Replace with your mobile image
            alt="Eco Grocery Basket Mobile"
            className="block md:hidden rounded-lg object-cover w-full h-[300px]"
          />

          {/* Tagline Box */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-green-700">
            <Truck className="w-4 h-4 text-green-600" />
            <span>Fast Delivery in 30 min</span>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
            Why We Are the Best?
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-semibold text-lg">Fastest Delivery</p>
                <p className="text-sm text-gray-600">
                  Groceries delivered in under 30 minutes.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-semibold text-lg">Freshness Guaranteed</p>
                <p className="text-sm text-gray-600">
                  Fresh produce straight from the source.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-semibold text-lg">Affordable Prices</p>
                <p className="text-sm text-gray-600">
                  Quality groceries at unbeatable prices.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-semibold text-lg">Trusted by Thousands</p>
                <p className="text-sm text-gray-600">
                  Loved by 10,000+ happy customers.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
