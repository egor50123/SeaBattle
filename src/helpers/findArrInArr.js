export const findArrInArr =(arr,mainArr) => {
  return mainArr.find( item => JSON.stringify(item.sort((a,b) => a-b)) === JSON.stringify(arr.sort((a,b) => a-b)))
}