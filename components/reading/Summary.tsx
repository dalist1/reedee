import { useFetchSummary } from "@/hooks/useFetchSummary"


export default async function Summary() {
  const { data } = useFetchSummary()

  return (
    <span>
      {data}
    </span>
  )
} 