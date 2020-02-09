import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import Client from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<Client />).toJSON()

  expect(tree).toMatchSnapshot()
})
