"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LocationInfo(props) {
  console.log(props);
  const winfo = props.info;
  const wiconInfo = winfo?.weather[0].icon;
  const wicon = `https://openweathermap.org/img/wn/${wiconInfo}@2x.png`;

  return (
    <>
      <div className="flex-none w-32 mb-10 relative z-10">
        <Image
          src={wicon}
          width={300}
          height={300}
          alt="天気画像"
          className="absolute z-10 inset-0 w-full object-contain rounded-lg drop-shadow-lg"
        />
      </div>
      <div className="flex-auto pl-6">
        <div className="relative flex flex-wrap items-baseline">
          <h2 className="relative w-full flex-none mb-2 text-2xl font-semibold text-slate-600">
            {winfo?.name}
            <span className="text-xl ml-3">{winfo?.sys.country}</span>
          </h2>
        </div>
        <div className="relative flex flex-wrap items-baseline">
          <h3 className="relative w-full flex-none mb-1 font-semibold flex items-center">
            <span className="text-5xl text-amber-500">
              {Math.round(winfo?.main.temp_max)}
              <span className="text-4xl">&#8451;</span>
            </span>
            <span className="text-4xl mx-3 text-slate-600">/</span>
            <span className="text-5xl text-sky-500">
              {Math.round(winfo?.main.temp_min)}
              <span className="text-4xl">&#8451;</span>
            </span>
          </h3>
        </div>
        <div className="relative flex flex-wrap items-baseline pb-3 text-slate-600">
          <h3 className="relative w-full flex-none mb-2 text-xl">
            <span>風速</span>
            <span className="ml-4 text-2xl">
              {Math.round(winfo?.wind.speed * 10) / 10}
            </span>
            <span>m</span>
          </h3>
        </div>
        <div className="flex space-x-2 mb-2 text-sm font-medium">
          <div className="flex space-x-4">
            <Link
              className="px-6 leading-[3] uppercase font-semibold tracking-wider border-2 border-slate-600 bg-blue-400 text-white rounded"
              href={`/city/${encodeURIComponent(winfo.name)}`}
            >
              DETAIL
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
