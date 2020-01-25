import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Nav from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Nav />).toJSON()

  expect(tree).toMatchSnapshot()
})
