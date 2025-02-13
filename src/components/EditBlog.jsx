import React, { useContext, useEffect, useState } from 'react'
import addimg from '../assets/addimg.png'
import { useLocation, useNavigate } from 'react-router-dom'
import SERVER_URL from '../services/serverUrl'
import { updateBlogAPI } from '../services/allAPI'
import { editBlogResponseContext } from '../contexs/ContexApi'


const EditBlog = () => {
  const {blogResponse,setEditBlogResponse}  = useContext(editBlogResponseContext)
   const navigate = useNavigate()
  const location =  useLocation()
  const blog = location.state?.blog;
    const [preView,setPreView] = useState("")
    const [imageFileStatus, setimageFileStatus] = useState(false)
const [blogDetails,setBlogDetails] = useState({
    id:blog._id,title:blog.title,description:blog.description,content:blog.content,category:blog.category,author:blog.author,createdAt:blog.createdAt,postMode:blog.postMode,blogImg:""
}) 
useEffect(() => {
    if (blogDetails.blogImg.type == "image/png" || blogDetails.blogImg.type == "image/jpg" || blogDetails.blogImg.type == "image/jpeg") {
      //valid image
      setimageFileStatus(true)
      setPreView(URL.createObjectURL(blogDetails.blogImg))
    } else {
      //invalid image
      setimageFileStatus(false)
      setPreView("")
      setBlogDetails({ ...blogDetails, blogImg: "" })
    }
  }, [blogDetails.blogImg])

  const handleUpdateBlog = async ()=>{
    const{id,title,description,content,category,author,postMode,createdAt,blogImg} = blogDetails
    if(title){
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("description",description)
        reqBody.append("content",content)
        reqBody.append("category",category)
        reqBody.append("author",author)
        reqBody.append("postMode",postMode)
        reqBody.append("createdAt",createdAt)
        preView? reqBody.append("blogImg",blogImg) : reqBody.append("blogImg", blog.blogImg)
        const token = sessionStorage.getItem("token")
        console.log(token);
        
        if(token){
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              }
              try {
                const result = await updateBlogAPI(id,reqBody,reqHeader)
                if(result.status==200){
                    alert("Project update successfuly")
                    navigate('/dashboard')
                    setEditBlogResponse(result)
                    
                  }
              } catch (err) {
                console.log(err);
                
              }
        }
    }else{
        alert("Please fil the data completely")
    }
  }
         
  return (
         <>
               <div className="bg-white border rounded-lg shadow relative m-10">
            
                            <div className="flex items-start justify-between p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold">
                                    {blog?.title}
                                </h3>
                            </div>
            
                            <div className="p-6 space-y-6">
                                <form action="#">
                                    <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="blog-title" className="text-sm font-medium text-gray-900 block mb-2">Blog Title</label>
                                            <input value={blogDetails.title} onChange={e=> setBlogDetails({...blogDetails,title:e.target.value})}type="text" name="blog-title" id="blog-title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ente your blog title" required="" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="blog-Author" className="text-sm font-medium text-gray-900 block mb-2">Blog Author</label>
                                            <input value={blogDetails.author} onChange={e=> setBlogDetails({...blogDetails,author:e.target.value})}type="text" name="blog-Author" id="blog-Author" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ente your blog Author" required="" />
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="title-description" className="text-sm font-medium text-gray-900 block mb-2">Title Description</label>
                                            <textarea value={blogDetails.description} onChange={e=> setBlogDetails({...blogDetails,description:e.target.value})} id="title-description" rows="3" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="Content" className="text-sm font-medium text-gray-900 block mb-2">Content</label>
                                            <textarea value={blogDetails.content} onChange={e=> setBlogDetails({...blogDetails,content:e.target.value})} id="Content" rows="8" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                                        </div>
            
            
                                        <div className="col-span-6 sm:col-span-3">
                                            <div className=" rounded-md p-4 w-full mx-auto max-w-2xl">
                                                <h4 className="text-xl lg:text-2xl font-semibold">
                                                    Select Your Category
                                                </h4>
            
                                                <div>
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Nature" checked={blogDetails.category === "Nature"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })} type="radio" name="Category" />
                                                        <i className="pl-2">Nature</i>
                                                    </label>
            
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Food" checked={blogDetails.category === "Food"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })} type="radio" name="Category" />
                                                        <i className="pl-2">Food</i>
                                                    </label>
            
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Health" checked={blogDetails.category === "Health"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}type="radio" name="Category" />
                                                        <i className="pl-2">Health</i>
                                                    </label>
            
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Love" checked={blogDetails.category === "Love"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}type="radio" name="Category" />
                                                        <i className="pl-2">Love</i>
                                                    </label>
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="LifeStyle" checked={blogDetails.category === "LifeStyle"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}type="radio" name="Category" />
                                                        <i className="pl-2">Life Style</i>
                                                    </label>
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Travel" checked={blogDetails.category === "Travel"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })} type="radio" name="Category" />
                                                        <i className="pl-2">Travel</i>
                                                    </label>
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Technology" checked={blogDetails.category === "Technology"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}type="radio" name="Category" />
                                                        <i className="pl-2">Technology</i>
                                                    </label>
                                                    <label htmlFor='category' className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3  hover:bg-indigo-300 cursor-pointer ">
                                                        <input value="Inspiration" checked={blogDetails.category === "Inspiration"} onChange={e => setBlogDetails({ ...blogDetails, category: e.target.value })}type="radio" name="Category" />
                                                        <i className="pl-2">Inspiration</i>
                                                    </label>
            
                                                </div>
                                            </div>
                                           
                                        </div>
            
            
                                        <div className="col-span-full">
                                            <label>
                                                Upload Your Blog Image Here
                                                <input onChange={e => setBlogDetails({ ...blogDetails, blogImg: e.target.files[0] })}  type="file" style={{ display: 'none' }} />
                                           {imageFileStatus &&
                                                <h2 className='text-red-700'>*Only png/jpg/jpeg files are accepted</h2>
                                                }
                                                <img height={'350px'} width={'350px'} className='img-fluid' src={preView ? preView : `${SERVER_URL}/uploads/${blog.blogImg}`} alt="blogImage" />
                                                
                                            </label>
                                            
                                            </div>
                                    </div>
                                     <div className="col-span-full">
                                                <div
                                                    className=" mx-auto px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]"
                                                >
                                                    <legend className="text-xl font-semibold mb-3 select-none">Choose One</legend>
                                                    <label htmlFor="Public" name="Public" className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
            
                                                        Public
                                                        <input value="Public" checked={blogDetails.postMode === "Public"} onChange={e => setBlogDetails({ ...blogDetails, postMode: e.target.value })} type="radio" name="status" className="w-4 h-4 absolute accent-blue-500 right-3" id="javascript"
                                                        />
                                                    </label>
            
                                                    <label htmlFor="private" name="private" className="font-medium h-14 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none">
            
                                                        private
                                                        <input value="Private" checked={blogDetails.postMode === "Private"} onChange={e => setBlogDetails({ ...blogDetails, postMode: e.target.value })} type="radio" name="status" className="w-4 h-4 absolute accent-blue-500 right-3" id="javascript"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                </form>
                            </div>
            
                            <div className="p-6 border-t border-gray-200 rounded-b">
                                <button onClick={handleUpdateBlog} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Update</button>
                            </div>
            
                        </div>
         </>
     )
}

export default EditBlog