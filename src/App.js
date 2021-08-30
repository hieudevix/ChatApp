import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoom from './components/Modal/AddRoom/AddRoom';
import InviteMember from './components/Modal/InviteMember/InviteMember';
function App() {
  return <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ChatRoom} path="/" />
        </Switch>
        <AddRoom/>
        <InviteMember/>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;
