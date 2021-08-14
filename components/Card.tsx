import React from 'react';

export default function Card({
  index,
  imageURL,
  text,
}) {
  return (
    <div
      className="flex items-end overflow-hidden rounded-lg bg-cover bg-center h-44 relative text-white cursor-default"
      style={{backgroundImage: `url(${imageURL})`}}
    >
      <div
        className="w-full h-full absolute"
        style={{background: 'linear-gradient(0deg, #111111aa 25%, #ffffff00 80%'}}
      ></div>
      <div className="p-2 z-10">
        <strong className="absolute top-0 right-0 p-1.5 bg-green-600 bg-opacity-95 w-10 text-center tracking-wide rounded-bl-sm shadow">#{index+1}</strong>
        <strong className="text-lg leading-none" style={{textShadow: '0px 0px 5px #0000000099'}}>{text}</strong>
        <br/>
      </div>
    </div>
  )
}