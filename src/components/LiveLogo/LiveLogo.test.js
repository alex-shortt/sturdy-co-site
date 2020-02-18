import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"

import LiveLogo from "./index"

it("renders correctly", () => {
  const tree = renderer.create(<LiveLogo />).toJSON()

  expect(tree).toMatchSnapshot()
})
