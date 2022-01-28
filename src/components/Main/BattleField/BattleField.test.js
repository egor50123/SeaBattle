// // const makeDeathZone = require('./BattleField');
//
// function makeDeathZone(ship,direction) {
//   function filterDefaultBorderValues (border,side) {
//     return border.filter(item => item !== side.find(num => num === item) && item<=100 && item > 0)
//   }
//   let lastMinV = [ship[ship.length-1]-10,ship[ship.length-1]-11,ship[ship.length-1]-9],
//       lastMaxV = [ship[ship.length-1]+10,ship[ship.length-1]+11,ship[ship.length-1]+9],
//       startMaxV = [ship[0]+10,ship[0]+11,ship[0]+9],
//       startMinV = [ship[0]-10,ship[0]-11,ship[0]-9],
//       lastMinH = [ship[ship.length-1]-1,ship[ship.length-1]-11,ship[ship.length-1]+9],
//       lastMaxH = [ship[ship.length-1]+1,ship[ship.length-1]+11,ship[ship.length-1]-9],
//       startMaxH = [ship[0]+1,ship[0]+11,ship[0]-9],
//       startMinH = [ship[0]-1,ship[0]-11,ship[0]+9];
//   let borderVerticalR = [],
//       borderVerticalL = [],
//       deathZone = [];
//
//   const minMax = ship[ship.length-1] > ship[0]
//
//   for (let i = 1; i<=10; i++) {
//     borderVerticalR.push(10*i)
//     borderVerticalL.push(1+(10*(i-1)))
//   }
//
//   if( borderVerticalR.includes(ship[0])) {
//     if (minMax) {
//       lastMaxV = filterDefaultBorderValues(lastMaxV,borderVerticalL)
//       startMinV = filterDefaultBorderValues(startMinV,borderVerticalL)
//       lastMaxH = filterDefaultBorderValues(lastMaxH,borderVerticalL)
//       startMinH = filterDefaultBorderValues(startMinH,borderVerticalL)
//
//     } else {
//       lastMinV = filterDefaultBorderValues(lastMinV,borderVerticalL)
//       startMaxV = filterDefaultBorderValues(startMaxV,borderVerticalL)
//       lastMinH = filterDefaultBorderValues(lastMinH,borderVerticalL)
//       startMaxH = filterDefaultBorderValues(startMaxH,borderVerticalL)
//     }
//
//   } else if (borderVerticalL.includes(ship[0])) {
//     if (minMax) {
//       lastMaxV = filterDefaultBorderValues(lastMaxV,borderVerticalR)
//       startMinV = filterDefaultBorderValues(startMinV,borderVerticalR)
//       lastMaxH = filterDefaultBorderValues(lastMaxH,borderVerticalR)
//       startMinH = filterDefaultBorderValues(startMinH,borderVerticalR)
//     } else {
//       lastMinV = filterDefaultBorderValues(lastMinV,borderVerticalR)
//       startMaxV = filterDefaultBorderValues(startMaxV,borderVerticalR)
//       lastMinH = filterDefaultBorderValues(lastMinH,borderVerticalR)
//       startMaxH = filterDefaultBorderValues(startMaxH,borderVerticalR)
//     }
//   }
//
//   if ( direction === 0 ) {
//     for(let i = 0; i < ship.length; i++) {
//       if ( !borderVerticalR.includes(ship[i]) ) {
//         deathZone.push(ship[i] + 1)
//       }
//       if( !borderVerticalL.includes(ship[i])) {
//         deathZone.push(ship[i] - 1)
//       }
//     }
//     //Ищем клетки на котрые нельзя ставить корабль
//     ship[ship.length-1] < ship[0] ?
//         deathZone.push(...lastMinV,...startMaxV) :
//         deathZone.push(...lastMaxV,...startMinV)
//
//   } else if ( direction === 1 ) {
//     for(let i = 0; i < ship.length; i++) {
//       ship[i] + 10 <= 100 && deathZone.push(ship[i] + 10)
//       ship[i] - 10 > 0 && deathZone.push(ship[i] - 10)
//     }
//     //Ищем клетки на котрые нельзя ставить корабль
//     ship[ship.length-1] < ship[0] ?
//         deathZone.push(...lastMinH,...startMaxH) :
//         deathZone.push(...lastMaxH,...startMinH)
//   }
//   console.log("death  " + deathZone)
//   return deathZone
// }
//
// test('[100,90,80,70]', () => {
//   expect(makeDeathZone([100,90,80,70],0)).toEqual(expect.arrayContaining([99,89,79,69,59,60]));
//   expect(makeDeathZone([91,81,71,61],0)).toEqual(expect.arrayContaining([92,82,72,62,51,52]));
//   expect(makeDeathZone([31,21,11,1],0)).toEqual(expect.arrayContaining([41,42,32,22,12,2]));
//   expect(makeDeathZone([79,69,59,49],0)).toEqual(expect.arrayContaining([80,78,70,68,60,58,50,48,88,89,90,38,39,40]));
//   expect(makeDeathZone([11,21,31,41],0)).toEqual(expect.arrayContaining([2,1,12,22,32,42,52,51]));
//   expect(makeDeathZone([29,39,49,59],0)).toEqual(expect.arrayContaining([18,19,20,28,38,48,58,68,69,70,60,50,40,30]));
//   expect(makeDeathZone([91,92,93,94],1)).toEqual(expect.arrayContaining([81,82,83,84,85,95]));
//   expect(makeDeathZone([100,99,98,97],1)).toEqual(expect.arrayContaining([90,89,88,87,86,96]));
//   expect(makeDeathZone([100,99,98,97],1)).toEqual(expect.arrayContaining([90,89,88,87,86,96]));
//   expect(makeDeathZone([11,12,13,14],1)).toEqual(expect.arrayContaining([1,2,3,4,5,15,25,24,23,22,21]));
//   expect(makeDeathZone([33,34,35,36],1)).toEqual(expect.arrayContaining([22,23,24,25,26,27,37,47,46,45,44,43,42,32]));
//   expect(makeDeathZone([3,4,5,6],1)).toEqual(expect.arrayContaining([2,12,13,14,15,16,17,7]));
//   expect(makeDeathZone([7,8,9,10],1)).toEqual(expect.arrayContaining([6,16,17,18,19,20]));
// });
//
//
//
//
//
//
