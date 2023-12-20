"use client";
import axios from "axios";
import useSWR from "swr";
import TimeSet from "./TimeSet";
import WeatherForecast from "./WeatherForecast";

export default function Forecast(props) {
  const cname = props.cname;

  // fetch
  const fetcher = (url) => axios.get(url).catch((res) => res.json());
  const {
    data: forecast,
    error,
    isLoading,
  } = useSWR(`/api/${cname}/forecast`, fetcher);
  console.log(forecast);
  const finfo = forecast?.data.res;

  // 時刻(TimeSet.jsで変換)
  const now = Date.now();
  const unixTime = forecast && [
    now / 1000,
    finfo?.list[0].dt,
    finfo?.list[8].dt,
    finfo?.list[16].dt,
    finfo?.list[24].dt,
    finfo?.list[32].dt,
    finfo?.city.timezone,
  ];
  const localTime = TimeSet(unixTime);

  // 国コード
  const ccode = finfo?.city.country;
  const changeCode = (e) => {
    if (e) {
      let countryName;
      e === "JP"
        ? (countryName = "日本")
        : e === "GB"
        ? (countryName = "イギリス")
        : e === "US"
        ? (countryName = "アメリカ")
        : e === "RU"
        ? (countryName = "ロシア")
        : e === "AU"
        ? (countryName = "オーストラリア")
        : (countryName = "エラーが発生しています");
      return countryName;
    }
  };

  // 予報抽出
  const wfinfo = finfo?.list;
  const flist = [];
  if (wfinfo) {
    for (let index = 0; index < wfinfo.length; ) {
      flist.push(wfinfo[index]);
      index = index + 8;
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent my-20"></div>
      ) : (
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
              <header className="z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-700 md:rounded-2xl rounded-b-2xl sticky top-0">
                <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                  <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                    <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                      <div className="relative flex items-center w-full h-full lg:w-64 group">
                        {finfo?.city.name}
                      </div>
                    </div>
                    <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                      {changeCode(ccode)}
                    </div>
                  </div>
                </div>
              </header>
              <div className="flex flex-col flex-wrap sm:flex-row mt-4">
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mx-2 mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className="ml-2 font-bold text-black text-md dark:text-white">
                              現地時刻
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-white">
                              {forecast && localTime[0].time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mx-2 mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="flex flex-col">
                            <span className="ml-2 font-bold text-black text-md dark:text-white">
                              地図
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-white"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mx-2 mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <p className="p-4 font-bold text-black text-md dark:text-white">
                        My Tasks
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
                          (05)
                        </span>
                      </p>
                      <ul>
                        <li className="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4"> 緯度 </span>
                            <span>
                              {Math.round(finfo?.city.coord.lat * 10) / 10}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 text-gray-600 border-gray-100 dark:text-gray-200 dark:border-gray-800">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4"> 経度 </span>
                            <span>
                              {Math.round(finfo?.city.coord.lon * 10) / 10}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="mx-2 mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                      <p className="p-4 font-bold text-black text-md dark:text-white">
                        My Tasks
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
                          (05)
                        </span>
                      </p>
                      <ul className="flex flex-col sm:flex-row">
                        {flist.map((list, index) => (
                          <WeatherForecast
                            key={index}
                            flist={flist[index]}
                            localTime={localTime && localTime[index + 1]}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <p>※時間はすべて現地時間です。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
