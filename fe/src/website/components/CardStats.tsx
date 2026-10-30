interface CardStatsProps {
  label?: string;
  value?: string | number;
  suffix?: string;
}

/**
 * One figure in the metrics band. Label sits under the number, dimmed.
 */
const CardStats = ({ label, value, suffix }: CardStatsProps) => {
  return (
    <div className="px-1 md:px-6 md:first:pl-0">
      <dd className="text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
        {value}
        {suffix}
      </dd>
      {label && (
        <dt className="mt-3 max-w-[18ch] text-sm leading-snug text-white/55">
          {label}
        </dt>
      )}
    </div>
  );
};

export default CardStats;
