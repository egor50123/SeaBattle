export const setButtonClass = (type) => {
  let btnClass = ""
  switch (type) {
    case "close": btnClass = "button--close";break;
    case "disable": btnClass = "button--disable";break;
    case "gameOver": btnClass = "button--gameOver";break;
    case "modalExit": btnClass = "button--modalExit";break;
    default: break;
  }

  return btnClass
}