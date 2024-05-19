import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import UserContext from './components/Context/UserContext';
import AddMoviePage from './pages/AddMoviePage/AddMoviePage';
import MovieDetails from './components/MovieDetails/MovieDetails.jsx';


function App() {
  const [user, setUser] = useState('Anonyme');

  const userSettings = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userSettings}>
      <Root>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="counter" element={<Counter />} />
          <Route path="users" element={<Users />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="add_movies" element={<AddMoviePage />} />
          <Route path="about" element={<About />} />
          <Route path="/movie/:id" element={<MovieDetails />}/>
        </Routes>
      </Root>
    </UserContext.Provider>
  );
}

export default App;
