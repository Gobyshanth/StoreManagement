import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminControl } from "./Admin/AdminControl";
import Admins from "./Admin/Admins";
import { Provider } from "react-redux";
import store from "./Redux/Store";  // இது உங்கள் store file ஆக இருக்க வேண்டும்
import Login from "./Login/Login";
import Home from "./Components/Home/Home";
import Footer from "./Components/Fotter/Footer";

function App() {
  return (
    <Provider store={store}>  {/* wrap your app with Provider */}
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Admins />} />
          <Route path="/Admin" element={<AdminControl />} />
        </Routes>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
