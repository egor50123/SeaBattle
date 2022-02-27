import ShipImg from "../components/Main/BattleField/ShipImg/ShipImg";
import {SQUARE_SIZE} from "../constant/constant"

export const useStaticShipsPlacement = () => {
  return (shipField) => {
    let images = []
    let shipFieldSort =  shipField.sort((a,b) => b.length - a.length)
    for (let i = 0; i < shipFieldSort.length ; i++) {
      let firstSquare = shipFieldSort[i][0]
      let row = Math.ceil(firstSquare/10),
          col = firstSquare % 10,
          y = (row-1) * SQUARE_SIZE,
          x = col !== 0 ?  (col-1) * SQUARE_SIZE : 9 * SQUARE_SIZE
      let direction = 1
      if (shipFieldSort[i].length > 1) {
        direction = Math.abs(shipFieldSort[i][0] - shipFieldSort[i][1]) === 10 ? 0 : 1
      }
      images.push(<ShipImg key={i} x={x} y={y} size={shipFieldSort[i].length} direction={direction}/>)
    }
    return images
  }
}