import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Particles from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Particles />).toJSON()

  expect(tree).toMatchSnapshot()
})
