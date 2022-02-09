import React, {useRef} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useDndCurrentPart} from "../../../../hooks/useDndCurrentPart";
import {useDeathZone} from "../../../../hooks/useDeathZone";
import {useShip} from "../../../../hooks/useShip";
import {
  getContainerX,
  getContainerY,
  getDNDCurrentPart, getDNDPrevShipPlacement,
  getDNDStatus,
  getDNDx,
  getDNDy, getInitEmptySquares, getIsPossibleToPlacement, getNotEmptySquares
} from "../../../../selectors/selectors";
import {
  clearDndSettings,
  deleteDeathZone,
  deleteShipFromField,
  savePrevShipPlacement, setDeathSquares,
  setDndSettings, setShipSquares, updateShipSquares
} from "../../../../redux/battleFieldReducer";


const Ship = React.memo((props) => {
  const {id, key, size } = {...props}
  const ref = useRef(null),
        dispatch = useDispatch(),
        findCurrent = useDndCurrentPart(),
        createDeathZone = useDeathZone(),
        createStrictShip = useShip(true)

  const dndStatus  = useSelector( getDNDStatus),
        currentPart = useSelector( getDNDCurrentPart),
        ships = useSelector( state => state.battleField.ships),
        containerX = useSelector( getContainerX),
        containerY = useSelector( getContainerY),
        x = useSelector( getDNDx),
        y = useSelector( getDNDy),
        xShips = ships[id-1].x,
        yShips = ships[id-1].y,
        prevShipPlacement = useSelector( getDNDPrevShipPlacement),
        isPossibleToPlacement = useSelector( getIsPossibleToPlacement),
        notEmptySquares = useSelector( getNotEmptySquares ),
        allSquares = useSelector( getInitEmptySquares )
//////!!!!!!!
  // в отдельную функцию
  // let width = ref.current.getBoundingClientRect().width
  // let height = ref.current.getBoundingClientRect().height
  // let direction = width > height ? 1 : 0

  // если в состоянии корабля есть координаты - выставляем его  согласно координатам и направлению
  if(ships[id-1].hasOwnProperty("x")) {
    ref.current.style.top = yShips - containerY + "px"
    ref.current.style.left = xShips - containerX + "px"
    let width = ref.current.getBoundingClientRect().width
    let height = ref.current.getBoundingClientRect().height

    let isVerticalShip = Math.abs(ships[id-1].shipSquares[0]-ships[id-1].shipSquares[1]) === 10
    let isHorizontalShip = Math.abs(ships[id-1].shipSquares[0]-ships[id-1].shipSquares[1]) === 1
    let isShipLengthMoreThenOne = ships[id-1].shipSquares.length !== 1
    //делаем корабль вертикальным если он еще не вертикальный
    // В отдельную функцию (в кклике используется)
    if (isShipLengthMoreThenOne && isVerticalShip && width > height) {
      ref.current.style.width = height + "px"
      ref.current.style.height = width + "px"
    } //делаем корабль горизонтальным если он еще не горизонтальный
    else if (isShipLengthMoreThenOne && isHorizontalShip && width < height) {
      ref.current.style.height = width + "px"
      ref.current.style.width = height + "px"
    }
  }

  function dragStartHandler(e,ships) {
    let width = ref.current.getBoundingClientRect().width,
        height = ref.current.getBoundingClientRect().height,
        direction = width > height ? 1 : 0

    let target = e.target,
        currentId =  target.id,
        shipSize = ships[id-1].size,
        currentPart = findCurrent(e,direction)




    target.style.background = "yellow"
    setTimeout(() => target.style.display = "none",0)
    // Если корабль уже был расположен на поле , то удаляем его и запоминаем его прошое местопожение
    if (ships[id-1].hasOwnProperty('shipSquares')) {
      dispatch(savePrevShipPlacement(ships[id-1].shipSquares))
      dispatch(deleteShipFromField(ships[id-1].shipSquares))
      dispatch(deleteDeathZone(createDeathZone(ships[id-1].shipSquares,direction)))
    }
    dispatch(setDndSettings(currentPart,shipSize,currentId,direction))
  }

  function dragEndHandler(e) {
    let container = e.target.closest('.container')
    let shiftX = container.getBoundingClientRect().left;
    let shiftY = container.getBoundingClientRect().top;
    let target = e.target
    target.style.background = "black"
    target.style.display = "block"
    //!!!!!!!!!!!
    if (dndStatus) {
      target.style.top = y - shiftY + 'px'
      target.style.left = x - shiftX - (currentPart-1)*30 + 'px';
    }
    if( !isPossibleToPlacement ) {
      let width = ref.current.getBoundingClientRect().width
      let height = ref.current.getBoundingClientRect().height
      let direction = width > height ? 1 : 0
      let shipDeathZone = createDeathZone(prevShipPlacement,direction)
      dispatch(setShipSquares([prevShipPlacement]))
      dispatch(setDeathSquares([shipDeathZone]))
    }
    dispatch(clearDndSettings())
  }

  function clickHandler(e,notEmptySquares,allSquares) {
    const id = e.target.id
    const shipSquares = ships[id-1].shipSquares
    if (shipSquares.length === 1) return

    function createShip (notEmptySquares,direction,shipSquares) {
      let notEmptySquaresCopy = notEmptySquares.slice()
      notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0]),1)
      if (direction ===1) notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0] + 10),1)
      if (direction ===0) notEmptySquaresCopy.splice(notEmptySquaresCopy.indexOf(shipSquares[0] + 1),1)
      const emptySquares = allSquares.filter(item => !notEmptySquaresCopy.includes(item))

      let reverseDirection = direction === 1 ? 0 : 1

      return createStrictShip(shipSquares[0], shipSquares.length, reverseDirection, emptySquares)
    }

    let width = ref.current.getBoundingClientRect().width,
        height = ref.current.getBoundingClientRect().height,
        direction = width > height ? 1 : 0

    const deathZone = createDeathZone(shipSquares,direction)
    const newShip = createShip(notEmptySquares,direction,shipSquares)

    if (newShip) {
      let width = ref.current.getBoundingClientRect().width
      let height = ref.current.getBoundingClientRect().height

      ref.current.style.width = height + "px"
      ref.current.style.height = width + "px"

      let reverseDirection = direction === 1 ? 0 : 1
      let newShipDeathZone = createDeathZone(newShip,reverseDirection)
      dispatch(deleteShipFromField(shipSquares))
      dispatch(deleteDeathZone(deathZone))
      dispatch(setShipSquares([newShip]))
      dispatch(setDeathSquares([newShipDeathZone]))
      dispatch(updateShipSquares(id,newShip))
    }
  }

  //console.log("render ship")
  return (
    <div ref={ref} id={id} key={key} draggable={true} className={`ship ship--${size}`}
         onClick={(e) => clickHandler(e,notEmptySquares,allSquares)}
         onDragStart={ (e) => dragStartHandler(e,ships)}
         onDragEnd={ (e) => dragEndHandler(e) }>{id}
    </div>
  )
})

export default Ship