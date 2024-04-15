import React, { useState, useEffect } from 'react';
import Card from '../Components/Card'
import Button from '../Components/Button';

const Home = () => {
  
  return (
<div className="max-w-2xl mx-auto px-4 py-8 text-center">
  <div className=''>
  <h1 className="text-5xl text-white font-bold mt-10 mb-4">Welcome to FootQuest</h1>
  <span className="material-symbols-outlined text-white text-6xl inline-block">emoji_events
  </span>
  </div>
  <p className="text-xl text-white leading-relaxed mt-4">Step into the exciting world of FootQuest, where your passion for sports meets the thrill of trivia!</p>
  <Button
    marginTop={2}
    name="Start now"
    to="/questions"
  >
  </Button>

</div>


  )

};
export default Home