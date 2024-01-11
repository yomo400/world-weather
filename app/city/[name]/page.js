import Forecast from "../../component/Forecast";

export default function Page({ params }) {
  const cname = decodeURI(params.name);

  return <Forecast cname={cname} />;
}
