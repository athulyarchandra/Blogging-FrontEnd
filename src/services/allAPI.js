import commonApi from "./commonAPI";
import SERVER_URL from "./serverUrl";

//register called by login component when user click register btn
export const registerAPI = async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/register`,reqBody)
}
//login
export const loginAPI = async(reqBody)=>{
    return await commonApi("POST",`${SERVER_URL}/login`,reqBody)
}
//userProfileEdit
export const userProfileEditApi = async(reqBody,reqHeade)=>{
    return await commonApi("GET",`${SERVER_URL}/edit-user`,reqBody,reqHeade)
}
//addBlogAPi
export const addBlogAPi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${SERVER_URL}/create-blog`,reqBody,reqHeader)
}
//getAllHomeBlogs
export const homeBLogsAPI = async()=>{
    return await commonApi("GET",`${SERVER_URL}/home-blogs`)
}
//getAllBlogs
export const getAllBlogsApi = async(searchKey,reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/get-AllBlogs?search=${searchKey}`,{},reqHeader)
}
//getUserBlogs
export const getUserBlogsApi = async(reqHeader)=>{
    return await commonApi("GET",`${SERVER_URL}/user-blogs`,{},reqHeader)
}
//getSingleBlogAPI
export const getSingleBlogAPI = async (id,reqHeader) => {
    return await commonApi("GET", `${SERVER_URL}/blogs/${id}/singleBlog`,{}, reqHeader);   
}
//updateBlogAPI called by edit component when when user click update button  projects/672c77d98e67974867e5744d/edit
export const updateBlogAPI = async (id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${SERVER_URL}/blogs/${id}/edit`,reqBody,reqHeader)
}
//deleteBlog
export const removeBlogAPI = async(id,reqHeader)=>{
    return await commonApi("DELETE",`${SERVER_URL}/blogs/${id}/remove`,{},reqHeader)
}