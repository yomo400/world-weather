import Link from "next/link";
import Forecast from "../../component/Forecast";
// import { createContext } from "react";

export default function Page({ params }) {
  const cname = decodeURI(params.name);

  return (
    <div>
      <Forecast cname={cname} />
      <div className="m-1">
        <Link
          href="/world"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded"
        >
          WORLDへ戻る
        </Link>
      </div>
    </div>
  );
}
