import { MockAPI } from "@/lib/utils";

export default async function Summary() {
  const res = await MockAPI();
  return <>Summary{res}</>;
} 