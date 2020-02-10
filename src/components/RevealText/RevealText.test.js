import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import RevealText from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<RevealText />).toJSON()

  expect(tree).toMatchSnapshot()
})
