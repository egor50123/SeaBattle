import {setCurrentPage} from "../../../redux/appInitReducer";
import {useDispatch} from "react-redux";
import "./Button.scss"

const Button = (props) => {
  const dispatch = useDispatch()
  const {text,nextPage,status} = {...props}

  function onClickHandler(e) {
    dispatch(setCurrentPage(nextPage))
  }

  return (
      <div className={"button"} onClick={onClickHandler}>
        <div className={"button__inside"}><span>{text}</span></div>
      </div>
  )
}

export default Button