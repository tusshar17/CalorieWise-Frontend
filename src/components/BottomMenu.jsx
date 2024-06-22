import React from 'react'
import homeLogo from '../assets/icons/home.png'
import diaryLogo from '../assets/icons/diary.png'
import weightLogo from '../assets/icons/weight-machine.png'
import recipeLogo from '../assets/icons/recipebook.png'
import userLogo from '../assets/icons/user.svg'


const menuItems = [
    {
        name: "Home",
        logo: homeLogo
    },
    {
        name: "Diary",
        logo: diaryLogo
    },
    {
        name: "Weight",
        logo: weightLogo
    },
    {
        name: "My Items",
        logo: recipeLogo
    },
    {
        name: "Account",
        logo: userLogo
    }
]

function BottomMenu({
    className = ""
}) {
  return (
    <div id='bottom-menu' className={`w-screen lg:w-[5vw] lg:px-2 lg:py-2 rounded-t-2xl lg:rounded-tl-none lg:rounded-r-3xl lg lg:h-[64vh] h-[8vh] border-2 border-lightwhite shadow-md shadow-blcklight bg-white flex flex-row lg:flex-col lg:justify-around ${className}`}>

        {menuItems.map((item, index)=>(
            <div key={`menu-item-${index}`} className='w-1/5 h-full lg:w-full lg:h-1/6 pt-2 lg:pt-0 lg:pr-2 lg:pl-1 flex flex-col gap-1 items-center justify-center'>
                <img src={item.logo} className='h-2/5 w-auto lg:h-auto lg:w-2/5'/>
                <h3 className='text-primary text-md text-center font-medium'>{item.name}</h3>
            </div>
        ))}
        
    </div>
  )
}

export default BottomMenu