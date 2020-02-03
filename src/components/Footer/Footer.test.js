import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Footer from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Footer />).toJSON()

  expect(tree).toMatchSnapshot()
})
