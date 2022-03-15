import "./RoundButton.scss"
import {setRoundButtonClass} from "../../../helpers/buttons/setRoundButtonClass";

const RoundButton = (props) => {
  const {type, func,disable,status} = {...props}

  let btnClass = setRoundButtonClass(type)
  let toggleClass = (status !== undefined && !status) ? "btn-round--off" : ""
  let disableClass = disable ? "btn-round--disable" : ""


  function onClickHandler(func) {
    if ( typeof func === "function") {
      func()
    }
  }
  return (
      <button tabIndex={0} className={`btn-round ${btnClass} ${disableClass} ${toggleClass}`} onClick={(e) => onClickHandler(func)}>
        <div className={"btn-round__inside"}>
          <div className={"btn-round__wrapper"}>
          </div>
        </div>
      </button>
  )
}

export default RoundButton

