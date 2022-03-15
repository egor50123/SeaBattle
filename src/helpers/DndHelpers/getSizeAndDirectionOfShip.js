export const getSizeAndDirectionOfShip = (targetElement) => {
  let width = targetElement.getBoundingClientRect().width,
      height = targetElement.getBoundingClientRect().height,
      direction = width > height ? 1 : 0
  return {direction,height,width}
}