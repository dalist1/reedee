import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  let JsonResponse = {
    msg: `
    • Square introduces new features for holiday business boost.
    `,
  };

  return NextResponse.json(JsonResponse);
}
