"use client";

interface GuaranteeAPProps {
  guaranteeText: string;
}

export const GuaranteeAP = ({ guaranteeText }: GuaranteeAPProps) => {
  if (!guaranteeText) {
    return null;
  }

  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
      <p className="text-lg leading-relaxed">{guaranteeText}</p>
    </div>
  );
};