import React from 'react';
import './App.scss';
import { RootState } from './app/store';
import { Navbar } from './features/navbar/Navbar';
import { Feed } from './features/feed/Feed';
import { useSelector, useDispatch } from 'react-redux';
import { views } from './appSlice';
import { auths } from './features/auth/authSlice';
import { Profile } from './features/profile/Profile';
import { Auth } from './features/auth/Auth';
import { Messenger } from './features/messenger/Messenger';

const renderView = (view: String) => {
  switch (view) {
    case views.FEED: return <Feed />
    case views.PROFILE: return <Profile />
    case views.MESSENGER: return <Messenger />
    default: return <Feed />
  }
}

function App() {
  const view = useSelector((state: RootState) => state.app.value)
  const auth = useSelector((state: RootState) => state.auth.value)

  return (
    <div className="App">
      {(auth === auths.DISCONNECTED && <Auth />) || <div className="h-100 w-100"><Navbar /> {renderView(view)}</div>}
    </div>
  )
}

export default App;
