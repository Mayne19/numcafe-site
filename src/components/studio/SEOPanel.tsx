import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  slug: string;
}

interface SEOPanelProps {
  articleTitle: string;
  articleContent: string;
  seoData: SEOData;
  onUpdate: (data: SEOData) => void;
}

export function SEOPanel({ articleTitle, articleContent, seoData, onUpdate }: SEOPanelProps) {
  const [data, setData] = useState<SEOData>(seoData);

  const handleChange = (field: keyof SEOData, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(newData);
  };

  // SEO Score calculation
  const calculateSEOScore = () => {
    let score = 0;
    const checks = [];

    // Meta title (50-60 chars ideal)
    if (data.metaTitle.length >= 50 && data.metaTitle.length <= 60) {
      score += 25;
      checks.push({ label: 'Titre meta optimal', status: 'success' });
    } else if (data.metaTitle.length > 0) {
      checks.push({ label: 'Titre meta trop court/long', status: 'warning' });
    } else {
      checks.push({ label: 'Titre meta manquant', status: 'error' });
    }

    // Meta description (150-160 chars ideal)
    if (data.metaDescription.length >= 150 && data.metaDescription.length <= 160) {
      score += 25;
      checks.push({ label: 'Description meta optimale', status: 'success' });
    } else if (data.metaDescription.length > 0) {
      checks.push({ label: 'Description meta trop courte/longue', status: 'warning' });
    } else {
      checks.push({ label: 'Description meta manquante', status: 'error' });
    }

    // OG Image
    if (data.ogImage) {
      score += 15;
      checks.push({ label: 'Image Open Graph définie', status: 'success' });
    } else {
      checks.push({ label: 'Image Open Graph manquante', status: 'warning' });
    }

    // Slug
    if (data.slug && data.slug.length > 3) {
      score += 10;
      checks.push({ label: 'Slug valide', status: 'success' });
    } else {
      checks.push({ label: 'Slug invalide', status: 'error' });
    }

    // H2 in content
    const hasH2 = articleContent.includes('<h2') || articleContent.includes('## ');
    if (hasH2) {
      score += 15;
      checks.push({ label: 'Titres H2 présents', status: 'success' });
    } else {
      checks.push({ label: 'Aucun titre H2 détecté', status: 'warning' });
    }

    // Content length (min 300 words)
    const wordCount = articleContent.split(/\s+/).length;
    if (wordCount >= 300) {
      score += 10;
      checks.push({ label: `Contenu suffisant (${wordCount} mots)`, status: 'success' });
    } else {
      checks.push({ label: `Contenu trop court (${wordCount} mots)`, status: 'warning' });
    }

    return { score, checks };
  };

  const { score, checks } = calculateSEOScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'warning') return <AlertCircle className="w-4 h-4 text-orange-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-[#C69C6D]" />
          <h2 className="text-lg">Score SEO</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
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
                stroke="#C69C6D"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${score * 2.51} 251`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl ${getScoreColor(score)}`}>{score}</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Optimisation SEO</p>
            <p className={`text-lg ${getScoreColor(score)}`}>
              {score >= 80 ? 'Excellent' : score >= 50 ? 'Bon' : 'À améliorer'}
            </p>
          </div>
        </div>

        {/* Checks */}
        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {getStatusIcon(check.status)}
              <span className="text-gray-700">{check.label}</span>
            </div>
          ))}
        </div>
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
          <p className="text-xs text-gray-500">Optimal: 50-60 caractères</p>
          <p className={`text-xs ${data.metaTitle.length > 60 ? 'text-red-600' : 'text-gray-500'}`}>
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
          maxLength={160}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">Optimal: 150-160 caractères</p>
          <p className={`text-xs ${data.metaDescription.length > 160 ? 'text-red-600' : 'text-gray-500'}`}>
            {data.metaDescription.length}/160
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
        <p className="text-xs text-gray-500 mt-1">Taille recommandée: 1200x630px</p>
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
          <p className="mb-1">
            <strong>Conseils SEO</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Incluez votre mot-clé principal dans le titre et la description</li>
            <li>Utilisez des titres H2 et H3 pour structurer votre contenu</li>
            <li>Rédigez au minimum 300 mots pour un bon référencement</li>
            <li>Optimisez vos images avec des balises alt descriptives</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
