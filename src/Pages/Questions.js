import React, { useState, useEffect} from 'react';
import he from 'he';
import Button from '../Components/Button';

const Questions = () => {
  
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [allTimePoints, setAllTimePoints] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [batchCompleted, setBatchCompleted]=useState(false);
  const [hoursLeft, setHoursLeft] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=21&type=multiple');
      const data = await response.json();
      if (data.results) {

        setBatchCompleted(false);
        setHoursLeft(24);
        localStorage.setItem('lastCompletionTime', new Date().toISOString());

        const shuffledQuestions = data.results.map(question => {
          const options = [...question.incorrect_answers, question.correct_answer];
          const shuffledOptions = shuffleArray(options);
          return { ...question, options: shuffledOptions, correct_answer: question.correct_answer };
        });

        setAllQuestions(shuffledQuestions);
        setIsLoading(false);
      } else {
        console.error('error');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('error: ', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const lastCompletionTime = localStorage.getItem('lastCompletionTime');
    if (lastCompletionTime) {
      const timeDifference = Date.now() - new Date(lastCompletionTime).getTime();
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      if (hoursDifference >= 24) {
        fetchData();
      } else {
        setHoursLeft(24 - hoursDifference);
        setBatchCompleted(true);
      }
    } else {
      fetchData();
    }
    
    const storedAllTimePoints = JSON.parse(localStorage.getItem('allTimePoints'))
    if (storedAllTimePoints !== null) {
      setAllTimePoints(storedAllTimePoints);
    }

  }, []);
  
  

  const shuffleArray = (array) => { //shuffling algorithm in order to shuffle the combined options of correct and incorrect answers
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = async (answer, correct_answer,difficulty) => {
    if (!selectedOption) {
    setIsOptionSelected(true);
    setSelectedOption(answer);
    console.log(difficulty)
    if (answer === correct_answer) {
      setAnswerStatus("correct");
      if(difficulty==="easy"){
        const newPoints= allTimePoints+2
        setAllTimePoints(newPoints)
        localStorage.setItem('allTimePoints', JSON.stringify(newPoints))
      }
      else if(difficulty==="medium"){
        const newPoints= allTimePoints+4
        setAllTimePoints(newPoints)
        localStorage.setItem('allTimePoints', JSON.stringify(newPoints))
      }
      else if(difficulty==="hard"){
        const newPoints= allTimePoints+6
        setAllTimePoints(newPoints)
        localStorage.setItem('allTimePoints', JSON.stringify(newPoints))
      }
    } else {
      setAnswerStatus("incorrect");
    }
    }
  }

  const handleNextClick = () => {
    // move to the next question
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    // reset selected option and answer status for the new question
    setSelectedOption(null);
    setAnswerStatus([]);
    setIsOptionSelected(false);
  }

  return (
    <div className='text-center'>

      {batchCompleted===false?
        <h1 className='text-2xl font-bold text-white mt-5'>Hours left to complete batch: {hoursLeft}</h1>
      :
        <h1 className='text-2xl font-bold text-white mt-5'>Hours left until next batch: {hoursLeft}</h1>
      }

      <h1 className='text-2xl text-white font-bold mt-5 mb-5'>All Time Score: {allTimePoints}</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {allQuestions.length > 0 && allQuestions[currentQuestionIndex] && (
            <div className="pl-5 pr-5">
              <h3 className='text-xl text-white font-bold mb-4'>
                {currentQuestionIndex + 1}. {he.decode(allQuestions[currentQuestionIndex].question)} ({allQuestions[currentQuestionIndex].difficulty})
              </h3>
              <ul className='mb-5 text-white text-md border border-white'>
                {allQuestions[currentQuestionIndex].options.map((option, index) => (
                  !isOptionSelected ?
                    <li
                      className={`pb-1 pt-1 border-b border-white cursor-pointer
                      `}
                      key={index}
                      onClick={() => handleOptionClick(option, allQuestions[currentQuestionIndex].correct_answer,allQuestions[currentQuestionIndex].difficulty)}
                    >
                      {he.decode(option)}
                    </li>
                    :
                    <li
                    className={`pb-1 pt-1 border-b border-white cursor-pointer
                      ${answerStatus === "correct" && option === allQuestions[currentQuestionIndex].correct_answer ? "text-green-500" : ""}
                      ${answerStatus === "incorrect" && option === selectedOption ? "text-red-500" : ""}
                    `}
                    key={index}
                    onClick={() => handleOptionClick(option, allQuestions[currentQuestionIndex].correct_answer,allQuestions[currentQuestionIndex].difficulty)}
                  >
                    {he.decode(option)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {currentQuestionIndex < allQuestions.length - 1 && (
        <Button
          marginLeft={0}
          marginTop={0}
          onClick={handleNextClick}
          name="Next"
        />
      )}

    </div>
  )
}

export default Questions;
