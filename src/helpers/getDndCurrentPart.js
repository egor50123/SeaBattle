import {SQUARE_SIZE} from "../constant/constant"

export const getDndCurrentPart = (e, direction ) => {
  const defaultSize = SQUARE_SIZE
  // !!!!!!!!
  let shiftX = e.pageX - e.target.getBoundingClientRect().left
  let shiftY = e.clientY - e.target.getBoundingClientRect().top
  let currentPart = null;

  if ((shiftX <= defaultSize && direction === 1) || (shiftY <= defaultSize && direction === 0)) {
    currentPart = 1
  } else if ((shiftX > defaultSize && shiftX <= defaultSize*2 && direction === 1) || (shiftY > defaultSize && shiftY <= defaultSize*2 && direction === 0)) {
    currentPart = 2
  } else if ((shiftX > defaultSize*2 && shiftX <= defaultSize*3 && direction === 1) || (shiftY > defaultSize*2 && shiftY <= defaultSize*3 && direction === 0)) {
    currentPart = 3
  } else if ((shiftX <= defaultSize*4 && direction === 1) || (shiftY <= defaultSize*4 && direction === 0)) {
    currentPart = 4
  }
  return currentPart;
}