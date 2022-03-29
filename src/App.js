import './App.css';
import ChangePassword from './pages/changePassword/ChangePassword';
import InfoMe from './pages/info/Info';
import Login from './pages/login/Login';
import Manager from './pages/Manager/Manager';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import { userSelector } from './features/selector';


import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  const user = useSelector(userSelector)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} ></Route>
          <Route path="/register" element={(!user) ? <Register /> : <Navigate to="/"/>}></Route>
          <Route path="/login" element={(!user) ? <Login /> : <Navigate to="/"/>}></Route>
          <Route path="/password" element={(!user) ? <Login /> : <ChangePassword/>}></Route>
          <Route path="/user" element={(user) ? <InfoMe /> : <Login/>}></Route>
          <Route path="/links" element={(!user) ? <Login /> : <Manager/>}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
