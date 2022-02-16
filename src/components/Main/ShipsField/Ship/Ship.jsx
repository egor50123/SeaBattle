import React, {useRef} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useDeathZone} from "../../../../hooks/useDeathZone";
import {useShip} from "../../../../hooks/useShip";
import {
  getContainerX, getContainerY, getDndData, getInitEmptySquares, getIsPossibleToPlacement, getNotEmptySquares
} from "../../../../selectors/selectors";
import {
  clearDndSettings, deleteDeathZone, deleteShipFromField, savePrevShipPlacement, setDeathSquares, setDndSettings, setShipSquares
} from "../../../../redux/battleFieldReducer";
import {getSizeAndDirectionOfShip} from "../../../../helpers/getSizeAndDirectionOfShip";
import {useRotateShip} from "../../../../hooks/useRotateShip";
import {getDndCurrentPart} from "../../../../helpers/getDndCurrentPart";


const Ship = React.memo((props) => {
  const {id, key, size } = {...props}
  const ref = useRef(null),
        dispatch = useDispatch(),
        createDeathZone = useDeathZone(),
        createStrictShip = useShip(true),
        tryToRotateShip = useRotateShip()


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
      ref.current.style.width = height + "px"
      ref.current.style.height = width + "px"
    } //делаем корабль горизонтальным если он еще не горизонтальный
    else if (isShipLengthMoreThenOne && isHorizontalShip && width < height) {
      ref.current.style.height = width + "px"
      ref.current.style.width = height + "px"
    }
  }

  function dragStartHandler(e,ships) {
    const target = e.target,
          currentId = target.id
    let {direction} = getSizeAndDirectionOfShip(target)
    let shipSize = ships[id-1].size,
        currentPart = getDndCurrentPart(e,direction)

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

  function dragEndHandler(e,dndStatus,prevShipPlacement,x,y,currentPart) {
    const target = e.target
    let container = target.closest('.container'),
        shiftX = container.getBoundingClientRect().left,
        shiftY = container.getBoundingClientRect().top;
    target.style.background = "black"
    target.style.display = "block"
    if (dndStatus) {
      target.style.top = y - shiftY + 'px'
      target.style.left = x - shiftX - (currentPart-1)*30 + 'px';
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
    // Если корабль однопалубный - выходим
    if (shipSquares.length === 1) return
    try {
      tryToRotateShip({target,id,notEmptySquares,allSquares,createStrictShip,shipSquares})
    } catch (err) {
      alert(err.message)
    }

  }

  //console.log("render ship")
  return (
    <div ref={ref} id={id} key={key} draggable={true} className={`ship ship--${size}`}
         onClick={(e) => clickHandler(e,notEmptySquares,allSquares,createStrictShip)}
         onDragStart={ (e) => dragStartHandler(e,ships)}
         onDragEnd={ (e) => dragEndHandler(e,dndData.status,dndData.prevShipPlacement,dndData.x,dndData.y,dndData.currentPart) }>{id}
    </div>
  )
})

export default Ship