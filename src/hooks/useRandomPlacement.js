import {clearField, iSRandom, setDeathSquares, setShipSquares} from "../redux/battleFieldReducer";
import {useShip} from "./useShip";
import {useDispatch} from "react-redux";
import {useDeathZone} from "./useDeathZone";
import {useRandomSquare} from "./useRandomSquare";

export const useRandomPlacement = (squares) => {
  const dispatch = useDispatch()
  const createShip = useShip()
  const createDeathZone = useDeathZone()
  const getRandomSquare = useRandomSquare()

  return () => {
      console.clear()

      let emptySquares =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
      let notEmptySquares = []

      let shipsSquares = [];
      let deathZone = [];

      for(let i=1; i<=10; i++) {
        let size
        let someSquare = getRandomSquare(emptySquares)
        let direction = Math.floor(Math.random() * 2);
        //let direction = 1
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

      dispatch(clearField());
      dispatch(setShipSquares(shipsSquares));
      dispatch(setDeathSquares(deathZone));
      dispatch( iSRandom())
  }
}