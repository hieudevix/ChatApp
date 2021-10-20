import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoom from './components/Modal/AddRoom/AddRoom';
import InviteMember from './components/Modal/InviteMember/InviteMember';
import CovidTracker from './components/CovidTracker/CovidTracker';
function App() {
  return <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={ChatRoom} path="/" />
          <Route exact component={CovidTracker} path="/covid" />
        </Switch>
        <AddRoom />
        <InviteMember />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
