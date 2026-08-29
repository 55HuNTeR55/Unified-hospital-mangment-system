import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  of?: number | string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, of }) => {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value num">
        {value}
        {of !== undefined && <span className="of"> / {of}</span>}
      </div>
    </div>
  );
};
