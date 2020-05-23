import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';



function App() {
  return (
    <BrowserRouter>
      <Route exact path='/'>
        <Signin />
      </Route>
      <Route path='/home/:id'><Home /></Route>
      <Route path='/signin'><Signin /></Route>
      <Route path='/signup'><Signup /></Route>
    </BrowserRouter>
  );
}

export default App;
