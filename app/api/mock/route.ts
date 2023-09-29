import { NextResponse } from "next/server";

export async function GET() {
  let JsonResponse = {
    msg: "hello there",
  };

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json(JsonResponse);
}
