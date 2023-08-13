import React from 'react'

export default function CustomButton(props) {
  return (
    <button
      type={props.btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${props.styles}`}
      onClick={props.handleClick}
    >
      {props.title}
    </button>
  )
}
