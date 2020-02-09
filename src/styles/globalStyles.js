import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"

export default createGlobalStyle`
  @import url("https://use.typekit.net/ngv8bfd.css");

  html, body, #root{
    height: 100%;
    background: black;
    color: white;
    font-family: din-2014, Roboto, sans-serif;
    overflow: hidden;
  }

  body {
    overflow: auto;
    overflow-x: hidden;
  }
`
