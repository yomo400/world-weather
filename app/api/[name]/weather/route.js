import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const city = params.name;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=81265787ad6274ec35fd3d76001294e9&q=${city}&units=metric&lang=ja`;
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
