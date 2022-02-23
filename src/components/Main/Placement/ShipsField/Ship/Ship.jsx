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
  getContainerX, getContainerY, getDndData, getInitEmptySquares,
  getIsPossibleToPlacement, getNotEmptySquares, getShipField
} from "../../../../../selectors/selectors";
import {getSizeAndDirectionOfShip} from "../../../../../helpers/getSizeAndDirectionOfShip";
import {getDndCurrentPart} from "../../../../../helpers/getDndCurrentPart";
import {
  clearDndSettings, deleteDeathZone, deleteShipFromField,
  savePrevShipPlacement, setDeathSquares,setDndSettings, setShipSquares
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
      allSquares = useSelector( getInitEmptySquares )

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
    const target = e.target,
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
    const target = e.target
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
    const target = e.target,
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
    shipSrc.current = setSrc(size)
  })
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
    e.target.style.display = "none"
  }


  //console.log("render ship")
  return (
    <div className={`shipWrapper shipWrapper--${size} shipWrapper-area--${id}`}>
      <img className={`ship ship--${size} ${animate.current}`} src={shipSrc.current} alt="" ref={ref} id={id} key={key} draggable={true}
           onClick={(e) => clickHandler(e,notEmptySquares,allSquares,createStrictShip)}
           onDragStart={ (e) => dragStartHandler(e,ships,shipSrc.current)}
           onDragEnd={ (e) => dragEndHandler(e,dndData.status,dndData.prevShipPlacement,dndData.x,dndData.y,dndData.currentPart) }
          onDrag={(e) => dragHandler(e)}/>
    </div>
  )
})

export default Ship