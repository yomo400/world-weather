import Link from "next/link";
import Forecast from "../../component/Forecast";
// import { createContext } from "react";

export default function Page({ params }) {
  const cname = decodeURI(params.name);

  return (
    <>
      <Link href="/world">WORLD</Link>
      <Forecast cname={cname} />
    </>
  );
}
