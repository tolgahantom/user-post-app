import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
