'use client';

import { PlusCircle } from 'lucide-react';
// import { Button } from './ui/button'; // Uncomment if using a custom Button

export function EmptyStationsState() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4 inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Stations Found
        </h3>
        <p className="text-gray-500 mb-6">
          You haven't added any fuel stations yet. Get started by creating your first station.
        </p>

        {/* Uncomment if using a Button component */}
        {/* <Button onClick={onCreate} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add First Station
        </Button> */}
      </div>
    </div>
  );
}
