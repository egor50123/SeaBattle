export const setRoundButtonClass = (type) => {
  let btnClass = ""
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
  return btnClass
}