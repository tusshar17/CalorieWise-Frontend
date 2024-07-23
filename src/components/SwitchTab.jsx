import React from 'react'

function SwitchTab({
  tabName1,
  icon1,
  tabName2,
  icon2,
  onClick1,
  onClick2,
  className = ''
}) {

  const onClickTab1 = () => {
    const tab1 = document.getElementById('tab1')
    const tab2 = document.getElementById('tab2')
    tab1.classList.add("lg:bg-primary")
    tab1.classList.add("lg:bg-opacity-30")
    tab1.classList.add("border-b-4")
    tab1.classList.add("border-secondary")
    tab2.classList.remove("lg:bg-primary")
    tab2.classList.remove("lg:bg-opacity-30")
    tab2.classList.remove("border-b-4")
    tab2.classList.remove("border-secondary")
    onClick1()
  }

  const onClickTab2 = () => {
    const tab1 = document.getElementById('tab1')
    const tab2 = document.getElementById('tab2')
    tab2.classList.add("lg:bg-primary")
    tab2.classList.add("lg:bg-opacity-30")
    tab2.classList.add("border-b-4")
    tab2.classList.add("border-secondary")
    tab1.classList.remove("lg:bg-primary")
    tab1.classList.remove("lg:bg-opacity-30")
    tab1.classList.remove("border-b-4")
    tab1.classList.remove("border-secondary")
    onClick2()
  }


  return (
    <div className={`${className} bg-white shadow-sm shadow-blcklight lg:rounded-full lg:border-2 lg:border-lightwhite text-secondary box-border flex flex-row`}>
      
      <button
      id='tab1' 
      className='w-1/2 h-full flex justify-center items-center gap-2 cursor-pointer border-b-4 border-secondary lg:border-none  lg:rounded-l-full lg:bg-primary lg:bg-opacity-30' 
      onClick={onClickTab1}>
        <img src={icon1} className='w-[28px] h-auto'/>
        <h1 className='text-lg font-medium'>{tabName1}</h1>
      </button>

      <button 
      id='tab2'
      className='w-1/2 h-full flex justify-center items-center gap-2 cursor-pointer lg:border-none  lg:rounded-r-full' 
      onClick={onClickTab2}>
        <img src={icon2} className='w-[28px] h-auto'/>
        <h1 className='text-lg font-medium'>{tabName2}</h1>
      </button>

    </div>
  )
}

export default SwitchTab