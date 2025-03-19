"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { FaBarsStaggered } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";


interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li className="menu-item">
      <Link href={href || "#"}>
        <span className="menu-text">{children}</span>
      </Link>
    </li>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev)
  }



  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className=" w-full md:w-[87%] flex top-0 z-50 border-0 fixed">
        {/* MOBILE VIEW NAV BAR */}
        <div className="navbar text-white py-3 lg:hidden items-center" style={{ background: 'radial-gradient(circle, #195B41, #101916)' }}>
          <div className="lg:hidden">
            <div className="dropdown flex justify-evenly w-[100vw] items-center lg:hidden">


              <FaBarsStaggered style={{ display: open ? 'none' : 'block' }} onClick={handleToggle} size={15} />
              <GiCancel style={{ display: open ? 'block' : 'none' }} onClick={handleToggle} size={17} />

              <Image alt="SoMaker" width={100} height={70} src="/logos/somaker-logo.svg" />
              <button className="rounded-[30px] w-auto text-white text-[0.8rem] hover:border-gray-700 border-white border-[0.5px] py-3 px-4 lg:hidden hover:bg-gray-700">Get started</button>




              <ul
                className={`${open ? "max-h-96" : "max-h-0"
                  } overflow-hidden transition-all duration-500 transform ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  } bg-white rounded-b-lg top-[7vh] absolute lg:hidden z-[1] mt-3 w-[100%] p-2 shadow py-3`}
              >
                <li><Link href="#">
                  <button
                    className="font-medium flex items-center p-2"
                    style={{ color: "black" }}
                  >
                    Home

                  </button>
                </Link></li>
                <li>
                  <details>
                    <summary><Link href="/signup-form">
                      <button
                        className="font-medium flex items-center p-2"
                        style={{ color: "black" }}
                      >
                        Leaderboard 

                      </button>
                    </Link></summary>
                  </details>
                </li>

                <li>
                  <details>
                    <summary><Link href="/">
                      <button
                        className="font-medium flex items-center p-2"
                        style={{ color: "black" }}
                      >
                        Games

                      </button>
                    </Link></summary>
                  </details></li>

                
                <div className="mt-5 flex w-full justify-evenly items-center gap-x-10">

                  <i className="fa-brands fa-twitter text-base text-green-600" />

                  <i className="fa-brands fa-facebook text-base text-green-600" />

                  <i className="fa-brands fa-instagram text-base text-green-600" />

                </div>
              </ul>

            </div>




          </div>
        </div>
        {/* MOBILE NAV BAR ENDS HERE */}

        {/* WEB RESPONSIVENESS */}
        <div className="navbar text-white py-3 hidden lg:flex rounded-b-[35px] px-10 items-center" style={{ background: 'radial-gradient(circle, #195B41, #101916)' }}>
          <div className="navbar-start">
            <Link className="btn mt-5 btn-ghost hidden lg:block text-xl ml-5" href="/">
              <Image alt="somaker_logo" width={50} height={5} src="/logo.png" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="font-medium flex items-center"
                    style={{ color: "white" }}>
                   Home
                  </summary>
                  
                </details></li>


              <li>
                <Link href="/signup-form" className="font-medium flex items-center"
                  style={{ color: "white" }}>

                  Leaderboard 


                </Link>

              </li>

              <li>
                <Link href="/signup-form" className="font-medium flex items-center"
                  style={{ color: "white" }}>

                  Games


                </Link>

              </li>


            </ul>

          </div>
          <div className="navbar-end">
            <button className="rounded-[30px] text-white hover:border-gray-700 border-white border-[0.5px] py-3 hidden lg:block lg:px-5 hover:bg-gray-700">Connect Wallet</button>
          </div>
        </div>
        {/* END OF WEB RESPONSIVENESS */}
      </div>
    </div >
  );
};

export default Navbar;
