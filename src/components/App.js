import "../styles/App.css";
import ResultsPage from "./ResultsPage";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        {/* Error page */}
        <Route path="*"></Route>
      </Switch>
    </Router>
  );
};

export default App;
