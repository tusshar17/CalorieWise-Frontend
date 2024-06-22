import React from 'react'
import AppName from '../../components/AppName'
import fireLogo from '../../assets/icons/fire.png'
import foodLogo from '../../assets/icons/food.png'
import goalLogo from '../../assets/icons/goal.png'
import MacroPie from '../../components/MacroPie'
import PrimaryBtn from '../../components/PrimaryBtn'
import InsightGraph from '../../components/InsightGraph'
import BottomMenu from '../../components/BottomMenu'

function HomePage() {
    const value = 40
  return (
    <div className='w-screen h-auto flex flex-col justify-center items-center'>
        <AppName/>

        <main className='bg-lightwhite bg-opacity-0 flex flex-col min-w-full h-auto lg:min-h-[90vh] py-4 pb-[10vh] lg:pl-[3vw] lg:mt-4 rounded-t-3xl'>

            <div id='hero' className='flex flex-col items-center lg:flex-row'>
                <div id='hero-left' className='flex flex-col justify-items-center items-center w-full h-auto lg:w-1/2'>
                    
                    {/* calcirlce */}
                    <div id='calories-sec' className='rounded-full shadow-md shadow-blcklight border-2 border-white p-12 mt-8 flex flex-col gap-2 justify-center items-center w-[50vw] h-[50vw] lg:w-[28vh] lg:h-[28vh] circular-progress' style={{'--value':value}}>
                        <img src={fireLogo} className='w-auto h-1/3 z-10'/>
                        <h2 className='text-secondary text-2xl text-center text-wrap font-semibold z-10'>400 Cal Remaining</h2>
                    </div>
                    
                    {/* goal and food cal */}
                    <div id='goal-food-cal' className='w-full h-[12vh] lg:h-[16vh] flex flex- gap-4 items-center justify-around mt-8 px-8'>

                        <div id='goal-cal' className='border-lightwhite border-2 rounded-2xl flex flex-col justify-center items-center bg-white w-1/2 lg:w-[16vw] h-full shadow-2xl shadow-blcklight'>
                            <div id='goal-calories-label' className='flex flex-row justify-center items-center gap-2 h-1/2 w-full'>
                                <img src={goalLogo} className='w-auto h-1/2'/>
                                <h3 className='text-blcklight text-lg font-medium'>Goal</h3>
                            </div>
                            <h2 className='text-blackdark text-xl font-semibold'>2,800 Cal</h2>
                        </div>

                        <div id='food-cal' className='border-lightwhite border-2 rounded-2xl flex flex-col justify-center items-center bg-white w-1/2 lg:w-[16vw] h-full shadow-2xl shadow-blcklight'>
                            <div id='food-calories-label' className='flex flex-row justify-center items-center gap-2 h-1/2 w-full'>
                                <img src={foodLogo} className='w-auto h-1/2'/>
                                <h3 className='text-blcklight text-lg font-medium'>Food</h3>
                            </div>
                            <h2 className='text-blackdark text-xl font-semibold'>2,800 Cal</h2>
                        </div>

                    </div>

                </div>

                <div id='hero-right' className='lg:w-1/2 w-full flex flex-col justify-items-center items-center'>
                    
                    <div id='macro-stats' className='border-lightwhite border-2 shadow-2xl shadow-blcklight bg-white rounded-3xl w-[80vw] h-[80vw] lg:w-[25vw] lg:h-[25vw] mt-8 flex flex-row flex-wrap gap-4 items-center justify-around p-2'>
                        <MacroPie name="Protein" value="45" goal="100"/>
                        <MacroPie name="Carbs" value="75" goal="100"/>
                        <MacroPie name="Fats" value="15" goal="100"/>
                        <MacroPie name="Sugar" value="825" goal="100"/>
                    </div>
                    
                    <PrimaryBtn value="Edit Today's Diary" className='w-1/2 h-16 mt-8 shadow-2xl shadow-blcklight active:scale-95 ease-in duration-100'/>

                </div>
            </div>

            <div id='insight-graphs' className='px-4 mt-12 flex flex-col lg:flex-row justify-evenly items-center gap-12 lg:gap-0'>
                <InsightGraph label='Calories Intake'/>
                <InsightGraph label='Macros Intake'/>
                <InsightGraph label='Body Weight'/>
            </div>

        </main>

        <BottomMenu className='fixed bottom-0 lg:left-0 lg:top-[18vh] z-40'/>

    </div>
  )
}

export default HomePage