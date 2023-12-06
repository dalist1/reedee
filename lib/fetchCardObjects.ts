import { getCardObjects } from "./dbOperations";

export async function fetchCardObjects(category) {
  const data = await getCardObjects();
  if (category === "Liked") {
    return data.filter((cardObject) => cardObject.liked);
  }
  return data;
}