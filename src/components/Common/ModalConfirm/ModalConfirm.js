import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {setCurrentPage, setIsExit} from "../../../redux/appInitReducer";
import {clearShipsData} from "../../../redux/battleFieldReducer";
import {clearAnimation} from "../../../redux/animationReducer";
import {clearBattle} from "../../../redux/battleReducer";
import {getIsExit} from "../../../selectors/selectors";
import "./ModalConfirm.scss"

export const ModalConfirm = () => {
  const isExit = useSelector(getIsExit)
  const dispatch = useDispatch()

  const onExit = useCallback(() => {
    dispatch(setIsExit(false))
    dispatch(setCurrentPage('placement'))
    dispatch(clearShipsData())
    dispatch(clearAnimation())
    dispatch(clearBattle())
  },[])

  const onCancel = useCallback(() => {
    dispatch(setIsExit(false))
  },[])


  return (
      isExit && <div className={"modalOverlay"} >
        <div className={"modalConfirm"}>
          <div className={"modalConfirm__wrapper"}>
            <p>Уверены, что хотите вернуться назад?</p>
            <div className={"modalConfirm__btn-box"}>
              <Button type={"modalExit"} text="Да" func={onExit}/>
              <Button type={"modalExit"} text="Отмена" func={onCancel}/>
            </div>
          </div>
        </div>
      </div>
  )
}