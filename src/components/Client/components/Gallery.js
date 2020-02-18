import React from "react"
import styled from "styled-components/macro"
import SliderBase from "react-awesome-slider"
import AwsSliderStyles from "react-awesome-slider/src/styles"

const Container = styled.div`
  background: black;
  width: 100%;
  top: 0;
  z-index: 3;
  padding-top: 40px;
  box-sizing: border-box;
`

const Slider = styled(SliderBase)`
  & > nav > button {
    background: white;
    width: 12px;
    height: 12px;

    &[class*="active"] {
      background: white !important;
      width: 14px !important;
      height: 14px !important;
    }
  }

  & > * {
    & span:before,
    & span:after {
      background: white !important;
    }
  }

  :root {
    --loader-bar-color: white !important;
  }

  .awssld__content > img,
  .awssld__content > video {
    object-fit: contain;
    background: black;
  }

  .awssld__bullets {
    flex-wrap: wrap;
    bottom: auto;
    margin-top: 8px;
  }
`

export default function Gallery(props) {
  const { media } = props

  return (
    <Container cssModule={AwsSliderStyles}>
      <Slider>
        {media.map(src => (
          <div data-src={src} />
        ))}
      </Slider>
    </Container>
  )
}
