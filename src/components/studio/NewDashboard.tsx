import { useState } from 'react';
import {
  FileText,
  Eye,
  Clock,
  CheckCircle,
  TrendingUp,
  Users as UsersIcon,
  BarChart3,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AdminArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';
import { StatsCard } from './StatsCard';

interface NewDashboardProps {
  articles: AdminArticle[];
  currentUser: User;
}

export function NewDashboard({ articles, currentUser }: NewDashboardProps) {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  // Stats de base
  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === 'published').length,
    draft: articles.filter((a) => a.status === 'draft').length,
    review: articles.filter((a) => a.status === 'review').length,
    scheduled: articles.filter((a) => a.status === 'scheduled').length,
  };

  // Données simulées pour le trafic (mock)
  const trafficData = [
    { date: '01 Jan', visits: 1200, pageviews: 3400 },
    { date: '02 Jan', visits: 1800, pageviews: 4200 },
    { date: '03 Jan', visits: 1500, pageviews: 3800 },
    { date: '04 Jan', visits: 2200, pageviews: 5100 },
    { date: '05 Jan', visits: 2800, pageviews: 6300 },
    { date: '06 Jan', visits: 2400, pageviews: 5600 },
    { date: '07 Jan', visits: 3100, pageviews: 7200 },
  ];

  // Répartition du trafic
  const trafficSourcesData = [
    { name: 'Organique', value: 45, color: '#10b981' },
    { name: 'Social', value: 28, color: '#3b82f6' },
    { name: 'Direct', value: 18, color: '#C69C6D' },
    { name: 'Referral', value: 9, color: '#f59e0b' },
  ];

  // Top 5 articles (mock avec vraies données)
  const topArticles = [...articles]
    .filter((a) => a.status === 'published')
    .slice(0, 5)
    .map((article, index) => ({
      title: article.title,
      visits: Math.floor(Math.random() * 5000) + 1000,
      category: article.category,
    }))
    .sort((a, b) => b.visits - a.visits);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de vos performances</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Visites"
          value="18.5k"
          icon={Eye}
          color="bg-blue-500"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          label="Pages vues"
          value="42.3k"
          icon={BarChart3}
          color="bg-green-500"
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          label="Temps moyen"
          value="3m 24s"
          icon={Clock}
          color="bg-purple-500"
        />
        <StatsCard
          label="Taux de rebond"
          value="42%"
          icon={TrendingUp}
          color="bg-orange-500"
          trend={{ value: -5.3, isPositive: true }}
        />
      </div>

      {/* Articles Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Articles publiés"
          value={stats.published}
          icon={CheckCircle}
          color="bg-green-600"
        />
        <StatsCard
          label="En review"
          value={stats.review}
          icon={Eye}
          color="bg-blue-600"
        />
        <StatsCard
          label="Brouillons"
          value={stats.draft}
          icon={FileText}
          color="bg-gray-600"
        />
        <StatsCard
          label="Planifiés"
          value={stats.scheduled}
          icon={Calendar}
          color="bg-purple-600"
        />
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">Trafic</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('day')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                period === 'day'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                period === 'month'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                period === 'year'
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Année
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="#C69C6D"
              strokeWidth={2}
              name="Visites"
            />
            <Line
              type="monotone"
              dataKey="pageviews"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Pages vues"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg mb-6">Répartition du trafic</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {trafficSourcesData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm text-gray-700">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg mb-4">Top 5 articles</h2>
          <div className="space-y-3">
            {topArticles.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                Aucun article publié
              </p>
            ) : (
              topArticles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C69C6D] text-white flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1 truncate">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.category}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-medium">{article.visits.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">visites</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}