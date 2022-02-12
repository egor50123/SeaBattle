import {clearField, setDeathSquares, setShipSquares} from "../redux/battleFieldReducer";
import {useShip} from "./useShip";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {useRandomSquare} from "./useRandomSquare";
import {getInitEmptySquares} from "../selectors/selectors";

export const useRandomPlacement = () => {
  const dispatch = useDispatch()
  const createShip = useShip()
  const createDeathZone = useDeathZone()
  const getRandomSquare = useRandomSquare()
  let emptySquares = useSelector(getInitEmptySquares,shallowEqual)

  return (fieldId = 1) => {
      let notEmptySquares = []
      let shipsSquares = [];
      let deathZone = [];

      for(let i=1; i<=10; i++) {
        let size
        let someSquare = getRandomSquare(emptySquares)
        let direction = Math.floor(Math.random() * 2);
        switch (i) {
          case 1:
            size = 4;
            break;
          case 2:case 3:
            size = 3;
            break;
          case 4: case 5: case 6:
            size = 2;
            break;
          case 7: case 8: case 9: case 10:
            size = 1;
            break;
          default: break;
        }

        //  0-вертикаль 1-горизонталь
        shipsSquares.push(createShip(someSquare,size,direction,emptySquares))
        deathZone.push(createDeathZone(shipsSquares[i-1],direction))

        notEmptySquares = [...notEmptySquares, ...deathZone[i-1],...shipsSquares[i-1]]
        // eslint-disable-next-line no-loop-func
        emptySquares = emptySquares.filter( num => !notEmptySquares.includes(num))
      }

      dispatch(clearField(fieldId));
      dispatch(setShipSquares(shipsSquares,fieldId));
      dispatch(setDeathSquares(deathZone,fieldId));
  }
}