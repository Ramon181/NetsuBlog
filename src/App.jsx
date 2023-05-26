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
          </Routes>

        </div>) :
          (<>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<SingUp />} />
            </Routes>
          </>)
      }
    </>

  )
}

export default App
