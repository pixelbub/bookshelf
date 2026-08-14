type StatsCardProps = {
  label: string;
  value: number;
  icon: string;
};

export default function StatsCard({
  label,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>

      <div>
        <p>{label}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}