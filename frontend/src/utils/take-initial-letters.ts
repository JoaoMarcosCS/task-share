export const takeInitialLetters = (fullName: string) => {
  return fullName
    .split(" ")
    .filter((word) => word.length > 0)
    .slice(0, 2)
    .map((word) => word.at(0)?.toUpperCase())
    .join("");
};
