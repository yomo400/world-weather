// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ name: "John Doe" });
}
