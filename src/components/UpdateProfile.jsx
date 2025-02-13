import React, { useEffect, useState } from 'react'
import addimg from '../assets/addimg.png'
import SERVER_URL from '../services/serverUrl'
import { userProfileEditApi } from '../services/allAPI'
const UpdateProfile = () => {
    const [preView, setPreView] = useState("")
    const [existingProfilePic, setExistingProfilePic] = useState("")
    const [userDetails, setUserDetails] = useState({
        username: "", email: "", password: "", about: "", profilePic: ""
    })
    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({
                ...userDetails, username: user.username, email: user.email, password: user.password, about: user.about
            })
            setExistingProfilePic(user.profilePic)
        }
    }, [])
    useEffect(() => {
        if (userDetails.profilePic) {
            setPreView(URL.createObjectURL(userDetails.profilePic))
        } else {
            setPreView("")
        }
    }, [userDetails.profilePic])
    const handleupdateProfile = async () => {
        const { username, email, password, about, profilePic } = userDetails
        if (username) {
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("about",about)
            preView ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfilePic)
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader = {
                     "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                try {
                    const result = await userProfileEditApi(reqBody,reqHeader)
                    if(result.status==200){
                        alert("User Profile Updated Successfully")
                        sessionStorage.setItem("user",JSON.stringify(result.data))
                    }
                    else{
                        console.log(result);
                        
                    }
                } catch (err) {
                    console.log(err);
                    
                }
            }

        } else {
            alert("Please fil the about section and profile image")
        }
    }
    return (
        <>
            <div className="bg-white border rounded-lg shadow relative m-10">

                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        User Details
                    </h3>
                </div>

                <div className="p-6 space-y-6">
                    <form action="#">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="userName" className="text-sm font-medium text-gray-900 block mb-2">User Name</label>
                                <input value={userDetails.username} onChange={e => setUserDetails({ ...userDetails, username: e.target.value })} type="text" name="userName" id="userName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ente your blog title" required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                <input value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ente your email" required="" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Password</label>
                                <input value={userDetails.password} onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="text" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Ente your password" required="" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="text-sm font-medium text-gray-900 block mb-2">About</label>
                                <textarea value={userDetails.about} onChange={e => setUserDetails({ ...userDetails, about: e.target.value })} rows="3" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Details"></textarea>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <div className="col-span-full">
                                    <label>
                                        Upload Your Blog Image Here
                                        <input onChange={e => setUserDetails({ ...userDetails, profilePic: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                                        {existingProfilePic == "" ?

                                            <img height={'305px'} width={'350px'} className='img-fluid' src={preView ? preView : addimg} alt="" />

                                            : <img height={'305px'} width={'350px'} className='img-fluid' src={preView ? preView : `${SERVER_URL}/uploads/${existingProfilePic}`} alt="" />
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-200 rounded-b">
                    <button onClick={handleupdateProfile} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Save all</button>
                </div>

            </div>

        </>
    )
}

export default UpdateProfile