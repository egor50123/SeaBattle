import {useDispatch} from "react-redux";
import {deleteDndPrevPotentialShip} from "../../../../redux/battleFieldReducer";
import {useRef} from "react";
import {useDragOver} from "../../../../hooks/Dnd/useDragOver";
import {useGetSquareCss} from "../../../../hooks/useGetSquareCss";
import {useDragDrop} from "../../../../hooks/Dnd/useDragDrop";

const Square = ({id}) => {
  const ref = useRef(id),
        dispatch = useDispatch()

  const {getForDnd} = useGetSquareCss(),
        dragOver = useDragOver(),
        dragDrop = useDragDrop()

  let {shipClass, deathClass, successShipClass, unsuccessfulShipClass} = getForDnd(id)

  function dragOverHandler(e) {
    dragOver(e)
  }

  function dropHandler() {
    dragDrop()
  }

  function dragLeaveHandler() {
    dispatch(deleteDndPrevPotentialShip())
  }

  return (
      <span ref={ref} className={`square ${deathClass} ${shipClass} ${successShipClass} ${unsuccessfulShipClass}`}
            id={id}
            onDragLeave={dragLeaveHandler}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={dropHandler}/>
  )
}

export default Square