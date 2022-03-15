import "./Button.scss"
import {setButtonClass} from "../../../helpers/buttons/setButtonClass";

const Button = ({text,params,type,func}) => {

  let btnClass = setButtonClass(type)

  function onClickHandler() {
    if ( typeof func === "function") {
      func(params)
    }
  }

  return (
      <button className={`button ${btnClass}`} onClick={onClickHandler}>
        <span className={"button__inside"}><span>{text}</span></span>
      </button>
  )
}

export default Button