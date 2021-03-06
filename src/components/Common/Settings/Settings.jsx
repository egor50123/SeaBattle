import RoundButton from "../RoundButton/RoundButton";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import "../../../App.scss"
import "./Settings.scss"
import {getIsAnimationActive, getSettingsOpen} from "../../../selectors/selectors";
import {useCallback} from "react";
import {setIsAnimationOn, setSettingsOpen} from "../../../redux/appInitReducer";

const Settings = () => {
  const isSettingsOpen = useSelector(getSettingsOpen)
  const dispatch = useDispatch()


  const closeModal = useCallback((params) => {
    dispatch(setSettingsOpen(params))
  },[])

  const setAnimationActive = useCallback( () => {
    dispatch(setIsAnimationOn())
  },[])

  const isAnimationActive = useSelector(getIsAnimationActive)

  return (
      isSettingsOpen && <div className={"modalOverlay"}>
        <div className={"settings"}>
          <div className={"settings__wrapper"}>
            <div className={"settings__inside"}>
              <div className={"settings__main"}>
                <div className={"settings__name"}><span>Настройки</span></div>
                <div className={"settings__btns"}>
                  <div className={"settings__btns-box"}>
                    <h2>Звуки</h2>
                    <div>
                      <RoundButton type={"music"} disable={true}/>
                      <RoundButton type={"sound"} disable={true}/>
                    </div>
                  </div>
                  <div className={"settings__btns-box"}>
                    <h2>Анимация</h2>
                    <div>
                      <RoundButton type={"animation"} func={setAnimationActive} status={isAnimationActive}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"settings__close"}>
            <Button type={"close"} text={"Закрыть"} func={closeModal} params={false}/>
          </div>
        </div>
      </div>

  )
}

export default Settings