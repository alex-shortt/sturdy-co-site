import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

import BebasOtf from "assets/fonts/Bebas.otf"
import BebasTtf from "assets/fonts/bebas.TTF"
import IndustryOtf from "assets/fonts/Industry.otf"

export default createGlobalStyle`
  @font-face {
      font-family: "Bebas";
      src: url(${BebasOtf}), url(${BebasTtf});
  }
  
  @font-face {
      font-family: "Industry";
      src: url(${IndustryOtf});
  }

  html, body, #root{
    height: 100%;
    background: black;
    color: white;
    font-family: Helvetica, "Bebas", "Industry",   sans-serif;
  }

  body {
    font-family: Avenir, Lato, Roboto, sans-serif;
    overflow: auto;
    overflow-x: hidden;
  }
`
