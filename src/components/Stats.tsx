type StatsProps = {
  textStat: string;
  numStat: number;
};

function Stats({ textStat, numStat }: StatsProps) {
  return (
    <p>
      <span className='number'>{numStat}%</span>
      <span className='text'>{textStat}</span>
    </p>
  );
}

export default Stats;
