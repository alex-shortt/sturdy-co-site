import React from "react"

export function useData(DATA) {
  return assignColors(DATA)
}

const pallete = [
  "#A155A1",
  "#EF59A1",
  "#DE217C",
  "#EE1B24",
  "#F15941",
  "#F58D44",
  "#FEBF4D",
  "#FFF54D",
  "#FFF300",
  "#A3D063",
  "#17A05F",
  "#00B6AD",
  "#00B9F2",
  "#2286C6",
  "#524EA1"
]

const assignColors = data => {
  for (const [i, card] of data.entries()) {
    card.color = pallete[i % pallete.length]
  }

  return data
}
