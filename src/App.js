import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { getAuth, onAuthStateChanged } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXclzMEYt1VbLU3qzAO3tN0mboUcJ6n1c",
  authDomain: "homefirst-889d8.firebaseapp.com",
  projectId: "homefirst-889d8",
  storageBucket: "homefirst-889d8.appspot.com",
  messagingSenderId: "700671267859",
  appId: "1:700671267859:web:8e02a31337d3d14ba2dbe6"
};

initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/todo" component={TodoList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
