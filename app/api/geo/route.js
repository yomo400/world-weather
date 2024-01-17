import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { searchParams }) {
  try {
    console.log(searchParams);
    const url = `http://api.openweathermap.org/geo/1.0/reverse?appid=81265787ad6274ec35fd3d76001294e9&lat=${lat}&lon=${lng}`;
    const response = await axios.get(url);
    // console.log(response.data);
    const res = response.data;
    return NextResponse.json({ res });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
