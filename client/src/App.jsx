import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/collapse';

import NavBar from './components/NavBar';
import TodoBin from './components/TodoBin';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Link to="/todos">
            <div className="d-grid mt-2 mx-2 ">
              <button type="button" className="btn btn-primary p-3 fs-1">Create new todo</button>
            </div>
          </Link>
        </Route>
        <Route exact path="/todos">
          <TodoBin />
        </Route>
        <Route path="/todos/:todosId">
          <TodoBin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
