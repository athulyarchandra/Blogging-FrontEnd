import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import PostDetails from './pages/PostDetails'
import Home from './pages/Home'
import MyBlogs from './pages/MyBlogs'
import Blogs from './pages/Blogs'
import UploadBlog from './components/UploadBlog'
import UpdateProfile from './components/UpdateProfile'
import EditBlog from './components/EditBlog'
import Pnf from './pages/Pnf'


function App() {

  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/postDetails/:id' element={<PostDetails/>} />
    <Route path='/myPosts' element={<MyBlogs/>} />
    <Route path='/login' element={<Auth/>} />
    <Route path='/register' element={<Auth insideRegister={true}/>} />
    <Route path='/blogs' element={<Blogs/>} />
    <Route path='/editBlog/:id' element={<EditBlog/>} />
    <Route path='/updateProfile' element={<UpdateProfile/>}/>
    <Route path='/uploadBlog' element={<UploadBlog/>} />
    <Route path='*' element={<Pnf/>} />
    
    </Routes>

    </>
  )
}

export default App