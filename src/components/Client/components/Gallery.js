import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import GridGallery from "react-grid-gallery"

const Container = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  top: 0;
  z-index: 3;
  padding-top: 60px;
  box-sizing: border-box;
`

// images comes in from data as [ "url1", "url2" ]
// should be transformed to [ {src, thumbnail, thumbnailWidth, thumbnailHeight } ]

export default function Gallery(props) {
  const { images } = props

  const [formatted, setFormatted] = useState([])

  useEffect(() => {
    const loadImages = async () => {
      const loadAllImages = images.map(
        src =>
          new Promise(resolve => {
            resolve(loadImage(src))
          })
      )
      const loadedImages = await Promise.all(loadAllImages)
      const formattedImages = loadedImages.map(formatImage)
      setFormatted(formattedImages)
    }

    if (formatted.length === 0) {
      loadImages()
    }
  }, [formatted, images])

  return (
    <Container>
      {formatted.length > 0 ? (
        <GridGallery
          images={formatted}
          enableImageSelection={false}
          rowHeight={500}
          backdropClosesModal
        />
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", err => reject(err))
    img.src = src
  })
}

const formatImage = img => ({
  src: img.src,
  thumbnail: img.src,
  thumbnailHeight: img.height,
  thumbnailWidth: img.width
})
