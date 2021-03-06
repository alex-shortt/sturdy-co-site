import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import useReactRouter from "use-react-router"

import GlobalStyles from "styles/globalStyles"
import FullScreenLoading from "components/FullScreenLoading"
import ScrollToTop from "components/ScrollToTop"
import GA from "services/ga"

import Nav from "./components/Nav"

const View = React.lazy(() => import("scenes/View"))
const About = React.lazy(() => import("scenes/About"))

const GoogleAnalytics = () => {
  const { location } = useReactRouter()
  useEffect(() => GA.pageview(location.pathname), [location])
  return <> </>
}

export default function App() {
  const [skipIntro, setSkipIntro] = useState(false)
  const [printedCredits, setPrintedCredits] = useState(false)

  const hideIntro = () => setSkipIntro(true)

  useEffect(() => {
    if (!printedCredits) {
      printCredits()
      setPrintedCredits(true)
    }
  }, [printedCredits])

  return (
    <>
      <GlobalStyles />
      <React.Suspense fallback={<FullScreenLoading />}>
        <Router>
          <GoogleAnalytics />
          <Nav />
          <ScrollToTop>
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <View
                    {...props}
                    skipIntro={skipIntro}
                    hideIntro={hideIntro}
                  />
                )}
              />
              <Route
                path="/about"
                exact
                render={props => <About {...props} onLoad={hideIntro} />}
              />
              <Route
                path="/:id"
                exact
                render={props => <View {...props} onLoad={hideIntro} />}
              />
            </Switch>
          </ScrollToTop>
        </Router>
      </React.Suspense>
    </>
  )
}

function printCredits() {
  const credits = `
  
   ______     ______   __  __     ______     _____     __  __       
  /\\  ___\\   /\\__  _\\ /\\ \\/\\ \\   /\\  == \\   /\\  __-.  /\\ \\_\\ \\      
  \\ \\___  \\  \\/_/\\ \\/ \\ \\ \\_\\ \\  \\ \\  __<   \\ \\ \\/\\ \\ \\ \\____ \\     
   \\/\\_____\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\____-  \\/\\_____\\    
    \\/_____/     \\/_/   \\/_____/   \\/_/ /_/   \\/____/   \\/_____/    

  Website by Alex Shortt
      https://instagram.com/alexander.shortt
      https://twitter.com/_alexshortt
  `
  console.log(credits)
}
