import { useState } from 'react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  X,
  Lightbulb,
  FileText
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AdminArticle } from '../../data/adminArticles';
import { generateSEOMetrics, formatNumber } from '../../data/analytics';
import { User } from '../../utils/auth';

interface SEODashboardProps {
  articles: AdminArticle[];
  currentUser: User;
}

export function SEODashboard({ articles, currentUser }: SEODashboardProps) {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedKeyword, setSelectedKeyword] = useState<any>(null);
  
  const seoMetrics = generateSEOMetrics(articles);
  const publishedArticles = articles.filter(a => a.status === 'published');

  // Calcul des métriques SEO
  const totalImpressions = seoMetrics.reduce((sum, m) => sum + m.impressions, 0);
  const totalClicks = seoMetrics.reduce((sum, m) => sum + m.clicks, 0);
  const avgCTR = totalClicks / totalImpressions * 100;
  const avgPosition = seoMetrics.reduce((sum, m) => sum + m.position, 0) / seoMetrics.length;

  // Répartition des scores SEO des articles
  const seoScoreDistribution = [
    {
      name: 'Excellent',
      value: publishedArticles.filter(a => a.seo_score === 'green').length,
      color: '#10b981'
    },
    {
      name: 'Bon',
      value: publishedArticles.filter(a => a.seo_score === 'yellow').length,
      color: '#f59e0b'
    },
    {
      name: 'Moyen',
      value: publishedArticles.filter(a => a.seo_score === 'orange').length,
      color: '#ff6b00'
    },
    {
      name: 'Faible',
      value: publishedArticles.filter(a => a.seo_score === 'red').length,
      color: '#ef4444'
    }
  ];

  // Évolution des positions
  const positionData = seoMetrics.slice(0, 10).map(m => ({
    keyword: m.keyword.slice(0, 20) + (m.keyword.length > 20 ? '...' : ''),
    position: m.position,
    impressions: m.impressions / 100
  }));

  // Top mots-clés par clics
  const topKeywordsByClicks = [...seoMetrics]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Dashboard SEO</h1>
          <p className="text-gray-600">
            Analysez vos performances de référencement naturel
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('7d')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === '7d'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            7 jours
          </button>
          <button
            onClick={() => setPeriod('30d')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === '30d'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            30 jours
          </button>
          <button
            onClick={() => setPeriod('90d')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              period === '90d'
                ? 'bg-[#C69C6D] text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            90 jours
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SEOMetricCard
          icon={<Eye className="w-5 h-5" />}
          label="Impressions totales"
          value={formatNumber(totalImpressions)}
          change={12.5}
          color="gold"
        />
        <SEOMetricCard
          icon={<MousePointerClick className="w-5 h-5" />}
          label="Clics totaux"
          value={formatNumber(totalClicks)}
          change={8.3}
          color="gold"
        />
        <SEOMetricCard
          icon={<Target className="w-5 h-5" />}
          label="CTR moyen"
          value={`${avgCTR.toFixed(2)}%`}
          change={-2.1}
          color="gold"
        />
        <SEOMetricCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Position moyenne"
          value={avgPosition.toFixed(1)}
          change={-5.2}
          color="gold"
          invertChange
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positions des mots-clés */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg mb-6">Positions des mots-clés</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={positionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="keyword"
                stroke="#9ca3af"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="#9ca3af" fontSize={12} reversed />
              <Tooltip />
              <Bar dataKey="position" fill="#C69C6D" name="Position" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des scores SEO */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg mb-6">Scores SEO des articles</h2>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={seoScoreDistribution.filter(d => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {seoScoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {seoScoreDistribution.map((score) => (
                <div key={score.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: score.color }}
                    />
                    <span className="text-sm text-gray-700">{score.name}</span>
                  </div>
                  <span className="text-sm font-medium">{score.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top mots-clés */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg mb-4">Top 5 mots-clés par clics</h2>
        <div className="space-y-3">
          {topKeywordsByClicks.map((keyword, index) => (
            <div
              key={keyword.keyword}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#C69C6D] transition-colors"
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
              <div className="flex-1">
                <p className="font-medium mb-1">{keyword.keyword}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(keyword.impressions)} impressions
                  </span>
                  <span className="flex items-center gap-1">
                    <MousePointerClick className="w-3 h-3" />
                    {formatNumber(keyword.clicks)} clics
                  </span>
                  <span>CTR: {keyword.ctr.toFixed(2)}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                    keyword.position <= 3
                      ? 'bg-green-100 text-green-700'
                      : keyword.position <= 10
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  #{keyword.position}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-medium ${
                    keyword.change > 0
                      ? 'text-green-600'
                      : keyword.change < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {keyword.change > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : keyword.change < 0 ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {Math.abs(keyword.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations SEO */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg mb-4">Recommandations</h2>
        <div className="space-y-3">
          <RecommendationCard
            type="warning"
            title="Articles sans score SEO"
            description={`${
              publishedArticles.filter(a => !a.seo_score).length
            } articles publiés n'ont pas de score SEO optimisé`}
          />
          <RecommendationCard
            type="info"
            title="Optimisation des mots-clés"
            description="Concentrez-vous sur les mots-clés en position 11-20 pour améliorer leur classement"
          />
          <RecommendationCard
            type="success"
            title="Bonnes performances"
            description={`${
              seoScoreDistribution[0].value
            } articles ont un excellent score SEO`}
          />
        </div>
      </div>
    </div>
  );
}

// Composant de métrique SEO
interface SEOMetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'gold';
  invertChange?: boolean;
}

function SEOMetricCard({
  icon,
  label,
  value,
  change,
  color,
  invertChange
}: SEOMetricCardProps) {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    gold: 'bg-[#C69C6D]'
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

// Composant de recommandation
interface RecommendationCardProps {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

function RecommendationCard({ type, title, description }: RecommendationCardProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      titleColor: 'text-green-900'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
      titleColor: 'text-yellow-900'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <Search className="w-5 h-5 text-blue-600" />,
      titleColor: 'text-blue-900'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        {style.icon}
        <div>
          <p className={`font-medium mb-1 ${style.titleColor}`}>{title}</p>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}