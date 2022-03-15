import "../BattleField.scss"

const SquareLocal = (props) => {
  let {id,shipsData} = {...props}
  let shipsClass = !!shipsData.find(item => item.includes(id)) ? "square--ship" : ""

  return (
      <div id={id} className={`square square--local ${shipsClass}`}/>
  )
}

export default SquareLocal