import "./Header.scss"
import pirate from "../../assets/img/pirate.svg"

const Header = () => {

  return (
      <div className={"header"}>
        <div className={"header__logo"}>
          <img src={pirate} alt=""/>
        </div>
      </div>
  )
}

export default Header