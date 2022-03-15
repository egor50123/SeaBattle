import "./savedPlacementMenu.scss"
import {useDispatch, useSelector} from "react-redux";
import {clearShipsData, setDeathSquares, setShipSquares, updateShipData} from "../../../redux/battleFieldReducer";
import {useDeathZone} from "../../../hooks/useDeathZone";
import {useMakeField} from "../../../hooks/useMakeField";
import {getCountOfSavedShips, getIsSavedPlacementOpen} from "../../../selectors/selectors";
import {setCountOfSavedShips} from "../../../redux/appInitReducer";
import close from "../../../assets/img/close.svg"

const SavedPlacementMenu = () => {
  const dispatch = useDispatch()
  const createDeathZone = useDeathZone(),
        makeField = useMakeField({isLocal:true})

  const isListOpen = useSelector(getIsSavedPlacementOpen),
        countOfFields = useSelector(getCountOfSavedShips)

  let openClass = isListOpen ? "savedPlacementMenu--open" : "savedPlacementMenu--close";

  const makeList = () => {
    let fields = []
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if (!key.includes("ship")) continue
      fields.push({id:key,ships:JSON.parse(localStorage.getItem(key))})

    }
    return fields
  }

  let fields = makeList()

  function getSavedField(shipsData) {
    let deathZone = []
    for (let i = 0; i<shipsData.length;i++) {
      deathZone.push(createDeathZone(shipsData[i]))
    }
    dispatch(clearShipsData())
    dispatch(setShipSquares(shipsData,1))
    dispatch(setDeathSquares(deathZone,1))
    dispatch(updateShipData())
  }


  function deleteSavedField(e) {
    let targetId = e.target.closest(".savedPlacementMenu__btn-close").id
    localStorage.removeItem(targetId)
    dispatch(setCountOfSavedShips())
  }

  return (
      <div className={`savedPlacementMenu ${openClass}`}>

        { fields.length > 0 ? fields.map((shipsData) =>
            <div className={"savedPlacementMenu__item"} key={shipsData.id}>
              <div  id={shipsData.id} className={"savedPlacementMenu__field"} onClick={(e) => getSavedField(shipsData.ships)}>
                {makeField({shipsData: shipsData.ships})}
              </div>
              <button key={shipsData.id} id={shipsData.id} className={"savedPlacementMenu__btn-close"} onClick={(e) => deleteSavedField(e)}>
                <img src={close} alt=""/>
              </button>
            </div>
            ) : <span>Нет сохранённых расстановок</span>}
      </div>
  )
}

export default SavedPlacementMenu