import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// user
import NavBar from "./components/users/NavBar";
import Home from "./components/users/Home";
import Blog from "./components/users/Blog";
import SingUp from "./components/users/SingUp";
import Post from "./components/users/Post";
import Series from "./components/users/Series";
import Character from "./components/users/Characters";
import Footer from "./components/users/Footer";
// admin
import Dashboard from "./components/admin/Dash";
import NavBarDash from "./components/admin/NavBarDash";
import UsersList from "./components/admin/UsersList";
import ListSerie from "./components/admin/Serie/ListSerie";
import CreateSerie from "./components/admin/Serie/CreateSerie";
import UpdateSerie from "./components/admin/Serie/UpdateSerie";
import CharactersList from "./components/admin/CharactersList";
import PostList from "./components/admin/PostList";
import InquestsList from "./components/admin/InquestsList";
import PostCharacter from "./components/form/PostCharacter";
import PostPost from "./components/form/PostPost";

function App() {
  const usuario = useSelector(state => state.user);

  return (
    <>
      {usuario.role === "admin" ? (
        <div>
          <NavBarDash />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersList />} />
            <Route
              path="/series-list"
              element={<ListSerie usuario={usuario} />}
            />
            <Route
              path="/series-list/post/:id"
              element={<UpdateSerie usuario={usuario} />}
            />
            <Route
              path="/series-list/post"
              element={<CreateSerie usuario={usuario} />}
            />
            <Route path="/characters-list" element={<CharactersList />} />
            <Route path="/post-list" element={<PostList />} />
            <Route path="/inquests-list" element={<InquestsList />} />
            <Route path="/characters-list/post" element={<PostCharacter />} />
            <Route path="/post-list/post" element={<PostPost />} />
          </Routes>
        </div>
      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SingUp />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/series" element={<Series />} />
            <Route path="/blog/post/:id" element={<Post />} />
            <Route path="/characters" element={<Character />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
