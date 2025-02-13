import React, { createContext, useState } from 'react'
export const allBlogDisplayResponseContext = createContext()
export const editBlogResponseContext = createContext()


const ContexApi = ({children}) => {
const [allBlogDisplay,setAllBlogDisplay] = useState("")
const [blogResponse,setEditBlogResponse] = useState("")
  return (
   <editBlogResponseContext.Provider value={{blogResponse,setEditBlogResponse}}>
      <allBlogDisplayResponseContext.Provider value={{allBlogDisplay,setAllBlogDisplay}}>
      {children}
      </allBlogDisplayResponseContext.Provider>
   </editBlogResponseContext.Provider>
  )
}

export default ContexApi