"use client";
import React, { useState } from "react";

export default function LocationInfo(info) {
  console.log(info);
  return (
    <>
      <div className="flex p-6 font-mono">
        <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
          <img src="" alt="天気画像" className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
        </div>
        <div className="flex-auto pl-6">
          <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
            <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
            {info?.info?.name} - {info?.info?.sys.country}
            </h1>
          </div>
          <div className="flex space-x-2 mb-4 text-sm font-medium">
            <div className="flex space-x-4">
              <button className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black" type="submit">
                DETAIL
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
