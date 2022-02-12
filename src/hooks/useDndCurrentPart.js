export const useDndCurrentPart = () => {
  return (e,direction) => {
    let shiftX = e.pageX - e.target.getBoundingClientRect().left
    let shiftY = e.clientY - e.target.getBoundingClientRect().top
    let currentPart = null;

    if ((shiftX <= 30 && direction === 1) || (shiftY <= 30 && direction === 0)) {
      currentPart = 1
    } else if ((shiftX > 30 && shiftX <= 60 && direction === 1) || (shiftY > 30 && shiftY <= 60 && direction === 0)) {
      currentPart = 2
    } else if ((shiftX > 60 && shiftX <= 90 && direction === 1) || (shiftY > 60 && shiftY <= 90 && direction === 0)) {
      currentPart = 3
    } else if ((shiftX <= 120 && direction === 1) || (shiftY <= 120 && direction === 0)) {
      currentPart = 4
    }
    return currentPart;
  }
}