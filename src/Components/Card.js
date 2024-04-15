import React from 'react';
import he from 'he';

const Card = (props) => {
  return (
    <div key={props.key} className="border p-6 flex flex-col items-center justify-center">
      <p className="font-bold p-3 text-center">{he.decode(props.question)}</p>
        <ul className="list-disc list-inside">
          {props.incorrect_answers.map((answer, index) => (
            <li
              key={index}
              className='border list-none cursor-pointer p-2 text-center hover:bg-purple-200 pl-10 pr-10'
            >{he.decode(answer)}</li>
          ))}
          <li className='border list-none cursor-pointer p-2 text-center hover:bg-purple-200'>{he.decode(props.correct_answer)}</li>
        </ul>
    </div>
  )
}

export default Card