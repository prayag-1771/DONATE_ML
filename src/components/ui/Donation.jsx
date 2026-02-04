"use client";

import React from "react";
import { ngos } from "./data.js";
import SimpleCard from "./ItemCard.jsx";

export default function Donation() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo, index) => (
          <SimpleCard key={index} name={ngo.name} desc={ngo.description} />
        ))}
      </div>
    </div>
  );
}
