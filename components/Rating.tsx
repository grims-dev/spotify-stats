type RatingProps = {
  value: number;
  maxValue: number;
  minValue?: number;
}

export default function Rating({
  value,
  maxValue,
  minValue = 0,
}: RatingProps) {
  return (
    <div className="text-center">
      {`${Math.round((value / maxValue) * 100)}%`}<br/>
      <meter
        className="w-4/5"
        value={value}
        max={maxValue}
        min={minValue}
        high={maxValue * 0.66}
        low={maxValue * 0.33}
        optimum={maxValue}
      />
    </div>
  )
}
