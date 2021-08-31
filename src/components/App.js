import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
