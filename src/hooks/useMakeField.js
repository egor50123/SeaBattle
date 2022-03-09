import Square from "../components/Main/BattleField/Square/Square";
import SimpleSquare from "../components/Main/BattleField/SimpleSquare/SimpleSquare";
import Row from "../components/Main/BattleField/Row/Row";
import SquareLocal from "../components/Main/BattleField/SquareLocal/SquareLocal";

export const useMakeField = ({isBattleForPlacement, isLocal = false}) => {
  return ({fieldId,botShoot,shipsData}) => {
    const rowsTotal = 10;
    const columnsTotal = 10;

    let field = [];
    let currentId = 1;
    for ( let i = 1; i <=rowsTotal;  i++) {
      let row = [];
      for (let j = 1; j <= columnsTotal; j++) {
        !isLocal && isBattleForPlacement && row.push(<Square id={currentId} key={currentId}/>)
        !isLocal && !isBattleForPlacement && row.push(<SimpleSquare id={currentId} key={currentId} fieldId={fieldId} botShoot={botShoot}/>)
        isLocal && row.push(<SquareLocal id={currentId} key={currentId} shipsData={shipsData}/>)
        currentId++;
      }
      field.push(<Row row={row} key={currentId} isLocal={isLocal}/>)
    }
    return field
  }
}