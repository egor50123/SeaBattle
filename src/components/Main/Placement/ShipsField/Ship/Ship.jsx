import React, {useEffect, useLayoutEffect, useRef} from "react";

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useShip} from "../../../../../hooks/useShip";
import {useRotateShip} from "../../../../../hooks/useRotateShip";
import {
  getFirstShipsField, getInitEmptySquares, getNotEmptySquares, getShipsData, getStatusInitCoordinates
} from "../../../../../selectors/selectors";
import {setPlacementShipCoordinates} from "../../../../../redux/battleFieldReducer";
import {useSetShipCoordinates} from "../../../../../hooks/useSetShipCoordinates";
import {useDragStart} from "../../../../../hooks/Dnd/useDragStart";
import {useDragEnd} from "../../../../../hooks/Dnd/useDragEnd";

const Ship = React.memo((props) => {
  const {id, key, size, setSrc } = {...props}
  const ref = useRef(null),
        dispatch = useDispatch(),
        createStrictShip = useShip(true),
        tryToRotateShip = useRotateShip(),
        {dispatchShipCoordinates,setShip} = useSetShipCoordinates(id),
        dragStart = useDragStart(),
        dragEnd = useDragEnd()

  let animate = useRef(null)

  const ShipsInfo = useSelector(getShipsData),
        notEmptySquares = useSelector( getNotEmptySquares ),
        allSquares = useSelector( getInitEmptySquares ),
        shipsData = useSelector(getFirstShipsField,shallowEqual),
        initCoorStatus = useSelector(getStatusInitCoordinates)

  function dragStartHandler(e) {
    dragStart(e,id)
  }

  function dragEndHandler(e) {
    let dropCoordinates = dragEnd(e,setShip)
    if (dropCoordinates) {
      let [x,y] = dropCoordinates
      ref.current.style.left = x + "px"
      ref.current.style.top = y + "px"
    }
  }

  function dragHandler(e) {
    e.target.closest(".ship").style.display = "none"
  }

  function clickHandler(e,notEmptySquares,allSquares,createStrictShip) {
    const target = e.target.closest(".ship"),
        id = target.id,
        shipSquares = ShipsInfo[id-1].shipSquares
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

  //console.log("ship")
  return (
      <div className={`ship ship--${size} ${animate.current}`} ref={ref} id={id} key={key} draggable={true}
           onClick={(e) => clickHandler(e,notEmptySquares,allSquares,createStrictShip)}
           onDragStart={ (e) => dragStartHandler(e)}
           onDragEnd={ (e) => dragEndHandler(e) }
           onDrag={(e) => dragHandler(e)}>

          <img src={setSrc(size)} alt="ship"/>
      </div>
  )
})

export default Ship