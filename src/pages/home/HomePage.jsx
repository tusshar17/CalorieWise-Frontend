import React from 'react'
import AppName from '../../components/AppName'
import fireLogo from '../../assets/icons/fire.png'
import foodLogo from '../../assets/icons/food.png'
import goalLogo from '../../assets/icons/goal.png'
import MacroPie from '../../components/MacroPie'
import PrimaryBtn from '../../components/PrimaryBtn'

function HomePage() {
    const value = 40
  return (
    <div className='w-screen border-2 border-blackdark h-auto'>
        <AppName/>

        <main className='bg-lightwhite flex flex-col lg:flex-row min-w-full h-auto'>

            <div id='hero' className='flex flex-col justify-items-center items-center border-2 border-blackdark w-full h-auto lg:w-1/2'>
                
                {/* calcirlce */}
                <div id='calories-sec' className='rounded-full p-12 mt-8 flex flex-col gap-2 justify-center items-center w-[50vw] h-[50vw] lg:w-[28vh] lg:h-[28vh] circular-progress' style={{'--value':value}}>
                    <img src={fireLogo} className='w-auto h-1/3 z-10'/>
                    <h2 className='text-secondary text-2xl text-center text-wrap font-semibold z-10'>400 Cal Remaining</h2>
                </div>
                
                {/* goal and food cal */}
                <div id='goal-food-cal' className='w-full h-[12vh] lg:h-[16vh] flex flex- gap-4 items-center justify-around mt-8 px-8'>

                    <div id='goal-cal' className='border-primary border-2 rounded-2xl flex flex-col justify-center items-center bg-white w-1/2 lg:w-[16vw] h-full'>
                        <div id='goal-calories-label' className='flex flex-row justify-center items-center gap-2 h-1/2 w-full'>
                            <img src={goalLogo} className='w-auto h-1/2'/>
                            <h3 className='text-blcklight text-lg font-medium'>Goal</h3>
                        </div>
                        <h2 className='text-blackdark text-xl font-semibold'>2,800 Cal</h2>
                    </div>

                    <div id='food-cal' className='border-primary border-2 rounded-2xl flex flex-col justify-center items-center bg-white w-1/2 lg:w-[16vw] h-full'>
                        <div id='food-calories-label' className='flex flex-row justify-center items-center gap-2 h-1/2 w-full'>
                            <img src={foodLogo} className='w-auto h-1/2'/>
                            <h3 className='text-blcklight text-lg font-medium'>Food</h3>
                        </div>
                        <h2 className='text-blackdark text-xl font-semibold'>2,800 Cal</h2>
                    </div>

                </div>

            </div>

            <div id='insight-sec' className='lg:w-1/2 w-full flex flex-col justify-items-center items-center'>
                <div id='macro-stats' className='border-primary border-2 rounded-2xl w-[80vw] h-[80vw] lg:w-[25vw] lg:h-[25vw] mt-8 flex flex-row flex-wrap gap-4 items-center justify-around p-2'>
                    <MacroPie name="Protein" value="45" goal="100"/>
                    <MacroPie name="Protein" value="45" goal="100"/>
                    <MacroPie name="Protein" value="45" goal="100"/>
                    <MacroPie name="Protein" value="45" goal="100"/>
                </div>
                
                <PrimaryBtn value="Edit Today's Diary" className='w-1/2 h-16 mt-4 active:scale-95 ease-in duration-100'/>

            </div>

        </main>

    </div>
  )
}

export default HomePage