import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

import Card from "./components/Card"

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 180px;
  margin: 60px auto 0;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  @media screen and (max-width: 700px) {
    padding: 0 140px;
  }

  @media screen and (max-width: 575px) {
    padding: 0 30px;
  }
`

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 100px;
  max-width: 900px;
`

export default function About(props) {
  const { onLoad } = props

  onLoad()

  return (
    <Container>
      <Helmet title="About | Sturdy" />
      <h1>ABOUT</h1>
      <br />
      <h3 style={{ fontWeight: 300 }}>
        We provide comprehensive direction on all things visual: Branding, Album
        Art, Videos, Photography, and the Live Experience.
        <br />
        <br />
        <br />
        <br />
      </h3>
      <CardContainer>
        <Card title="TOUR BRANDING">
          We help curate consistent imagery through fonts, color palettes,
          photo, logos and other visual media.
        </Card>
        <Card title="ALBUM + TRACK ART">
          We convey an artist’s creative vision through album creative,
          including cover art and package design.
        </Card>
        <Card title="VIDEO">
          We conceptualize, direct, and produce videos representative to the
          artist’s music and vision.
        </Card>
        <Card title="LIVE">
          We work with artists to create a visually striking live experience,
          including stage design, lighting and stage visuals.
        </Card>
        <Card title="MERCH DESIGN">
          We work with our team of designers to craft merchandise that captures
          a moment and audiences in the artist’s musical timeline.
        </Card>
        <br />
        <Card title="PHOTOGRAPHY">
          We create unique and authentic visual interpretations of each artist’s
          vision.
        </Card>
        <Card title="TYPOGRAPHY + LOGO DESIGN">
          We create iconic and long-lasting custom type for the artist.
        </Card>
      </CardContainer>
    </Container>
  )
}
