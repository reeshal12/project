import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AIInsightCard } from './AIInsightCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  DollarSign, 
  Heart, 
  AlertTriangle, 
  Users,
  ShoppingCart,
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  const insights = [
    {
      title: 'Revenue Forecast',
      value: '$47,250',
      change: 12.5,
      icon: DollarSign,
      color: 'green' as const
    },
    {
      title: 'Customer Sentiment',
      value: '4.8/5.0',
      change: 8.2,
      icon: Heart,
      color: 'blue' as const
    },
    {
      title: 'Inventory Alert',
      value: '3 Items',
      change: -5.1,
      icon: AlertTriangle,
      color: 'yellow' as const
    }
  ];

  const recentActivities = [
    { action: 'New customer registration', time: '2 minutes ago', type: 'user' },
    { action: 'Product listing updated', time: '15 minutes ago', type: 'product' },
    { action: 'Campaign performance report', time: '1 hour ago', type: 'campaign' },
    { action: 'Inventory sync completed', time: '2 hours ago', type: 'inventory' }
  ];

  const quickActions = [
    { title: 'Add Product', icon: ShoppingCart, href: '/products/add' },
    { title: 'Create Campaign', icon: Target, href: '/campaigns/create' },
    { title: 'View Analytics', icon: TrendingUp, href: '/analytics' },
    { title: 'Schedule Meeting', icon: Calendar, href: '/meetings' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with {user?.businessName || 'your business'} today
          </p>
        </div>
        <Button variant="primary">
          View Full Report
        </Button>
      </motion.div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AIInsightCard {...insight} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.title}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary mb-2" />
                    <p className="font-medium text-foreground text-sm">{action.title}</p>
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Performance Overview</h2>
            <Button variant="outline" size="sm">
              Last 30 Days
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">89%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">34</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Products Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};