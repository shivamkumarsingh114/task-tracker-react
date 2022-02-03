import React from 'react';

const Button = (props) => {
  return <button style={{backgroundColor: props.color }}
    onClick={props.onClick}
    className='btn'>{props.text}</button>;
};

export default Button;
