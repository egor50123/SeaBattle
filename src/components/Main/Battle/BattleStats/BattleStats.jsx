import ship1 from "../../../../assets/img/ship1.png"
import ship2 from "../../../../assets/img/ship2.png"
import ship3 from "../../../../assets/img/ship3.png"
import ship4 from "../../../../assets/img/ship4.png"
import "./battleStats.scss"
import {useSelector} from "react-redux";
import {getDestroyedShipsStats, getIsBotMove} from "../../../../selectors/selectors";

const BattleStats = () => {
const stats = useSelector(getDestroyedShipsStats),
      isBotMove = useSelector(getIsBotMove)
  return (
      <>
        {isBotMove && <div style={{color: "white", fontSize: "60px"}}>LOADING</div>}
        <div className={"battleStats"}>
          {stats.ship1 === 0 || <div className={"battleStats__ship battleStats__ship--1"}>
            <img src={ship1} alt=""/>
            <span>X{stats.ship1}</span>
          </div>}
          {stats.ship2 === 0 || <div className={"battleStats__ship battleStats__ship--2"}>
            <img src={ship2} alt=""/>
            <span>X{stats.ship2}</span>
          </div>}
          {stats.ship3 === 0 || <div className={"battleStats__ship battleStats__ship--3"}>
            <img src={ship3} alt=""/>
            <span>X{stats.ship3}</span>
          </div>}
          {stats.ship4 === 0 || <div className={"battleStats__ship battleStats__ship--4"}>
            <img src={ship4} alt=""/>
            <span>X{stats.ship4}</span>
          </div>}
        </div>
      </>

  )
}

export default BattleStats