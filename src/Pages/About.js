import React from 'react'

const About = () => {
  return (
    <div className='text-center text-white mt-20'>
      <h1 className='font-bold text-3xl mt-4'>Introducing: FootQuest</h1>
      <h2 className='text-xl mt-3'>A Daily Sports Trivia game!</h2>
      <p className='mt-5 mb-3 font-bold text-2xl'>Concept</p>
      <p className='text-xl'>Every 24 hours you get a combination of:<br/>-easy<br/>-medium<br/>-hard<br/>Questions.</p>
      <h2 className='mt-3 mb-3 font-bold text-2xl'>Scoring System</h2>
      <p className='text-xl'>Easy Questions: +2 Points</p>
      <p className='text-xl'>Medium Questions: +4 Points</p>
      <p className='text-xl'>Hard Questions: +6 Points</p>
      <p className='mt-10 font-bold pb-10'>!<br/> To Jump Back in <br/> Click Start Now</p>
    </div>
  )
}

export default About