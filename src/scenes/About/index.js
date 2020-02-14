import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 180px;
  margin: 60px auto 0;
  height: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 700px) {
    padding: 0 140px;
  }

  @media screen and (max-width: 575px) {
    padding: 0 30px;
  }
`

export default function About(props) {
  const { onLoad } = props

  onLoad()

  return (
    <Container>
      <Helmet title="About" />
      <h1>ABOUT</h1>
      <br />
      <h3>
        We provide comprehensive direction on all things visual: Branding, Album
        Art, Videos, Photography, and the Live Experience.
        <br />
        <br />
        TOUR BRANDING: We help curate consistent imagery through fonts, color
        palettes, photo, logos and other visual media.
        <br />
        <br />
        ALBUM + TRACK ART: We convey an artist’s creative vision through album
        creative, including cover art and package design.
        <br />
        <br />
        VIDEO: We conceptualize, direct, and produce videos representative to
        the artist’s music and vision.LIVE: We work with artists to create a
        visually striking live experience, including stage design, lighting and
        stage visuals.
        <br />
        <br />
        MERCH DESIGN: We work with our team of designers to craft merchandise
        that captures a moment and audiences in the artist’s musical timeline.
        <br />
        <br />
        PHOTOGRAPHY: We create unique and authentic visual interpretations of
        each artist’s vision.
        <br />
        <br />
        TYPOGRAPHY + LOGO DESIGN: We create iconic and long-lasting custom type
        for the artist.
      </h3>
    </Container>
  )
}
