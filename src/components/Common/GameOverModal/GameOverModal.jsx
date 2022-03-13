import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsGameOver, getIsWin} from "../../../selectors/selectors";
import {setCurrentPage} from "../../../redux/appInitReducer";
import {clearShipsData} from "../../../redux/battleFieldReducer";
import "./GameOverModal.scss"
import "../../../App.scss"
import Button from "../Button/Button";
import {clearAnimation} from "../../../redux/animationReducer";
import {clearBattle} from "../../../redux/battleReducer";

const GameOverModal = () => {
  const dispatch = useDispatch()
  let [isGameOver, setGameOver] = useState(false)
  const gameOver = useSelector(getIsGameOver),
        isWin = useSelector(getIsWin)

  let text = isWin ? "Победа!" : "Поражение.";

  const onClick = useCallback(() => {
    dispatch(setCurrentPage('menu'))
    dispatch(clearShipsData())
    dispatch(clearAnimation())
    dispatch(clearBattle())
    setGameOver(false)
  },[])

  useEffect(() => {
    setTimeout(() => {
      if (gameOver) {
        setGameOver(true)
      }
    }, 500)
  }, [gameOver])

  return (
      isGameOver && <div className={"modalOverlay"} >
        <div className={"gameOver-modal"}>
          <div className={"gameOver-modal__wrapper"}>
            <p>{text}</p>
            <Button type={"gameOver"} text="Выйти в меню" func={onClick}/>
          </div>
        </div>
      </div>
  )
}

export default GameOverModal