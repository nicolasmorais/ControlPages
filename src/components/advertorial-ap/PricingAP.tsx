"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap } from "lucide-react";

interface PricingAPProps {
  prePriceText: string;
  price: string;
  paymentType: string;
  buttonText: string;
  buttonUrl: string;
  postButtonText: string;
}

export const PricingAP = ({ prePriceText, price, paymentType, buttonText, buttonUrl, postButtonText }: PricingAPProps) => {
  return (
    <section className="my-12 text-center space-y-8">
      <div className="max-w-3xl mx-auto bg-white border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
        <p className="text-xl font-semibold uppercase tracking-wider text-gray-700">
          {prePriceText}
        </p>
        <div className="flex items-baseline justify-center gap-4">
          <p className="text-8xl font-extrabold text-green-600">{price}</p>
        </div>
        <p className="text-lg font-semibold text-gray-600">
          {paymentType}
        </p>

        <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="w-full h-20 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg"
          >
            <Zap className="mr-4 h-8 w-8" />
            {buttonText}
          </Button>
        </a>

        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          {postButtonText}
        </p>
      </div>
    </section>
  );
};