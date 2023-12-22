"use client";
import Image from "next/image";
import Link from "next/link";

export default function LocationInfo(props) {
  const winfo = props.info;
  const wiconInfo = winfo?.weather[0].icon;
  const wicon = `https://openweathermap.org/img/wn/${wiconInfo}@2x.png`;

  return (
    <>
      <div className="w-full items-baseline pl-3">
        <h2 className="w-full mb-2 text-2xl font-semibold text-teal-800">
          {winfo?.name}
          <span className="text-lg ml-3 text-teal-500">
            {winfo?.sys.country}
          </span>
        </h2>
      </div>
      <div className="flex-none w-1/2 mb-10 relative z-10 max-w-[10rem]">
        <Image
          src={wicon}
          width={300}
          height={300}
          alt="天気画像"
          className="absolute z-10 inset-0 w-full object-contain rounded-lg drop-shadow-lg"
        />
      </div>
      <div className="flex-auto w-1/2">
        <div className="relative flex flex-wrap items-baseline">
          <h3 className="relative w-full mb-1 font-semibold flex sm:items-center items-center flex-row">
            <span className="text-5xl text-amber-500">
              {Math.round(winfo?.main.temp_max)}
              <span className="text-4xl">&#8451;</span>
            </span>
            <span className="text-4xl mx-2 text-slate-600">/</span>
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
              href={`/city/${encodeURIComponent(winfo?.name)}`}
            >
              DETAIL
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
