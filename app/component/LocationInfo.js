"use client";
import Image from "next/image";
import Link from "next/link";

export default function LocationInfo(props) {
  // weather information
  const winfo = props.info;
  const wiconInfo = winfo?.weather[0].icon;
  const wicon = `https://openweathermap.org/img/wn/${wiconInfo}@2x.png`;

  // latLng information
  const latLng = props.latLng;
  const lat = Math.round(latLng.lat * 10) / 10;
  const lng = Math.round(latLng.lng * 10) / 10;

  // country code
  const regionNames = new Intl.DisplayNames(["ja"], { type: "region" });
  const ccode = winfo?.sys.country;
  let country;
  ccode
    ? (country = regionNames.of(ccode))
    : (country = (
        <div className="text-teal-800">都市が見つかりませんでした</div>
      ));

  // temperature
  const temp = Math.round(winfo?.main.temp_max * 10) / 10;

  return (
    <>
      <div className="w-full items-baseline pl-3 flex justify-between">
        <h2 className="mb-2 text-2xl font-semibold text-teal-800 flex flex-wrap items-baseline gap-x-4">
          {winfo?.name}
          <span className="text-base text-teal-500 font-normal">{country}</span>
        </h2>
        <div className="text-base text-teal-800 pl-3 self-start">
          {lat}&deg;<span className="mr-1">/</span>
          {lng}&deg;
        </div>
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
        <div className="w-36">
          <h3
            className={`relative w-full font-semibold flex items-center flex-row
            ${temp < 15 ? "text-sky-500" : "text-amber-500"}
          `}
          >
            <span className="text-5xl mr-1">{temp}</span>
            <span className="text-3xl sm:text-4xl">&#8451;</span>
          </h3>
          <div className="mb-6 text-teal-500">
            <h3 className="text-base font-normal">
              <span>風速</span>
              <span className="ml-4 text-xl text-teal-500">
                {Math.round(winfo?.wind.speed * 10) / 10}
              </span>
              <span>&nbsp;m</span>
            </h3>
          </div>
          <Link
            className={`"
              ${winfo.name ? "bg-teal-500" : "pointer-events-none bg-gray-300"}
              block  hover:bg-teal-800 text-white font-bold py-2 px-4 rounded text-center w-24
            "`}
            href={`/city/${encodeURIComponent(winfo?.name)}`}
          >
            DETAIL
          </Link>
        </div>
      </div>
    </>
  );
}
