import WorldWeather from "../component/WorldWeather";

export default function Home() {
  //理想　WorldStatus←←page←←SWR←←api Route(コール,id隠される)
  //現段階　WorldStatus←←SWR(コール,idバレる)

  return <WorldWeather />;
}
