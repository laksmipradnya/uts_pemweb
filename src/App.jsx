import { Routes, Route } from "react-router-dom";

import "antd/dist/reset.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./assets/styles/adaptive.css";

import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Download from "./pages/Download/Download";
import Genre from "./pages/Genre/Genre";
import Koleksi from "./pages/Koleksi/Koleksi";
import Playlist from "./pages/Playlist/Playlist"; 
import PrivateRoute from "./components/layout/PrivateRoute";

import Blank from "./pages/Blank";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
        <Route
          exact
          path="/genre"
          element={<PrivateRoute component={<Genre />} />}
        />
        <Route
          exact
          path="/koleksi"
          element={<PrivateRoute component={<Koleksi />} />}
        />
        <Route
          exact
          path="/download"
          element={<PrivateRoute component={<Download />} />}
        />
        <Route
          exact
          path="/profile"
          element={<PrivateRoute component={<Blank />} />}
        />
        <Route
          exact
          path="/playlist"
          element={<PrivateRoute component={<Playlist />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
