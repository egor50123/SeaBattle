const SimpleSquare = (props) => {
  const {id} = {...props}
  return (
      <span className={`square`} id={id}>
        {id}
      </span>
  )
}

export default SimpleSquare