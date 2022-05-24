import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
      </div>
    </Router>
  );
}

export default App;
