import Square from "./Square/Square";
import Row from "./Row/Row";
import "./BattleField.scss"
import {useMemo} from "react";
import SimpleSquare from "./SimpleSquare/SimpleSquare";
import {useGetDamagedShip} from "../../../hooks/useGetDamagedShip";

const BattleField = (props) => {
  const {isBattleForPlacement, id:fieldId} = {...props}
  const botShoot = props.botShoot
  const currentDamagedShip = useGetDamagedShip(fieldId)

  function makeField () {
    const rowsTotal = 10;
    const columnsTotal = 10;

    let field = [];
    let currentId = 1;
    for ( let i = 1; i <=rowsTotal;  i++) {
      let row = [];
      for (let j = 1; j <= columnsTotal; j++) {
        isBattleForPlacement && row.push(<Square id={currentId} key={currentId}/>)
        !isBattleForPlacement && row.push(<SimpleSquare id={currentId} key={currentId} fieldId={fieldId} botShoot={botShoot} currentDamagedShip={currentDamagedShip}/>)
        currentId++;
      }
      field.push(<Row row={row} key={currentId}/>)
    }
    return field
  }
  const memoField = useMemo( () => makeField(),[])

  //console.log("RENDER_BATTLEFIELD " + fieldId)
  return (
    <div className={'field'}>
      {memoField}
    </div>
  )
}

export default BattleField