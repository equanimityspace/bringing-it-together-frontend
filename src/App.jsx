import { Routes, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { SingleUser } from "./components/SingleUser";

function App() {
  <>
    <Routes>
      {/* No login needed */}
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />

      {/* must be logged in */}
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<SingleUser />} />
    </Routes>
  </>;
}

export default App;
