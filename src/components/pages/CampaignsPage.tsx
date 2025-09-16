import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Plus, 
  Search, 
  Megaphone, 
  Calendar, 
  Target,
  Users,
  DollarSign,
  TrendingUp,
  Play,
  Pause,
  Edit,
  Trash2
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  platform: string;
  image: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Electronics Sale',
    description: 'Promote wireless headphones and smart devices for summer season',
    budget: 5000,
    spent: 3250,
    reach: 45000,
    clicks: 1250,
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    platform: 'Google Ads',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Fitness Watch Launch',
    description: 'Product launch campaign for new smart fitness watch',
    budget: 8000,
    spent: 2100,
    reach: 28000,
    clicks: 890,
    status: 'active',
    startDate: '2024-05-15',
    endDate: '2024-08-15',
    platform: 'Facebook Ads',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Back to School Tech',
    description: 'Target students with essential tech products',
    budget: 3000,
    spent: 3000,
    reach: 65000,
    clicks: 2100,
    status: 'completed',
    startDate: '2024-08-01',
    endDate: '2024-09-01',
    platform: 'Instagram Ads',
    image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const CampaignsPage: React.FC = () => {
  const { t } = useLanguage();
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('campaigns.title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('campaigns.subtitle')}
          </p>
        </div>
        <Button variant="primary" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>{t('campaigns.createCampaign')}</span>
        </Button>
      </motion.div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={t('campaigns.searchCampaigns')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12"
          />
        </div>
      </Card>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: t('campaigns.totalCampaigns'), value: '12', icon: Megaphone, color: 'blue' },
          { label: t('campaigns.activeCampaigns'), value: '8', icon: Play, color: 'green' },
          { label: t('campaigns.totalReach'), value: '138K', icon: Users, color: 'purple' },
          { label: t('campaigns.totalSpent'), value: '$8.35K', icon: DollarSign, color: 'red' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={campaign.image}
                  alt={campaign.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{t('campaigns.budget')}</span>
                      </div>
                      <p className="font-semibold text-foreground">{formatCurrency(campaign.budget)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{t('campaigns.spent')}</span>
                      </div>
                      <p className="font-semibold text-foreground">{formatCurrency(campaign.spent)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <Users className="w-4 h-4" />
                        <span>{t('campaigns.reach')}</span>
                      </div>
                      <p className="font-semibold text-foreground">{formatNumber(campaign.reach)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <Target className="w-4 h-4" />
                        <span>{t('campaigns.clicks')}</span>
                      </div>
                      <p className="font-semibold text-foreground">{formatNumber(campaign.clicks)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{t('campaigns.platform')}</span>
                      </div>
                      <p className="font-semibold text-foreground">{campaign.platform}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'active' ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : campaign.status === 'paused' ? (
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">{t('campaigns.noCampaignsFound')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm 
              ? t('campaigns.adjustSearchCriteria')
              : t('campaigns.createFirstCampaign')
            }
          </p>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            {t('campaigns.createCampaign')}
          </Button>
        </motion.div>
      )}
    </div>
  );
};