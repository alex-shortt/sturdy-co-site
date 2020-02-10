import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import IntroVideo from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<IntroVideo />).toJSON()

  expect(tree).toMatchSnapshot()
})
