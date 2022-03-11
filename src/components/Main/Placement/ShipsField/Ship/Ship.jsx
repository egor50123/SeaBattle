import React, {useEffect, useLayoutEffect, useRef} from "react";

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "../../../../../hooks/useDeathZone";
import {useShip} from "../../../../../hooks/useShip";
import {useRotateShip} from "../../../../../hooks/useRotateShip";
import {
  getDndData, getFirstShipsField, getInitEmptySquares,
  getIsPossibleToPlacement, getNotEmptySquares, getStatusInitCoordinates
} from "../../../../../selectors/selectors";
import {getSizeAndDirectionOfShip} from "../../../../../helpers/getSizeAndDirectionOfShip";
import {getDndCurrentPart} from "../../../../../helpers/getDndCurrentPart";
import {
  clearDndSettings, deleteDeathZone, deleteShipFromField, savePrevShipPlacement,
  setDeathSquares, setDndSettings, setPlacementShipCoordinates, setShipSquares
} from "../../../../../redux/battleFieldReducer";
import {useSetShipCoordinates} from "../../../../../hooks/useSetShipCoordinates";

const Ship = React.memo((props) => {
  const {id, key, size, setSrc } = {...props}
  const ref = useRef(null),
        dispatch = useDispatch(),
        createDeathZone = useDeathZone(),
        createStrictShip = useShip(true),
        tryToRotateShip = useRotateShip(),
        {dispatchShipCoordinates,setShip} = useSetShipCoordinates(id)

  let animate = useRef(null)

  const ships = useSelector( state => state.battleField.ships)

  const isPossibleToPlacement = useSelector( getIsPossibleToPlacement),
        notEmptySquares = useSelector( getNotEmptySquares ),
        allSquares = useSelector( getInitEmptySquares ),
        shipsData = useSelector(getFirstShipsField,shallowEqual),
        initCoorStatus = useSelector(getStatusInitCoordinates)


  const dndData = useSelector(getDndData)

  function dragStartHandler(e,ships) {
    const target = e.target.closest(".ship"),
          currentId = target.id
    let {direction} = getSizeAndDirectionOfShip(target)
    let shipSize = ships[id-1].size,
        currentPart = getDndCurrentPart(e,direction)

    animate.current = "ship--startDrag"
    // Если корабль уже был расположен на поле , то удаляем его и запоминаем прошое местопожение
    if (ships[id-1].hasOwnProperty('shipSquares')) {
      dispatch(savePrevShipPlacement(ships[id-1].shipSquares))
      dispatch(deleteShipFromField(ships[id-1].shipSquares))
      dispatch(deleteDeathZone(createDeathZone(ships[id-1].shipSquares)))
    }
    dispatch(setDndSettings(currentPart,shipSize,currentId,direction))
  }

  function dragEndHandler(e,dndStatus,prevShipPlacement) {
    const target = e.target.closest(".ship")
    target.style.display = "block"
    animate.current = null
    if (dndStatus) {
      let coordinates = setShip()
      if (coordinates) {
        let [x,y] = coordinates
        ref.current.style.left = x + "px"
        ref.current.style.top = y + "px"
      }
    }
    // если в текующем месте нельзя разместить корабль - возвращаем корабль на предыдущее место (если оно было)
    if( !isPossibleToPlacement && prevShipPlacement !== null) {
      let {direction} = getSizeAndDirectionOfShip(target)
      let shipDeathZone = createDeathZone(prevShipPlacement,direction)
      dispatch(setShipSquares([prevShipPlacement]))
      dispatch(setDeathSquares([shipDeathZone]))
    }
    dispatch(clearDndSettings())
  }

  function clickHandler(e,notEmptySquares,allSquares,createStrictShip) {
    const target = e.target.closest(".ship"),
        id = target.id,
        shipSquares = ships[id-1].shipSquares
    if (shipSquares === undefined) return;
    // Если корабль однопалубный - выходим
    if (shipSquares.length === 1) return
    try {
      tryToRotateShip({target,id,notEmptySquares,allSquares,createStrictShip,shipSquares})
    } catch (err) {
      alert(err.message)
    }

  }

  useEffect(() => {
    if (initCoorStatus) return

    let shipCoordinates = ref.current.getBoundingClientRect()
    dispatch(setPlacementShipCoordinates(shipCoordinates,id))
  },[])

  useLayoutEffect( () => {
    dispatchShipCoordinates()
    let coordinates = setShip()
    if (coordinates) {
      let [x,y,direction] = coordinates
      ref.current.style.left = x + "px"
      ref.current.style.top = y + "px"
      if (direction !== undefined) ref.current.style.transform = direction === 0 ? "rotate(90deg)" : "rotate(0)"
    }

  },[shipsData])

  function dragHandler(e) {
    e.target.closest(".ship").style.display = "none"
  }

  //console.log("ship")
  return (
      <div className={`ship ship--${size} ${animate.current}`} ref={ref} id={id} key={key} draggable={true}
           onClick={(e) => clickHandler(e,notEmptySquares,allSquares,createStrictShip)}
           onDragStart={ (e) => dragStartHandler(e,ships)}
           onDragEnd={ (e) => dragEndHandler(e,dndData.status,dndData.prevShipPlacement) }
           onDrag={(e) => dragHandler(e)}>

          <img src={setSrc(size)} alt="ship"/>
      </div>
  )
})

export default Ship