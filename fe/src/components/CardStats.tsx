interface CardStatsProps {
  number?: number;
  label?: string;
}

const CardStats = ({ number = 99, label = "lorem ipsum" }: CardStatsProps) => {
  return (
    <div className="pt-4">
      <p className="text-5xl font-bold">{number}+</p>
      <p>{label}</p>
    </div>
  );
};

export default CardStats;
