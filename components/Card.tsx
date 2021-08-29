type CardProps = {
  index?: number;
  imageURL?: string;
  text?: string;
}

export default function Card({
  index,
  imageURL,
  text,
}: CardProps) {
  return (
    <div
      className="flex items-end overflow-hidden rounded-lg bg-cover bg-center bg-gray-600 h-44 relative text-white cursor-default"
      style={{backgroundImage: `url(${imageURL})`}}
    >
      <div
        className="w-full h-full absolute"
        style={{background: 'linear-gradient(0deg, #111111aa 25%, #ffffff00 80%'}}
      />
      <div className="max-w-full p-2 z-10">
        {!isNaN(index) && <strong className="absolute top-0 right-0 p-1.5 bg-green-600 bg-opacity-95 w-10 text-center tracking-wide rounded-bl-sm shadow">#{index+1}</strong>}
        <strong className="text-lg leading-none break-words" style={{textShadow: '0px 0px 5px #0000000099'}}>{text}</strong>
      </div>
    </div>
  )
}
