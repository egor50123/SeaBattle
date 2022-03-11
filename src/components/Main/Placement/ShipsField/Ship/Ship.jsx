import React, {useEffect, useRef} from "react";
import ship4 from "../../../../../assets/img/ship4.png"
import ship3 from "../../../../../assets/img/ship3.png"
import ship2 from "../../../../../assets/img/ship2.png"
import ship1 from "../../../../../assets/img/ship1.png"

import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "../../../../../hooks/useDeathZone";
import {useShip} from "../../../../../hooks/useShip";
import {useRotateShip} from "../../../../../hooks/useRotateShip";
import {
  getContainerX,
  getContainerY, getCurrentPage,
  getDndData,
  getFirstShipsField,
  getInitEmptySquares,
  getIsPossibleToPlacement,
  getNotEmptySquares,
  getShipData1, getShipData10,
  getShipData2,
  getShipData3,
  getShipData4,
  getShipData5,
  getShipData6, getShipData7, getShipData8, getShipData9, getStatusInitCoordinates
} from "../../../../../selectors/selectors";
import {getSizeAndDirectionOfShip} from "../../../../../helpers/getSizeAndDirectionOfShip";
import {getDndCurrentPart} from "../../../../../helpers/getDndCurrentPart";
import {
  clearDndSettings,
  deleteDeathZone,
  deleteShipFromField,
  savePrevShipPlacement,
  setDeathSquares,
  setDndSettings,
  setPlacementShipCoordinates, setShipCoordinates,
  setShipSquares
} from "../../../../../redux/battleFieldReducer";
import {SQUARE_SIZE} from "../../../../../constant/constant";

const Ship = React.memo((props) => {
  const {id, key, size } = {...props}
  const ref = useRef(null),
        dispatch = useDispatch(),
        createDeathZone = useDeathZone(),
        createStrictShip = useShip(true),
        tryToRotateShip = useRotateShip()

  let animate = useRef(null)



  const ships = useSelector( state => state.battleField.ships),
      containerX = useSelector( getContainerX),
      containerY = useSelector( getContainerY),
      xShips = ships[id-1].x,
      yShips = ships[id-1].y,
      isPossibleToPlacement = useSelector( getIsPossibleToPlacement),
      notEmptySquares = useSelector( getNotEmptySquares ),
      allSquares = useSelector( getInitEmptySquares ),
      shipsData = useSelector(getFirstShipsField,shallowEqual),
      shipData1 = useSelector( getShipData1),
      shipData2 = useSelector( getShipData2),
      shipData3 = useSelector( getShipData3),
      shipData4 = useSelector( getShipData4),
      shipData5 = useSelector( getShipData5),
      shipData6 = useSelector( getShipData6),
      shipData7 = useSelector( getShipData7),
      shipData8 = useSelector( getShipData8),
      shipData9 = useSelector( getShipData9),
      shipData10 = useSelector( getShipData10),
      initCoorStatus = useSelector(getStatusInitCoordinates)


  const dndData = useSelector(getDndData)

  // если в состоянии корабля есть координаты - выставляем его  согласно координатам и направлению

  if(ships[id-1].hasOwnProperty("x")) {
    ref.current.style.top = yShips - containerY + "px"
    ref.current.style.left = xShips - containerX + "px"
    let width = ref.current.getBoundingClientRect().width,
        height = ref.current.getBoundingClientRect().height

    let isVerticalShip = Math.abs(ships[id-1].shipSquares[0]-ships[id-1].shipSquares[1]) === 10,
        isHorizontalShip = Math.abs(ships[id-1].shipSquares[0]-ships[id-1].shipSquares[1]) === 1,
        isShipLengthMoreThenOne = ships[id-1].shipSquares.length !== 1
    //делаем корабль вертикальным если он еще не вертикальный
    if (isShipLengthMoreThenOne && isVerticalShip && width > height) {
      ref.current.style.transform = `rotate(90deg)`
    } //делаем корабль горизонтальным если он еще не горизонтальный
    else if (isShipLengthMoreThenOne && isHorizontalShip && width < height) {
      ref.current.style.transform = "rotate(0)"
    }
  }

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

  function dragEndHandler(e,dndStatus,prevShipPlacement,x,y,currentPart) {
    const target = e.target.closest(".ship")
    let container = target.closest('.placement'),
        shiftX = container.getBoundingClientRect().left,
        shiftY = container.getBoundingClientRect().top;
    target.style.display = "block"
    animate.current = null
    if (dndStatus) {
      target.style.top = y - shiftY + 'px'
      target.style.left = x - shiftX - (currentPart-1)*SQUARE_SIZE + 'px';
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

  let shipSrc = useRef()

  useEffect(() => {
    if (initCoorStatus) return
    shipSrc.current = setSrc(size)
    let shipCoordinates = ref.current.getBoundingClientRect()
    dispatch(setPlacementShipCoordinates(shipCoordinates,id))
  },[])

  useEffect( () => {
    switch (id) {
      case 1: if (shipData1.shipSquares) dispatch(setShipCoordinates(1,shipData1.shipSquares[0])); break;
      case 2: if (shipData2.shipSquares) dispatch(setShipCoordinates(2,shipData2.shipSquares[0])); break;
      case 3: if (shipData3.shipSquares) dispatch(setShipCoordinates(3,shipData3.shipSquares[0])); break;
      case 4: if (shipData4.shipSquares) dispatch(setShipCoordinates(4,shipData4.shipSquares[0])); break;
      case 5: if (shipData5.shipSquares) dispatch(setShipCoordinates(5,shipData5.shipSquares[0])); break;
      case 6: if (shipData6.shipSquares) dispatch(setShipCoordinates(6,shipData6.shipSquares[0])); break;
      case 7: if (shipData7.shipSquares) dispatch(setShipCoordinates(7,shipData7.shipSquares[0])); break;
      case 8: if (shipData8.shipSquares) dispatch(setShipCoordinates(8,shipData8.shipSquares[0])); break;
      case 9: if (shipData9.shipSquares) dispatch(setShipCoordinates(9,shipData9.shipSquares[0])); break;
      case 10: if (shipData10.shipSquares) dispatch(setShipCoordinates(10,shipData10.shipSquares[0])); break;
      default: break;
    }
    switch (id) {
      case 1: {
        if (!shipData1.x) return
        ref.current.style.left = shipData1.x + "px"
        ref.current.style.top = shipData1.y + "px"
      } break;
      case 2: {
        if (!shipData2.x) return
        ref.current.style.left = shipData2.x + "px"
        ref.current.style.top = shipData2.y + "px"
      } break;
      case 3: {
        if (!shipData3.x) return
        ref.current.style.left = shipData3.x + "px"
        ref.current.style.top = shipData3.y + "px"
      } break;
      case 4: {
        if (!shipData4.x) return
        ref.current.style.left = shipData4.x + "px"
        ref.current.style.top = shipData4.y + "px"
      } break;
      case 5: {
        if (!shipData5.x) return
        ref.current.style.left = shipData5.x + "px"
        ref.current.style.top = shipData5.y + "px"
      } break;
      case 6: {
        if (!shipData6.x) return
        ref.current.style.left = shipData6.x + "px"
        ref.current.style.top = shipData6.y + "px"
      } break;
      case 7: {
        if (!shipData7.x) return
        ref.current.style.left = shipData7.x + "px"
        ref.current.style.top = shipData7.y + "px"
      } break;
      case 8: {
        if (!shipData8.x) return
        ref.current.style.left = shipData8.x + "px"
        ref.current.style.top = shipData8.y + "px"
      } break;
      case 9: {
        if (!shipData9.x) return
        ref.current.style.left = shipData9.x + "px"
        ref.current.style.top = shipData9.y + "px"
      } break;
      case 10: {
        if (!shipData10.x) return
        ref.current.style.left = shipData10.x + "px"
        ref.current.style.top = shipData10.y + "px"
      } break;
      default: break;
    }
  },[shipsData])


  function setSrc (size) {
    let src
    switch (size) {
      case 1: src = ship1;break;
      case 2: src = ship2;break;
      case 3: src = ship3;break;
      case 4: src = ship4;break;
      default: break;
    }
    return src
  }

  function dragHandler(e) {
    e.target.closest(".ship").style.display = "none"
  }


  return (
      <div className={`ship ship--${size} ${animate.current}`} ref={ref} id={id} key={key} draggable={true}
           onClick={(e) => clickHandler(e,notEmptySquares,allSquares,createStrictShip)}
           onDragStart={ (e) => dragStartHandler(e,ships,shipSrc.current)}
           onDragEnd={ (e) => dragEndHandler(e,dndData.status,dndData.prevShipPlacement,dndData.x,dndData.y,dndData.currentPart) }
           onDrag={(e) => dragHandler(e)}>

          <img src={setSrc(size)} alt="ship"/>
      </div>
  )
})

export default Ship