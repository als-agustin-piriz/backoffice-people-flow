import React from 'react';

export function BackButton({ handleBack }: { handleBack: () => void }) {
  return (
    <button
      onClick={handleBack}
      className="mr-4 text-gray-600 hover:text-gray-800"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
    </button>
  );
}