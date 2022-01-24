import Square from "./Square/Square";
import Row from "./Row/Row";
import "./BattleField.scss"
import {useRandomPlacement} from "../../hooks/useRandomPlacement";
import {useDispatch} from "react-redux";
import {updateShipData} from "../../redux/battleFieldReducer";

const BattleField = () => {
  const {doRandomPlacement} = useRandomPlacement()
  const dispatch = useDispatch()
  const makeField = () => {
    const rowsTotal = 10;
    const columnsTotal = 10;

    let field = [];
    let currentId = 1;
    for ( let i = 1; i <=rowsTotal;  i++) {
      let row = [];
      for (let j = 1; j <= columnsTotal; j++) {
        row.push(<Square id={currentId} key={currentId}/>)
        currentId++;
      }
      field.push(<Row row={row} key={currentId}/>)
    }
    return field
  }

  function onClickHandler() {
    doRandomPlacement()
    dispatch(updateShipData())
    //dispatch(setDndPotentialShip(potentialShip,isPossibleToPlacement))
  }


  //console.log("RENDER_FIELD")
  return (
      <div className={'field'}>
        <div>
          {makeField()}
        </div>
        <div>
          <button onClick={onClickHandler}>Случайная расстановка</button>
        </div>
      </div>
  )
}

export default BattleField