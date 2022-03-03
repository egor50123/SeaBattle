import ship1 from "../../../../assets/img/ship1.png"
import ship2 from "../../../../assets/img/ship2.png"
import ship3 from "../../../../assets/img/ship3.png"
import ship4 from "../../../../assets/img/ship4.png"
import "./battleStats.scss"

const BattleStats = () => {

  let init = {
    ship1: 4,
    ship2: 3,
    ship3: 2,
    ship4: 1,

  }
  return (
      <div className={"battleStats"}>
        <div className={"battleStats__ship battleStats__ship--1"}>
          <img src={ship1} alt=""/>
          <span>X{init.ship1}</span>
        </div>
        <div className={"battleStats__ship battleStats__ship--2"}>
          <img src={ship2} alt=""/>
          <span>X{init.ship2}</span>
        </div>
        <div className={"battleStats__ship battleStats__ship--3"}>
          <img src={ship3} alt=""/>
          <span>X{init.ship3}</span>
        </div>
        <div className={"battleStats__ship battleStats__ship--4"}>
          <img src={ship4} alt=""/>
          <span>X{init.ship4}</span>
        </div>
      </div>
  )
}

export default BattleStats