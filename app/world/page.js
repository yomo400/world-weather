import WorldStatus from "../component/WorldStatus";
import TokyoButton from "../component/TokyoButton";
import axios from "axios";
import useSWR from "swr";


export default function Home() {
  //理想　WorldStatus←←page←←SWR←←api Route(コール,id隠される)
  //現段階　WorldStatus←←SWR(コール,idバレる)

  return (
    <>
      <WorldStatus />
    </>
  );
}
