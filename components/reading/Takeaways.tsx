import { useFetchTakeaways } from '@/hooks/useFetchTakeaways';

export function TakeAways() {
  const { data } = useFetchTakeaways()

  return (
    <span>
      {data}
    </span>
  );
}

export default TakeAways;