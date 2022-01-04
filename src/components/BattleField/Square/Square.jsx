import {useDispatch, useSelector} from "react-redux";
import {testAction} from "../../../redux/battleFieldReducer";

const Square = (props) => {
  const {id} = {...props}
  const dispatch = useDispatch()
  const field = useSelector(state => state.battleField)
  let shipClass,deathClass

  if(field.shipField.length > 0) {
    shipClass = field.shipField.find( ship => ship.find( num => num === id)) ? "square--ship" : ''
    deathClass =field.deathField.find( square =>  square=== id) ? "square--death" : ''
  }

  const onClick = (e) => {
    let targetId = e.target.id;
    dispatch(testAction(targetId))
  }

  return (
      <span className={`square ${deathClass} ${shipClass}`} id={id} key={id} onClick={onClick}>{id}</span>
  )
}

export default Square