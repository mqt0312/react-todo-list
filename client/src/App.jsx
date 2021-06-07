import logo from './logo.svg';
import './App.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/collapse';


import NavBar from './components/NavBar';
import TodoBin from './components/TodoBin';



function App() {
  
  return (
    <div className="App">
      <NavBar />
      <TodoBin />
    </div>
  );
}

export default App;
