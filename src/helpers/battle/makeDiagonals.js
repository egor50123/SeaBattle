export const makeDiagonals = () => {
  const mainDiagonals = []
  const otherDiagonals = []
  for (let i = 0; i < 10; i++) {
    if (i < 2) {
      otherDiagonals.push(11 - 9 * i);
      otherDiagonals.push(99 - 9 * i);
    }
    if (i < 4) {
      mainDiagonals.push(31 - 9 * i);
      mainDiagonals.push(97 - 9 * i)
    }
    if (i < 6) {
      otherDiagonals.push(51 - 9 * i)
      otherDiagonals.push(95 - 9 * i)
    }
    if (i < 8) {
      mainDiagonals.push(71 - 9 * i)
      mainDiagonals.push(93 - 9 * i)
    }
    if (i < 10) {
      otherDiagonals.push(91 - 9 * i)
    }
  }
  return {mainDiagonals, otherDiagonals}
}