import React from 'react';
import './App.scss';
import {Navbar} from './features/navbar/Navbar';
import {Feed} from './features/feed/Feed';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Feed />
    </div>
  );
}

export default App;
