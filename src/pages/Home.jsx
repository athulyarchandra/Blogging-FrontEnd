import React, { useEffect, useState } from 'react'
import boat from '../assets/image.png'
import inspiration from '../assets/inspiration.png'
import lifeStyle from '../assets/lifeStyle.png'
import health from '../assets/health.png'
import travel from '../assets/travel.png'
import food from '../assets/food.png'
import tech from '../assets/tech.png'
import love from '../assets/love.png'
import nature from '../assets/nature.png'
import { Link, useNavigate } from 'react-router-dom';
import { homeBLogsAPI } from '../services/allAPI'



const Home = () => {
  const [allHomeBlogs,setAllHomeBlogs] = useState([])
    const [isOpen, setIsOpen] = useState(false);
  
  
  useEffect(()=>{
    getALLHomeBlogs()
  },[])
    // Toggle menu visibility on small screens
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
const getALLHomeBlogs = async ()=>{
  try {
    const result = await homeBLogsAPI()
    if(result.status==200){
      setAllHomeBlogs(result.data)
    }
  } catch (err) {
    console.log(err);
    
  }
  console.log(allHomeBlogs);
  
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
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer">Features</button>
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer">About</button>
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer"> Tags</button>
                <button className="mr-5 text-white hover:text-pink-600 cursor-pointer"> Contact</button>
                {  
        sessionStorage.getItem("token")?
          <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"><Link to={'/dashboard'}>Your Dashboard</Link> </button>
           :
            <button className="inline-flex items-center bg-pink-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"><Link to={'/login'}> Become A Member</Link></button>
          }

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
          <section className="pt-20 md:pt-40">
            <div className="container mx-auto px-8 lg:flex">
              <div className="text-center lg:text-left lg:w-1/2">
                <div className="p-2 rounded-lg ">
                  <span className="inline-block bg-pink-600 text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
                    Travel
                  </span>
                  <h1 className="text-4xl font-extrabold text-white mb-4">
                    Never let your memories be greater than your dreams
                  </h1>
                  <p className="text-lg text-gray-300 mb-4">
                    Before long the searchlight discovered some distance away a schooner with all sails set, apparently the same vessel which had been noticed earlier in the evening....
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4"> <i className="fa-regular fa-calendar-days px-0.5"></i> May 2, 2022</span>
                    <span><i className="fa-solid fa-thumbs-up px-0.5"></i>10K Likes</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">

                <div className=" rounded-lg overflow-hidden shadow-lg bg-gray-800 border-gray-800 border-8" >
                  <img src={boat} alt="Boat Under Stars" className="hover:scale-125 transition-all duration-500 w-2xl object-cover" />
                </div>

              </div>
            </div>
          </section>
        </main>

        <div className="container mx-auto mt-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-8/12 px-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex justify-center items-center rounded border-gray-600 border-8  text-left">
                    <img className='rounded' src={boat} alt="" />
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="text-center lg:text-left ">
                      <div className="p-2 rounded-lg ">
                        <span className="inline-block bg-pink-600 text-white text-sm font-medium py-1 px-3 rounded-full mb-4">
                          Travel
                        </span>
                        <h1 className="text-4xl font-extrabold text-white mb-4">
                          Never let your memories be greater than your dreams
                        </h1>
                        <p className="text-lg text-gray-300 mb-4">
                          Before long the searchlight discovered some distance away a schooner with all sails set, apparently the same vessel which had been noticed earlier in the evening....
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-4"> <i className="fa-regular fa-calendar-days px-0.5"></i> May 2, 2022</span>
                          <span><i className="fa-solid fa-thumbs-up px-0.5"></i>10K Likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="w-full md:w-4/12 px-4 mb-8">
              <div className="px-4 py-6 rounded bg-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">Featured Post </h3>
                <div className="mt-4">
                  <div className="w-full flex flex-col mt-6">
                    <div className="w-full flex gap-4">
                      <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                      <div className="flex flex-col items-start">
                        <h3 className="xs:text-lg text-sm text-white font-semibold">AI-Powered Chips Revolutionize Cloud
                          Computing</h3>
                        <p className="text-sm text-gray-500"><i className="fa-regular fa-calendar-days px-0.5" /> Nov 17, 2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-col mt-6">
                    <div className="w-full flex justify-start gap-4">
                      <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                      <div className="flex flex-col items-start">
                        <h3 className="xs:text-lg text-sm text-white font-semibold">Tesla Unveils Solar Roofs 3.0: Efficiency
                          Boost of 20%
                        </h3>
                        <p className="text-sm text-gray-500"><i className="fa-regular fa-calendar-days px-0.5" /> Nov 17, 2024</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-col mt-6">
                    <div className="flex justify-start gap-4">
                      <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                      <div className="flex flex-col gap-2 items-start">
                        <h3 className="xs:text-lg text-sm text-white font-semibold">OpenAI Releases GPT-5 with Enhanced
                          Creativity
                          Features</h3>
                        <p className="text-sm text-gray-500"><i className="fa-regular fa-calendar-days px-0.5" /> Nov 17, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="our-team" className="bg-gray-900 py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Tags</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
              <img src={inspiration} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Inspiration</h3>
                <p className="text-white">0 Posts</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
             <img src={nature} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Nature</h3>
                <p className="text-white">0 projects</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
              <img src={lifeStyle} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Life Style</h3>
                <p className="text-white">0 project</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
             <img src={health} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Health</h3>
                <p className="text-white">0 project</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
              <img src={travel} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Travel</h3>
                <p className="text-white">0 project</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
             <img src={food} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Food</h3>
                <p className="text-white">0 project</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
              <img src={tech} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Technology</h3>
                <p className="text-white">0 project</p>
            </div>

            <div className="bg-black text-white rounded-lg shadow-md p-6 my-6 text-left">
             <img src={love} alt="Team " className="w-full h-44 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Love</h3>
                <p className="text-white">0 project</p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-full">
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
                <div className="w-full flex flex-col mt-6">
                  <div className="w-full flex justify-start gap-4">
                    <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                    <div className="flex flex-col items-start">
                      <h3 className="xs:text-lg text-sm font-semibold">Tesla Unveils Solar Roofs 3.0: Efficiency
                        Boost of 20%
                      </h3>
                      <p className="text-sm text-gray-500">Nov 17, 2024</p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col mt-6">
                  <div className="flex justify-start gap-4">
                    <img className="lg:w-[8rem] lg:h-[5rem] md:w-[6rem] md:h-[4rem] xs:w-[8rem] xs:h-[5rem] w-[6rem] h-[3rem] rounded-sm xs:outline xs:outline-[4px]" src="https://images.unsplash.com/photo-1568209865332-a15790aed756?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWljcm9jaGlwfGVufDB8MHx8fDE3MzE4Mjg5MDl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image" />
                    <div className="flex flex-col gap-2 items-start">
                      <h3 className="xs:text-lg text-sm font-semibold">OpenAI Releases GPT-5 with Enhanced
                        Creativity
                        Features</h3>
                      <p className="text-sm text-gray-500">Nov 17, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-4 lg:pl-6">
                <h4 className="text-white text-3xl font-semibold mb-6">Newsletter</h4>
                <p className="text-white mb-7">Join our subscribers list to get the latest news, updates and special
                  offers directly in your inbox</p>
                <div className="w-full flex justify-center items-center rounded bg-gray-700">
                  <input type="text" className="w-full h-full pl-4 text-gray-200 bg-gray-700 lg:text-left placeholder:text-gray-400 focus:outline-none focus:border-gray-500" placeholder="Email" />
                  <button type="submit" className="h-full py-3 xs:px-6 px-2 bg-pink-600 transition-all duration-500 shadow-md rounded-r text-sm text-white font-semibold w-fit hover:bg-fontOrange">Subscribe</button>
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
        </>
    )
}

export default Home