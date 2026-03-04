import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Clock,
  Users,
  BarChart3,
  Search,
  Globe
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AdminArticle } from '../../data/adminArticles';
import { User } from '../../utils/auth';
import {
  generateTrafficData,
  getTopArticles,
  generateTrafficSources,
  generateSEOMetrics,
  calculateGlobalStats,
  formatNumber
} from '../../data/analytics';

interface ModernDashboardProps {
  articles: AdminArticle[];
  currentUser: User;
}

export function ModernDashboard({ articles, currentUser }: ModernDashboardProps) {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');
  
  // Calcul des statistiques
  const globalStats = calculateGlobalStats(articles, period);
  const trafficData = generateTrafficData(period, articles);
  const topArticles = getTopArticles(articles);
  const trafficSources = generateTrafficSources();
  const seoMetrics = generateSEOMetrics(articles);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue {currentUser.name}, voici un aperçu de vos performances
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('day')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === 'day'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Jour
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === 'month'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Mois
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === 'year'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Année
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="w-5 h-5" />}
          label="Visites"
          value={formatNumber(globalStats.visits)}
          change={globalStats.visitsChange}
          color="blue"
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Pages vues"
          value={formatNumber(globalStats.pageviews)}
          change={globalStats.pageviewsChange}
          color="green"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Durée moyenne"
          value={globalStats.avgDuration}
          change={globalStats.durationChange}
          color="purple"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Taux de rebond"
          value={`${globalStats.bounceRate}%`}
          change={globalStats.bounceRateChange}
          color="orange"
          invertChange
        />
      </div>

      {/* Graphique de trafic principal */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg mb-6">Aperçu du trafic</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C69C6D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C69C6D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="#C69C6D"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisits)"
              name="Visites"
            />
            <Area
              type="monotone"
              dataKey="pageviews"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPageviews)"
              name="Pages vues"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources de trafic */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg mb-6">Sources de trafic</h2>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="visits"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm text-gray-700">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 5 Articles */}
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
                  key={article.articleId}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                      index === 0
                        ? 'bg-yellow-500'
                        : index === 1
                        ? 'bg-gray-400'
                        : index === 2
                        ? 'bg-orange-600'
                        : 'bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1 truncate font-medium">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(article.visits)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.floor(article.avgTimeOnPage / 60)}m
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Performance SEO */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">Performance SEO</h2>
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Mot-clé
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">
                  Position
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                  Impressions
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                  Clics
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                  CTR
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                  Évolution
                </th>
              </tr>
            </thead>
            <tbody>
              {seoMetrics.slice(0, 10).map((metric, index) => (
                <tr
                  key={metric.keyword}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm">{metric.keyword}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        metric.position <= 3
                          ? 'bg-green-100 text-green-700'
                          : metric.position <= 10
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {metric.position}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm">
                    {formatNumber(metric.impressions)}
                  </td>
                  <td className="py-3 px-4 text-right text-sm">
                    {formatNumber(metric.clicks)}
                  </td>
                  <td className="py-3 px-4 text-right text-sm">
                    {metric.ctr.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        metric.change > 0
                          ? 'text-green-600'
                          : metric.change < 0
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {metric.change > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : metric.change < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : null}
                      {Math.abs(metric.change)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Composant de carte de statistique
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
  invertChange?: boolean;
}

function StatCard({ icon, label, value, change, color, invertChange }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  const isPositive = invertChange ? (change || 0) < 0 : (change || 0) > 0;
  const isNegative = invertChange ? (change || 0) > 0 : (change || 0) < 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`${colors[color]} p-3 rounded-lg text-white`}>{icon}</div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive
                ? 'text-green-600'
                : isNegative
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : isNegative ? (
              <TrendingDown className="w-4 h-4" />
            ) : null}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold mb-1">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
