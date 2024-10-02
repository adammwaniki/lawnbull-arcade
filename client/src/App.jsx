import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import LandingPage from "./components/LandingPage"
import About from "./components/AboutPage"
import MarketingPage from "./components/MarketingPage"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketing" element={<MarketingPage />} />
        </Routes>
    </div>
    </Router>
  )
}
