import React from "react"

export function useData(DATA) {
  return assignColors(DATA)
}

const assignColors = data => {
  for (const card of data) {
    const hue = Math.random() * 360
    const sat = Math.random() * 20 + 80
    const lit = Math.random() * 20 + 50

    card.color = `hsl(${hue}, ${sat}%, ${lit}%)`
  }

  return data
}
