import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import RecipeCreate from "./Components/RecipeCreate";
import Detail from "./Components/Detail.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/recipe" exact component={RecipeCreate} />
        <Route path="/home/:id" component={Detail} />
      </Router>
    </div>
  );
}

export default App;
