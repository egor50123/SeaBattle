import "./RoundButton.scss"

const RoundButton = (props) => {
  const {text, src, type, func,disable,status} = {...props}

  let btnClass = null;
  let toggleClass = ""
  let disableClass = disable ? "btn-round--disable" : ""

  switch (type) {
    case "play": btnClass = "btn-round--play";break;
    case "random": btnClass = "btn-round--random";break;
    case "save": btnClass = "btn-round--save";break;
    case "music": btnClass = "btn-round--music";break;
    case "sound": btnClass = "btn-round--sound";break;
    case "animation": btnClass = "btn-round--animation";break;
    case "placementMenu": btnClass = "btn-round--placementMenu";break;
    case "back": btnClass = "btn-round--back";break;
    case "settings": btnClass = "btn-round--settings";break;
    default: btnClass = null;
  }

  if (status !== undefined && !status) { toggleClass = "btn-round--off"}

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

