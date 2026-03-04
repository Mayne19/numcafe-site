import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Users, FileText, Eye, Clock, Target, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminArticle } from '../../data/adminArticles';
import { 
  generateTrafficData, 
  generateArticleTraffic, 
  calculateGlobalStats,
  initializeAnalytics
} from '../../data/analyticsData';

interface AdvancedDashboardProps {
  articles: AdminArticle[];
  currentUser: any;
}

type TimeFilter = 'day' | 'week' | 'month' | 'year';

export function AdvancedDashboard({ articles, currentUser }: AdvancedDashboardProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const data = initializeAnalytics(articles);
    setAnalyticsData(data);
  }, [articles]);

  // Filtrer les données selon la période
  const filteredTrafficData = useMemo(() => {
    if (!analyticsData) return [];
    
    const days = {
      day: 1,
      week: 7,
      month: 30,
      year: 365
    }[timeFilter];

    return analyticsData.trafficData.slice(-days);
  }, [analyticsData, timeFilter]);

  // Calculer les stats globales
  const globalStats = useMemo(() => {
    if (!analyticsData) return null;
    return calculateGlobalStats(analyticsData.trafficData, timeFilter);
  }, [analyticsData, timeFilter]);

  // Top 5 articles par trafic
  const topArticles = useMemo(() => {
    if (!analyticsData) return [];
    return analyticsData.articleTraffic.slice(0, 5);
  }, [analyticsData]);

  // Stats par statut
  const articlesByStatus = useMemo(() => {
    const statusCounts = {
      published: articles.filter(a => a.status === 'published').length,
      draft: articles.filter(a => a.status === 'draft').length,
      review: articles.filter(a => a.status === 'review').length,
      scheduled: articles.filter(a => a.status === 'scheduled').length
    };

    return [
      { name: 'Publiés', value: statusCounts.published, color: '#10B981' },
      { name: 'Brouillons', value: statusCounts.draft, color: '#94A3B8' },
      { name: 'En revue', value: statusCounts.review, color: '#F59E0B' },
      { name: 'Planifiés', value: statusCounts.scheduled, color: '#3B82F6' }
    ];
  }, [articles]);

  if (!analyticsData || !globalStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement des statistiques...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de vos performances</p>
        </div>
        
        {/* Filtres temporels */}
        <div className="flex gap-2">
          {(['day', 'week', 'month', 'year'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFilter === filter
                  ? 'bg-[#C69C6D] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {filter === 'day' && 'Jour'}
              {filter === 'week' && 'Semaine'}
              {filter === 'month' && 'Mois'}
              {filter === 'year' && 'Année'}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          title="Visites totales"
          value={globalStats.totalVisits.toLocaleString()}
          change={globalStats.visitsChange}
          isPositive={parseFloat(globalStats.visitsChange) >= 0}
        />
        <StatCard
          icon={FileText}
          title="Pages vues"
          value={globalStats.totalPageviews.toLocaleString()}
          change={globalStats.pageviewsChange}
          isPositive={parseFloat(globalStats.pageviewsChange) >= 0}
        />
        <StatCard
          icon={Clock}
          title="Temps moyen"
          value={globalStats.avgTimeOnSite}
          change={globalStats.timeChange}
          isPositive={parseFloat(globalStats.timeChange) >= 0}
        />
        <StatCard
          icon={Users}
          title="Taux de rebond"
          value={globalStats.bounceRate}
          change={globalStats.bounceRateChange}
          isPositive={parseFloat(globalStats.bounceRateChange) < 0}
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique de trafic */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Évolution du trafic</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return timeFilter === 'year' 
                    ? d.toLocaleDateString('fr-FR', { month: 'short' })
                    : d.getDate().toString();
                }}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#C69C6D" 
                strokeWidth={2}
                dot={{ fill: '#C69C6D', r: 3 }}
                name="Visites"
              />
              <Line 
                type="monotone" 
                dataKey="pageviews" 
                stroke="#94A3B8" 
                strokeWidth={2}
                dot={{ fill: '#94A3B8', r: 3 }}
                name="Pages vues"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par statut */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Articles par statut</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={articlesByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {articlesByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {articlesByStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: status.color }}
                  />
                  <span className="text-gray-600">{status.name}</span>
                </div>
                <span className="font-medium text-gray-900">{status.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Articles */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Top 5 des articles</h2>
          <Target className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {topArticles.map((article, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-[#C69C6D] text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{article.articleTitle}</h3>
                <p className="text-sm text-gray-500">
                  {article.visits} visites · {article.pageviews} pages vues
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {Math.floor(article.avgTimeOnPage / 60)}:{(article.avgTimeOnPage % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500">temps moyen</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: any;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

function StatCard({ icon: Icon, title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#C69C6D]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#C69C6D]" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}