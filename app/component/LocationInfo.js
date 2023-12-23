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
      <div className="flex justify-evenly">
        <div className="flex-initial w-32">
          <Image
            src={wicon}
            width={300}
            height={300}
            alt="天気画像"
            className="z-10 inset-0 w-full object-contain rounded-lg drop-shadow-lg"
          />
        </div>
        <div className="w-44 ">
          <h3 className="relative w-full mb-2 font-semibold flex sm:items-center items-center flex-row">
            <span className="text-4xl sm:text-5xl text-amber-500">
              {Math.round(winfo?.main.temp_max)}
              <span className="text-2xl sm:text-4xl">&#8451;</span>
            </span>
            <span className="text-2xl sm:text-4xl mx-2 text-teal-800">/</span>
            <span className="text-4xl sm:text-5xl text-sky-500">
              {Math.round(winfo?.main.temp_min)}
              <span className="text-2xl sm:text-4xl">&#8451;</span>
            </span>
          </h3>
          <div className="mb-6 text-teal-500">
            <h3 className="text-lg font-normal">
              <span>風速</span>
              <span className="ml-4 text-2xl text-teal-500">
                {Math.round(winfo?.wind.speed * 10) / 10}
                <span>m</span>
              </span>
            </h3>
          </div>
          <Link
            className="block bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded text-center w-24"
            href={`/city/${encodeURIComponent(winfo?.name)}`}
          >
            DETAIL
          </Link>
        </div>
      </div>
    </>
  );
}
