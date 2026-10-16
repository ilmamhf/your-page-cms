import type { MetricItem } from "../../types/landing";

interface CardStatsProps {
  stat: MetricItem;
}

const CardStats = ({ stat }: CardStatsProps) => {
  return (
    <div className="pt-4">
      <p className="text-5xl font-bold">
        {stat.value}
        {stat.suffix}
      </p>
      <p>{stat.label}</p>
    </div>
  );
};

export default CardStats;
