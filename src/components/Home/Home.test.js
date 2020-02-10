import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Home from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Home />).toJSON()

  expect(tree).toMatchSnapshot()
})
