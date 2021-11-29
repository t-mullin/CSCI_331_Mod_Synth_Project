
// import './App.css';
import { BrowserRouter as Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PresetsList from "./components/presets-list.component";
import SelectPreset from "./components/select-preset.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Routes>
      <Navbar />
      <br/>
      <Route path="/" exact component={PresetsList} />
      <Route path="/:id" component={SelectPreset} />
      <Route path="/user" component={CreateUser} />
    </Routes>
  );
}

export default App;
