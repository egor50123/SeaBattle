import "./Button.scss"

const Button = ({text,params,type,func}) => {

  let btnClass = ""

  switch (type) {
    case "close": btnClass = "button--close";break;
    case "disable": btnClass = "button--disable";break;
    case "gameOver": btnClass = "button--gameOver"
    default: break;
  }


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