export const timingFunc = (timeFraction) => {
  //return 1 - Math.sin(Math.acos(timeFraction));
  return {
    bounce: ([timeFraction]) => {
      for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    },
    circ: ([timeFraction]) => {
      return 1 - Math.sin(Math.acos(timeFraction));
    },
    back: ([timeFraction,x]) => {
      return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
    },
    quad: ([timeFraction]) => {
      return Math.pow(timeFraction, 2)
    },
    sqrt: ([timeFraction,x]) => {
      return Math.sin(3*timeFraction)
    }
  }

}