import "./RoundButton.scss"

const RoundButton = (props) => {
  const {text, src, type, func} = {...props}

  let btnClass = null

  switch (type) {
    case "play": btnClass = "btn-round--play";break;
    case "random": btnClass = "btn-round--random";break;
    case "rotate": btnClass = "btn-round--rotate";break;
    default: btnClass = null;
  }

  function onClickHandler(func) {
    if ( typeof func === "function") {
      func()
    }
  }
  return (
      <div className={`btn-round ${btnClass}`} onClick={(e) => onClickHandler(func)}>
        <div className={"btn-round__inside"}>
          <div className={"btn-round__wrapper"}>
            <img src={src} alt={text}/>
          </div>
        </div>
      </div>
  )
}

export default RoundButton

