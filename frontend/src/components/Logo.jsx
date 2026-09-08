import React from 'react';

export default function Logo({ className = "w-6 h-6", rounded = "rounded-md" }) {
  return (
    <svg
      className={`${className} ${rounded} object-cover shrink-0`}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" fill="#FAF6F0" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="#E5E0D8" />
      {/* Elegant geometric monogram / technical compass / standard mark */}
      <path
        d="M14 12V28M14 20H26M26 12V28"
        stroke="#C85A32"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="3" fill="#C85A32" />
      <circle cx="20" cy="12" r="1.5" fill="#1F1E1D" />
      <circle cx="20" cy="28" r="1.5" fill="#1F1E1D" />
    </svg>
  );
}
