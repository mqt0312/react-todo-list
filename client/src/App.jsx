import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
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
        <Route path="/todos/:todosId">
          <TodoBin />
        </Route>
        <Route path="/todos">
          <TodoBin />
        </Route>
      </Switch>
      
    </Router>
    
  );
}

export default App;
