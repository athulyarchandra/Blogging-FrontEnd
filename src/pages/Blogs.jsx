import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllBlogsApi } from '../services/allAPI';
import SERVER_URL from '../services/serverUrl';
import { allBlogDisplayResponseContext } from '../contexs/ContexApi';

const Blogs = () => {
 const {allBlogDisplay,setAllBlogDisplay} = useContext(allBlogDisplayResponseContext)
  const [searchKey, setSearchKey] = useState('')
  const [allBlogs, setAllBlogs] = useState([])
  console.log(allBlogs);
  useEffect(() => {
    getallBlogs()
  }, [searchKey,allBlogDisplay])
  const getallBlogs = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllBlogsApi(searchKey, reqHeader)
        if (result.status == 200) {
          setAllBlogs(result.data)
        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  return (
    <>

      <div className='px-20 py-10 bg-gray-900'>
        <div className="relative w-full max-w-xl mx-auto mt-5 bg-white rounded-full">
          <input onChange={e => setSearchKey(e.target.value)} placeholder="Search by category eg.Travel" className="rounded-full w-full h-16 bg-transparent py-2 pl-4 pr-18 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-pink-200 focus:border-pink-200" type="text" name="query" id="query" />
          <button type="submit" className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-pink-600 sm:px-6 sm:text-base sm:font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-2 focus:ring-pink-600">
            Search
          </button>
        </div>
        <h1 className='text-center text-pink-600 mb-4 text-4xl '>Our Blogs</h1>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            allBlogs?.length > 0 ?
              allBlogs?.map(singleBlog => (
                <div className="bg-gray-800 text-white rounded-lg shadow-md p-3">
                <Link to={'/postDetails'}>
                  <img src={`${SERVER_URL}/uploads/${singleBlog.blogImg}`} alt="Card Image 1" className="w-full h-52 object-cover rounded-md" />
                   <div className='flex flex-row justify-between items-center'>
                  <h2 className="text-lg font-semibold text-white">{singleBlog?.title}</h2>
                  <div className='flex flex-col text-end p-2'>
                  <span className="inline-block bg-pink-600 text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
                    {singleBlog.category}
                  </span>                  </div>
                </div>
                <p className="line-clamp-3 mt-2">{singleBlog?.description}</p>
                </Link>
              </div>
              )) 
              :
              <h2 className="text-lg font-semibold text-red-700">No blogs found!!!</h2>

          }
        </div>

      </div>


    </>
  )
}

export default Blogs