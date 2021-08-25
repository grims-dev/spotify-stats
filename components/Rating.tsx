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
    <div className="flex">
      {`${Math.round((value / maxValue) * 100)}%`}
      <meter value={value} max={maxValue} min={minValue} />
    </div>
  )
}
