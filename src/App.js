import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import ScrollToTop from "components/ScrollToTop"
import GA from "services/ga"

import Nav from "./components/Nav"

const View = React.lazy(() => import("scenes/View"))
const About = React.lazy(() => import("scenes/About"))
const Contact = React.lazy(() => import("scenes/Contact"))

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <Nav />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={View} />
              <Route path="/about" exact component={About} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/:id" exact component={View} />
            </Switch>
          </ScrollToTop>
        </Router>
      </React.Suspense>
    </>
  )
}
