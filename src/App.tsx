import React from 'react';
import './App.scss';
import { RootState } from './app/store';
import { Navbar } from './features/navbar/Navbar';
import { Feed } from './features/feed/Feed';
import { useSelector, useDispatch } from 'react-redux';
import { views } from './appSlice';
import { Profile } from './features/profile/Profile';

const renderView = (view: String) => {
  switch (view) {
    case views.FEED: return <Feed />
    case views.PROFILE: return <Profile />
    default: return <Feed />
  }
}

function App() {
  const view = useSelector((state: RootState) => state.app.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Navbar />
      {renderView(view)}
    </div>
  )
}

export default App;
