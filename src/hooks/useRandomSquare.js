export const useRandomSquare = () => {
  return (array)=> array[Math.floor(Math.random() * array.length)];
}