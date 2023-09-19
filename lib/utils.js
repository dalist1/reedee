export const getGames = async () => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }
  const data = await res.json();
  return data.results;
};