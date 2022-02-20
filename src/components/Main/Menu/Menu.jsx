import "./Menu.scss"
import Button from "../../Common/Button/Button";

const Menu = (props) => {
  const nextPage = props.nextPage


  return (
      <div className={"menu"}>
        <div className={"menu__wrapper"}>
          <Button status={true} nextPage={nextPage} text={"Один Игрок"}/>
          <Button status={false} nextPage={nextPage} text={"Два игрока"}/>
        </div>
      </div>
  )
}

export default Menu