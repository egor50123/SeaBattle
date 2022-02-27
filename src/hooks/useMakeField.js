import Square from "../components/Main/BattleField/Square/Square";
import SimpleSquare from "../components/Main/BattleField/SimpleSquare/SimpleSquare";
import Row from "../components/Main/BattleField/Row/Row";

export const useMakeField = (isBattleForPlacement) => {
  return ({fieldId,botShoot,currentDamagedShip}) => {
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
}