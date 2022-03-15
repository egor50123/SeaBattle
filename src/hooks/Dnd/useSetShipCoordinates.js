import {useDispatch, useSelector} from "react-redux";
import {
  getShipData1, getShipData10,
  getShipData2, getShipData3, getShipData4, getShipData5,
  getShipData6, getShipData7, getShipData8, getShipData9
} from "../../selectors/selectors";
import {setShipCoordinates} from "../../redux/battleFieldReducer";

export const useSetShipCoordinates = (id) => {
  const shipData1 = useSelector(getShipData1),
        shipData2 = useSelector(getShipData2),
        shipData3 = useSelector(getShipData3),
        shipData4 = useSelector(getShipData4),
        shipData5 = useSelector(getShipData5),
        shipData6 = useSelector(getShipData6),
        shipData7 = useSelector(getShipData7),
        shipData8 = useSelector(getShipData8),
        shipData9 = useSelector(getShipData9),
        shipData10 = useSelector(getShipData10)

  const dispatch = useDispatch()

  function dispatchShipCoordinates() {
    switch (id) {
      case 1:if (shipData1.shipSquares) dispatch(setShipCoordinates(1, shipData1.shipSquares[0]));break;
      case 2: if (shipData2.shipSquares) dispatch(setShipCoordinates(2, shipData2.shipSquares[0])); break;
      case 3: if (shipData3.shipSquares) dispatch(setShipCoordinates(3, shipData3.shipSquares[0])); break;
      case 4: if (shipData4.shipSquares) dispatch(setShipCoordinates(4, shipData4.shipSquares[0])); break;
      case 5: if (shipData5.shipSquares) dispatch(setShipCoordinates(5, shipData5.shipSquares[0])); break;
      case 6: if (shipData6.shipSquares) dispatch(setShipCoordinates(6, shipData6.shipSquares[0])); break;
      case 7: if (shipData7.shipSquares) dispatch(setShipCoordinates(7, shipData7.shipSquares[0])); break;
      case 8: if (shipData8.shipSquares) dispatch(setShipCoordinates(8, shipData8.shipSquares[0])); break;
      case 9: if (shipData9.shipSquares) dispatch(setShipCoordinates(9, shipData9.shipSquares[0])); break;
      case 10: if (shipData10.shipSquares) dispatch(setShipCoordinates(10, shipData10.shipSquares[0])); break;
      default: break;
    }
  }

  function setShip() {
    let coordinates = null
    switch (id) {
      case 1: {
        if (!shipData1.x) return
        let direction = Math.abs(shipData1.shipSquares[0] - shipData1.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData1.x, shipData1.y,direction]
      } break;
      case 2: {
        if (!shipData2.x) return
        let direction = Math.abs(shipData2.shipSquares[0] - shipData2.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData2.x, shipData2.y,direction]
      }break;
      case 3: {
        if (!shipData3.x) return
        let direction = Math.abs(shipData3.shipSquares[0] - shipData3.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData3.x, shipData3.y,direction]
      }break;
      case 4: {
        if (!shipData4.x) return
        let direction = Math.abs(shipData4.shipSquares[0] - shipData4.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData4.x, shipData4.y,direction]
      }break;
      case 5: {
        if (!shipData5.x) return
        let direction = Math.abs(shipData5.shipSquares[0] - shipData5.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData5.x, shipData5.y,direction]
      }break;
      case 6: {
        if (!shipData6.x) return
        let direction = Math.abs(shipData6.shipSquares[0] - shipData6.shipSquares[1]) === 10 ? 0 : 1
        coordinates = [shipData6.x, shipData6.y,direction]
      }break;
      case 7: {
        if (!shipData7.x) return
        coordinates = [shipData7.x, shipData7.y]
      }break;
      case 8: {
        if (!shipData8.x) return
        coordinates = [shipData8.x, shipData8.y]
      }break;
      case 9: {
        if (!shipData9.x) return
        coordinates = [shipData9.x, shipData9.y]
      }break;
      case 10: {
        if (!shipData10.x) return
        coordinates = [shipData10.x, shipData10.y]
      }break;
      default:
        break;
    }
    return coordinates
  }

  return {dispatchShipCoordinates,setShip}
}