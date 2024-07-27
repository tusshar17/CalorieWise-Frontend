import React from 'react'
import homeLogo from '../assets/icons/home.png'
import diaryLogo from '../assets/icons/diary.png'
import weightLogo from '../assets/icons/weight-machine.png'
import recipeLogo from '../assets/icons/recipebook.png'
import userLogo from '../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom'


const menuItems = [
    {
        name: "Home",
        logo: homeLogo,
        url: "/"
    },
    {
        name: "Diary",
        logo: diaryLogo,
        url: "/diary"
    },
    {
        name: "Weight",
        logo: weightLogo,
        url: "/weight"
    },
    {
        name: "Items",
        logo: recipeLogo,
        url: "/my-items"
    },
    {
        name: "Profile",
        logo: userLogo,
        url: "/profile"
    }
]

function BottomMenu({
    className = ""
}) {

    const navigate = useNavigate()

  return (
    <div id='bottom-menu' className={`w-screen lg:w-[5vw] lg:px-2 lg:py-2 rounded-t-2xl lg:rounded-tl-none lg:rounded-r-3xl lg lg:h-[64vh] h-[8vh] box-border border-2 border-lightwhite shadow-md shadow-blcklight bg-white flex flex-row lg:flex-col lg:justify-around ${className}`}>

        {menuItems.map((item, index)=>(
            <button 
            key={`menu-item-${index}`} 
            onClick={()=>{navigate(item.url)}}
            className='w-1/5 h-full lg:w-full lg:h-1/6 pt-2 lg:pt-0 lg:pr-2 lg:pl-1 flex flex-col gap-1 items-center justify-center hover:scale-95 ease-linear duration-150'>
                <img src={item.logo} className='h-2/5 w-auto lg:h-auto lg:w-2/5'/>
                <h3 className='text-primary text-md text-center font-medium'>{item.name}</h3>
            </button>
        ))}
        
    </div>
  )
}

export default BottomMenu