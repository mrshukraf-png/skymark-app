interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon">
          {icon}
        </span>

        <span className="stat-title">
          {title}
        </span>
      </div>

      <strong className="stat-value">
        {value}
      </strong>

      <p>
        {description}
      </p>
    </div>
  );
}