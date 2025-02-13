import React, { useContext, useEffect, useState } from 'react'
import addImg from '../assets/addimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { getUserBlogsApi, removeBlogAPI } from '../services/allAPI'
import SERVER_URL from '../services/serverUrl'
import { editBlogResponseContext } from '../contexs/ContexApi'


const Dashboard = () => {
  const navigate = useNavigate()
  const { blogResponse, setEditBlogResponse } = useContext(editBlogResponseContext)
  const [username, setUsername] = useState('')
  const [userBlogs, setUserBlogs] = useState([])
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu visibility on small screens
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUsername(JSON.parse(sessionStorage.getItem("user")).username)
    } else {
      setUsername("")
    }
  }, [blogResponse])
  console.log(userBlogs);

  useEffect(() => {
    getUserBlogs()
  }, [])
  const getUserBlogs = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getUserBlogsApi(reqHeader)
        if (result.status == 200) {
          setUserBlogs(result.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  const deleteBlog = async (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        await removeBlogAPI(id, reqHeader)
        getUserBlogs()
      } catch (err) {
        console.log(err);

      }
    }
  }
  const logOut = () => {
    sessionStorage.clear()
    navigate("/")
  }
  return (
    <>



      <div className='px-20 bg-gray-900'>
        <nav className="className= sticky top-8 rounded-full bg-black shadow p-4 ">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-bold">
              <img src="https://neon.gbjsolution.com/content/images/2022/12/logo-light.svg" alt="" />
            </div>

            {/* Nav Items */}
            <div className="hidden md:flex space-x-6">
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer">Home</button>
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer">All Blogs</button>
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer"> Tags</button>
                <button onClick={logOut} className="mr-5 text-white hover:text-pink-600 cursor-pointer"> LogOut</button>

              </nav>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
              <a href="/" className="block hover:text-pink-600">Home</a>
              <a href="/about" className="block hover:text-pink-600">About</a>
              <a href="/services" className="block hover:text-pink-600">Services</a>
              <a href="/contact" className="block hover:text-pink-600">Contact</a>
            </div>
          )}
        </nav>
        <main className="text-white">
          <section className=" md:pt-40 mb-5">
            <div className="container mx-auto px-8 lg:flex">
              <div className="text-center lg:text-left lg:w-1/2">
                <div className="p-2 rounded-lg ">
                  <div
                    className="py-8 px-8 max-w-sm mx-auto bg-grey-800 border rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <img className="block mx-2 w-24 h-24 rounded-full sm:mx-0 sm:shrink-0" src={addImg} alt="Woman's Face" />
                    <div className="text-center space-y-2 ms-2 sm:text-left">
                      <div className="space-y-0.5">
                        <p className="text-lg text-white font-semibold">
                          {username}
                        </p>
                        <p className="text-slate-400 font-medium">
                          About
                        </p>
                        <Link to={'/updateProfile'} className='text-pink-700 font-bold'>Edit Profile</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col">
                <button className="flex justify-center m-2 items-center font-bold bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-900 rounded text-base mt-4 md:mt-0"><Link to={'/uploadBlog'}>Upload New Blog</Link> </button>
                <button className="flex justify-center m-2 items-center font-bold bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-900 rounded text-base mt-4 md:mt-0"> <Link to={'/blogs'}>View All Blogs</Link></button>
                <button className="flex justify-center m-2 items-center font-bold bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-pink-900 rounded text-base mt-4 md:mt-0"> <Link to={'/updateProfile'}>Update Profile</Link></button>

              </div>
            </div>
          </section>
        </main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            userBlogs?.length > 0 ?
              userBlogs?.map(singleBlog => (

                <div className="bg-gray-800 text-white rounded-lg shadow-md p-3">
                  <Link to={{ pathname: `/postDetails/${singleBlog._id}`, }}
                    state={{ blog: singleBlog }} >
                    <img src={`${SERVER_URL}/uploads/${singleBlog.blogImg}`} alt="Card Image 1" className="w-full h-52 object-cover rounded-md" />

                  </Link>
                  <div className='flex flex-row justify-between items-center'>
                    <h2 className=" text-lg font-semibold text-white">{singleBlog?.title}</h2>
                    <div className='flex flex-col text-end p-2'>
                      <Link to={{ pathname: `/editBlog/${singleBlog._id}`, }}
                        state={{ blog: singleBlog }} className="text-lg font-semibold text-white">edit</Link>
                      <Link onClick={() => deleteBlog(singleBlog?._id)} className="text-lg font-semibold text-white"><i className="fa-solid fa-trash"></i></Link>
                    </div>
                  </div>
                  <p className="line-clamp-2 mt-2">{singleBlog?.description}</p>
                </div>




              )) :
              <div className="text-red-700 font-semibold">You have no blogs!!!</div>
          }
        </div>
        <div className="w-full mt-4 h-full">
          <footer className="w-full h-fit bg-black text-white relative bottom-0">
            <div className="w-full mx-auto sm:px-10 px-4 pb-10">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-start pt-12">

                <div className="mt-4">
                  <div className="flex-1 flex justify-between items-center sm:w-[10rem] xs:w-[7rem] z-10">
                    <img className="" src="https://neon.gbjsolution.com/content/images/2022/12/logo-light.svg" alt="Logo" />
                  </div>
                  <p className="mt-4">Get the latest posts delivered straight to your inbox.</p>

                  <div className="flex gap-2 items-center text-2xl text-white mt-6">
                    <div className="flex items-center justify-center p-3 border rounded-full hover:bg-blue-500">
                      <i className="fa-brands fa-facebook"></i>
                    </div>
                    <div className="flex items-center justify-center p-3 border rounded-full hover:bg-pink-500">
                      <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div className="flex items-center justify-center p-3 border rounded-full hover:bg-green-500">
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div className="flex items-center justify-center p-3 border rounded-full hover:bg-red-900">
                      <i className="fa-brands fa-youtube"></i>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-white text-3xl font-semibold mb-8">Latest News and Blogs</h2>
                  <div className="w-full flex flex-col mt-6">
                    <div className="w-full flex gap-4">
                      <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                      <div className="flex flex-col items-start">
                        <h3 className="xs:text-lg text-sm font-semibold">AI-Powered Chips Revolutionize Cloud
                          Computing</h3>
                        <p className="text-sm text-gray-500">Nov 17, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="bg-gray mt-14" />

              <div style={{ cursor: 'pointer' }} className="w-full flex gap-2 flex-row items-center justify-between py-4">
                <p>© 2025 Neon - All right Reserved. Proudly Published with Ghost</p>
                <a> Back to top</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

    </>
  )
}

export default Dashboard