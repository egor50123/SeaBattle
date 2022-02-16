export const setMapDamagedShip = (id,arr,map) => {
  let result = arr.find(arr => arr.includes(id))
  let isShipKilled = false
  if ( result.length === 1) {
    isShipKilled = true
  } else if (result) {
    let key = result.join(',')
    if (map.has(key)) {
      let oldValue = map.get(key)
      let newValue = [...oldValue,id]
      if (newValue.length === key.split(',').length) {
        isShipKilled = true
        return {map,isShipKilled}
      }
      map.delete(key)
      map.set(key,newValue)
    } else {
      map.set(key,[id])
    }
  }
  return {map,isShipKilled}
}