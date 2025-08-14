import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AIInsightCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'green' | 'red' | 'blue' | 'yellow';
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color
}) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  const isPositive = change > 0;

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      
      <div className="mt-2 text-xs text-gray-500">
        <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
          {isPositive ? '+' : ''}{change}% from last month
        </span>
      </div>
    </Card>
  );
};