import { Route, Routes } from 'react-router-dom'
import Home from './components/users/Home'
import NavBar from './components/users/NavBar'
import './App.css'
import SingUp from './components/users/SingUp'
import { useSelector } from 'react-redux'
import Dashboard from './components/admin/Dash'
import NavBarDash from './components/admin/NavBarDash'
import SeriesList from './components/admin/SeriesList'
import CharactersList from './components/admin/CharactersList'
import UsersList from './components/admin/UsersList'
import PostList from './components/admin/PostList'
import InquestsList from './components/admin/InquestsList'
import PostSerie from './components/form/PostSerie'
import PostCharacter from './components/form/PostCharacter'
import PostPost from './components/form/PostPost'
import Footer from './components/users/Footer'
import Blog from './components/users/Blog'
import Post from './components/users/Post'

function App() {

  const user = useSelector(state => state.user)

  return (
    <>
      {
        user.role === 'admin' ? (<div>
          <NavBarDash />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/series-list' element={<SeriesList />} />
            <Route path='/characters-list' element={<CharactersList />} />
            <Route path='/users' element={<UsersList />} />
            <Route path='/post-list' element={<PostList />} />
            <Route path='/inquests-list' element={<InquestsList />} />
            <Route path="/series-list/post" element={<PostSerie/>} />
            <Route path='/characters-list/post' element={<PostCharacter/>} />
            <Route path='/post-list/post' element={<PostPost/>} />
          </Routes>

        </div>) :
          (<>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<SingUp />} />
              <Route path='/blog' element={<Blog/>}/>
              <Route path="/blog/post/:id" element={<Post/>} />
            </Routes>
            <Footer/>
          </>)
      }
    </>

  )
}

export default App
