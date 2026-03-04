import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ label, value, icon: Icon, color, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span
            className={`text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="text-3xl mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
