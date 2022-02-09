export const useDeathZone = (dnd = false) => {
  return (
      // напрвление нужно определять здесь
    function createDeathZone (ship,directionInit = null)  {
      function filterDefaultBorderValues (border,side) {
        return border.filter(item => !side.includes(item) && item<=100 && item > 0)
      }
      let direction = directionInit
      ship.sort((a,b) => a-b)
      if ( direction === null) {
        direction = Math.abs(ship[0] - ship[1]) === 1 ? 1 : 0
      }

      let borderBottomV = [ship[ship.length-1]+11,ship[ship.length-1]+10,ship[ship.length-1]+9],
          borderTopV = [ship[0]-11,ship[0]-10,ship[0]-9],
          borderRightH = [ship[ship.length-1]+1,ship[ship.length-1]+11,ship[ship.length-1]-9],
          borderLeftH = [ship[0]-1,ship[0]-11,ship[0]+9];

      const borderVerticalR = [10,20,30,40,50,60,70,80,90,100],
          borderVerticalL = [1,11,21,31,41,51,61,71,81,91],
          borderHorizontalB = [91,92,93,94,95,96,97,98,99,100],
          borderHorizontalT = [1,2,3,4,5,6,7,8,9,10],
          deathZone = [];

      if ( direction === 0) {
        if( borderVerticalR.includes(ship[0])) {
          borderBottomV = filterDefaultBorderValues(borderBottomV,borderVerticalL)
          borderTopV = filterDefaultBorderValues(borderTopV,borderVerticalL)
        } else if ( borderVerticalL.includes(ship[0])) {
          borderBottomV = filterDefaultBorderValues(borderBottomV,borderVerticalR)
          borderTopV = filterDefaultBorderValues(borderTopV,borderVerticalR)
        }
      }

      if ( direction === 1) {
        if(borderVerticalR.includes(ship[ship.length-1])) {
          borderRightH = [];
        } else if (borderVerticalL.includes(ship[0]) ) {
          borderLeftH = [];
        }
      }

      if (borderHorizontalB.includes(ship[ship.length - 1]) || borderHorizontalT.includes(ship[0])) {
        if (direction === 1 ) {
          borderRightH = borderRightH.filter(item => item<=100 && item>0)
          borderLeftH = borderLeftH.filter(item => item<=100 && item>0)
        } else if (direction === 0) {
          borderBottomV = borderBottomV.filter(item => item<=100 && item>0)
          borderTopV = borderTopV.filter(item => item<=100 && item>0)
        }
      }

      // создание мертвой зоны вертикального корабля
      if ( direction === 0 ) {
        for(let i = 0; i < ship.length; i++) {
          if ( !borderVerticalR.includes(ship[i])) deathZone.push(ship[i] + 1)
          if ( !borderVerticalL.includes(ship[i])) deathZone.push(ship[i] - 1)
        }
        deathZone.push(...borderBottomV,...borderTopV)
      }
      //создание мертвой зоны горизонтального корабля
      else if ( direction === 1 ) {
        for(let i = 0; i < ship.length; i++) {
          ship[i] + 10 <= 100 && deathZone.push(ship[i] + 10)
          ship[i] - 10 > 0 && deathZone.push(ship[i] - 10)
        }
        deathZone.push(...borderRightH,...borderLeftH)
      }
      return deathZone
    }
)
}