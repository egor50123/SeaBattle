import "./row.scss"

const Row = (props) => {
  let {isLocal} = {...props}

  let localClass = isLocal ? "row--local" : ""

  return (
    <div className={`row ${localClass}`}>
      {props.row}
    </div>
  )
}

export default Row