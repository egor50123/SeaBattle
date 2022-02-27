export const setMapDamagedShip = (id,arr,map) => {
  let result = arr.find(arr => arr.includes(id))
  let isShipKilled = false
  let destroyedShip = null
  if ( result.length === 1) {
    isShipKilled = true
    destroyedShip = result
  } else if (result) {

    let key = result.sort((a,b) => a-b).join(',')
    if (map.has(key)) {
      let oldValue = map.get(key)
      let newValue = [...oldValue,id]
      if (newValue.length === key.split(',').length) {
        isShipKilled = true
        destroyedShip = newValue
        return {map,isShipKilled,destroyedShip}
      }
      map.delete(key)
      map.set(key,newValue)
    } else {
      map.set(key,[id])
    }
  }
  return {map,isShipKilled,destroyedShip}
}