import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsGameOver} from "../../../selectors/selectors";
import {setCurrentPage} from "../../../redux/appInitReducer";
import {clearShipsData} from "../../../redux/battleFieldReducer";

const GameOverModal = () => {
  const dispatch = useDispatch()
  let [isGameOver, setGameOver] = useState(false)
  const gameOver = useSelector(getIsGameOver)

  function onClick() {
    dispatch(setCurrentPage('menu'))
    dispatch(clearShipsData())
    setGameOver(false)
  }

  useEffect(() => {
    setTimeout(() => {
      if (gameOver) {
        setGameOver(true)
      }
    }, 500)
  }, [gameOver])

  return (
      isGameOver && <div className={"gameOver-modal"}><button onClick={onClick} style={{width: "150px", height: "40px" }}>Ок</button></div>
  )
}

export default GameOverModal