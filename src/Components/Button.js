import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
  return (
    <div>
      <Link className={`bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full inline-block ml-${props.marginLeft} no-underline mt-${props.marginTop}`} to={props.to} onClick={props.onClick}>{props.name}</Link>
    </div>
  )
}

export default Button