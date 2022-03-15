export const setNewStats = (size,prevStats) => {
  let newStats = {}
  switch (size) {
    case 1: newStats = {
      ...prevStats,
      ship1: --prevStats.ship1
    }; break;
    case 2: newStats = {
      ...prevStats,
      ship2: --prevStats.ship2
    }; break;
    case 3: newStats = {
      ...prevStats,
      ship3: --prevStats.ship3
    }; break;
    case 4: newStats = {
      ...prevStats,
      ship4: --prevStats.ship4
    }; break;
    default: newStats = {
      ...prevStats
    }
  }
  return newStats
}