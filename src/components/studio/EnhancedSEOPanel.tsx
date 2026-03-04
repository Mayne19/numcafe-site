import { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';
import {
  analyzeSEO,
  getScoreColor,
  getScoreLabel,
  SEOData,
  SEOAnalysis,
} from '../../data/seoPlugin';

interface EnhancedSEOPanelProps {
  articleTitle: string;
  articleContent: string;
  seoData: SEOData;
  onUpdate: (data: SEOData) => void;
}

export function EnhancedSEOPanel({
  articleTitle,
  articleContent,
  seoData,
  onUpdate,
}: EnhancedSEOPanelProps) {
  const [data, setData] = useState<SEOData>(seoData);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  useEffect(() => {
    setData(seoData);
  }, [seoData]);

  useEffect(() => {
    // Analyser le SEO à chaque changement
    const result = analyzeSEO(articleTitle, articleContent, data);
    setAnalysis(result);
  }, [articleTitle, articleContent, data]);

  const handleChange = (field: keyof SEOData, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    if (status === 'pass')
      return <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />;
    if (status === 'warning')
      return <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />;
    return <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />;
  };

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* SEO Score Card */}
      <div className="bg-white border-2 rounded-xl p-6" style={{ borderColor: getScoreColor(analysis.score) }}>
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6" style={{ color: getScoreColor(analysis.score) }} />
          <h2 className="text-lg">Analyse SEO</h2>
        </div>

        <div className="flex items-center gap-6 mb-6">
          {/* Score Circle */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke={getScoreColor(analysis.score)}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${analysis.percentage * 2.51} 251`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: getScoreColor(analysis.score) }}>
                {analysis.percentage}
              </span>
            </div>
          </div>

          {/* Score Info */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Score SEO</p>
            <p className="text-2xl mb-1" style={{ color: getScoreColor(analysis.score) }}>
              {getScoreLabel(analysis.score)}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>
                {analysis.checks.filter((c) => c.status === 'pass').length} validé
                {analysis.checks.filter((c) => c.status === 'pass').length > 1 ? 's' : ''}
              </span>
              <span>•</span>
              <span>
                {analysis.checks.filter((c) => c.status === 'warning').length} avertissement
                {analysis.checks.filter((c) => c.status === 'warning').length > 1 ? 's' : ''}
              </span>
              <span>•</span>
              <span>
                {analysis.checks.filter((c) => c.status === 'fail').length} échec
                {analysis.checks.filter((c) => c.status === 'fail').length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Checks List */}
        <div className="space-y-2.5 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recommandations</h3>
          {analysis.checks.map((check) => (
            <div key={check.id} className="flex items-start gap-3">
              {getStatusIcon(check.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{check.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{check.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Keyword */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">
          Mot-clé principal <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.focusKeyword}
          onChange={(e) => handleChange('focusKeyword', e.target.value)}
          placeholder="intelligence artificielle"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Le mot-clé principal sur lequel vous souhaitez vous positionner
        </p>
      </div>

      {/* Meta Title */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">
          Titre meta (balise title)
        </label>
        <input
          type="text"
          value={data.metaTitle}
          onChange={(e) => handleChange('metaTitle', e.target.value)}
          placeholder={articleTitle}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          maxLength={70}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">Optimal: 40-60 caractères</p>
          <p
            className={`text-xs ${
              data.metaTitle.length > 60 ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {data.metaTitle.length}/70
          </p>
        </div>
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">
          Description meta
        </label>
        <textarea
          value={data.metaDescription}
          onChange={(e) => handleChange('metaDescription', e.target.value)}
          placeholder="Courte description de l'article..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          maxLength={200}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">Optimal: 120-160 caractères</p>
          <p
            className={`text-xs ${
              data.metaDescription.length > 160 ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            {data.metaDescription.length}/200
          </p>
        </div>
      </div>

      {/* OG Image */}
      <div>
        <label className="block text-sm mb-2 text-gray-700">
          Image Open Graph (partage social)
        </label>
        <input
          type="text"
          value={data.ogImage}
          onChange={(e) => handleChange('ogImage', e.target.value)}
          placeholder="https://exemple.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Taille recommandée: 1200x630px
        </p>
        {data.ogImage && (
          <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={data.ogImage}
              alt="Preview OG"
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="mb-2">
            <strong>Conseils pour optimiser votre SEO</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Incluez votre mot-clé dans les 100 premiers mots</li>
            <li>Utilisez des variantes de votre mot-clé naturellement</li>
            <li>Structurez avec des H2, H3 pour la lisibilité</li>
            <li>Ajoutez des liens internes vers d'autres articles pertinents</li>
            <li>Optimisez les images avec des balises alt descriptives</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
