export const useDndCurrentPart = () => {
  return (e) => {
    let shiftX = e.pageX - e.target.getBoundingClientRect().left
    let currentPart = null;

    if ( shiftX <= 30 ) {
      currentPart = 1
    } else if(shiftX > 30 && shiftX <= 60) {
      currentPart = 2
    } else if ( shiftX > 60 && shiftX <= 90 ) {
      currentPart = 3
    } else if ( shiftX <= 120 ) {
      currentPart = 4
    }

    return currentPart;
  }
}