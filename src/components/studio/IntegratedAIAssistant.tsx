import { useState } from 'react';
import { Sparkles, Search, FileText, Target, Lightbulb, Wand2, CheckCircle2, AlertCircle } from 'lucide-react';

interface IntegratedAIAssistantProps {
  articleContent: string;
  articleTitle: string;
  category: string;
  onInsertContent: (content: string) => void;
  onUpdateTitle: (title: string) => void;
}

type AssistantMode = 'keywords' | 'topics' | 'outline' | 'titles' | 'content' | 'plagiarism';

export function IntegratedAIAssistant({ 
  articleContent, 
  articleTitle, 
  category,
  onInsertContent,
  onUpdateTitle
}: IntegratedAIAssistantProps) {
  const [mode, setMode] = useState<AssistantMode>('keywords');
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<'professional' | 'conversational' | 'humorous' | 'technical'>('professional');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const modes = [
    { value: 'keywords', label: 'Mots-clés', icon: Search, color: 'bg-blue-100 text-blue-600' },
    { value: 'topics', label: 'Sujets', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600' },
    { value: 'outline', label: 'Plan', icon: FileText, color: 'bg-green-100 text-green-600' },
    { value: 'titles', label: 'Titres', icon: Target, color: 'bg-purple-100 text-purple-600' },
    { value: 'content', label: 'Rédaction', icon: Wand2, color: 'bg-pink-100 text-pink-600' },
    { value: 'plagiarism', label: 'Unicité', icon: CheckCircle2, color: 'bg-orange-100 text-orange-600' }
  ];

  const tones = [
    { value: 'professional', label: 'Professionnel' },
    { value: 'conversational', label: 'Conversationnel' },
    { value: 'humorous', label: 'Humoristique' },
    { value: 'technical', label: 'Technique' }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simuler la génération IA (en production, connecter à une vraie API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let generatedResults: any[] = [];
    
    switch (mode) {
      case 'keywords':
        generatedResults = [
          { keyword: 'intelligence artificielle', volume: 12000, difficulty: 65, trend: 'up' },
          { keyword: 'chatgpt', volume: 45000, difficulty: 75, trend: 'up' },
          { keyword: 'ia générative', volume: 8500, difficulty: 55, trend: 'up' },
          { keyword: 'machine learning', volume: 22000, difficulty: 70, trend: 'stable' },
          { keyword: 'deep learning', volume: 15000, difficulty: 68, trend: 'up' },
          { keyword: 'nlp français', volume: 3200, difficulty: 45, trend: 'up' },
          { keyword: 'automatisation ia', volume: 5600, difficulty: 50, trend: 'up' },
          { keyword: 'éthique ia', volume: 2800, difficulty: 40, trend: 'up' }
        ];
        break;
        
      case 'topics':
        generatedResults = [
          { 
            title: 'Comment l\'IA transforme le marketing digital en 2026',
            potential: 'Élevé',
            competition: 'Moyenne',
            keywords: ['ia marketing', 'automatisation', 'personnalisation']
          },
          {
            title: 'Guide complet des outils IA pour créateurs de contenu',
            potential: 'Très élevé',
            competition: 'Faible',
            keywords: ['outils ia', 'création contenu', 'productivité']
          },
          {
            title: 'ChatGPT vs autres IA : comparatif détaillé 2026',
            potential: 'Élevé',
            competition: 'Élevée',
            keywords: ['chatgpt', 'comparaison ia', 'meilleure ia']
          }
        ];
        break;
        
      case 'outline':
        generatedResults = [
          {
            structure: [
              { level: 'h1', text: articleTitle || 'Titre de l\'article' },
              { level: 'h2', text: 'Introduction : Pourquoi ce sujet est important ?' },
              { level: 'h2', text: 'Qu\'est-ce que ' + (category || 'le sujet') + ' ?' },
              { level: 'h3', text: 'Définition et contexte' },
              { level: 'h3', text: 'Historique et évolution' },
              { level: 'h2', text: 'Les principaux avantages' },
              { level: 'h3', text: 'Pour les entreprises' },
              { level: 'h3', text: 'Pour les particuliers' },
              { level: 'h2', text: 'Comment commencer ?' },
              { level: 'h3', text: 'Étape 1 : Préparation' },
              { level: 'h3', text: 'Étape 2 : Mise en œuvre' },
              { level: 'h3', text: 'Étape 3 : Optimisation' },
              { level: 'h2', text: 'Erreurs courantes à éviter' },
              { level: 'h2', text: 'Outils et ressources recommandés' },
              { level: 'h2', text: 'Conclusion et prochaines étapes' }
            ]
          }
        ];
        break;
        
      case 'titles':
        generatedResults = [
          'Comment maîtriser ' + category + ' en 2026 : guide complet',
          category + ' : 10 astuces que personne ne vous dira',
          'Le guide ultime du ' + category + ' pour débutants',
          'Pourquoi ' + category + ' va transformer votre business',
          category + ' : tout ce que vous devez savoir en 2026',
          '7 erreurs fatales à éviter avec ' + category,
          'De zéro à expert en ' + category + ' : le parcours complet',
          category + ' : les secrets des pros enfin révélés'
        ];
        break;
        
      case 'content':
        generatedResults = [{
          content: `<h2>Introduction</h2>
<p>Dans le paysage numérique en constante évolution de 2026, ${category} s'impose comme un élément incontournable pour toute stratégie digitale réussie. Ce guide vous accompagne à travers les aspects essentiels pour maîtriser ce domaine.</p>

<h2>Pourquoi ${category} est crucial aujourd'hui</h2>
<p>Les tendances récentes montrent une adoption massive de ${category} par les entreprises de toutes tailles. Voici pourquoi vous devez vous y intéresser dès maintenant :</p>

<ul class="coffee-list">
  <li>Augmentation significative du ROI sur le long terme</li>
  <li>Amélioration de l'expérience utilisateur et de la satisfaction client</li>
  <li>Gain de temps considérable grâce à l'automatisation</li>
  <li>Avantage concurrentiel mesurable sur votre marché</li>
</ul>

<h2>Les fondamentaux à maîtriser</h2>
<p>Pour réussir dans ${category}, vous devez comprendre ces concepts clés. Nous allons explorer chacun d'eux en détail pour vous donner une base solide.</p>

<p><em>Contenu généré par IA - À personnaliser selon vos besoins</em></p>`
        }];
        break;
        
      case 'plagiarism':
        const uniqueness = 92 + Math.floor(Math.random() * 8); // 92-99%
        generatedResults = [{
          uniqueness,
          status: uniqueness >= 90 ? 'excellent' : uniqueness >= 70 ? 'good' : 'warning',
          similarSources: uniqueness < 90 ? [
            { url: 'example.com/article1', similarity: 8 },
            { url: 'example.com/article2', similarity: 5 }
          ] : []
        }];
        break;
    }
    
    setResults(generatedResults);
    setGenerating(false);
  };

  const handleInsert = (content: string) => {
    onInsertContent(content);
  };

  const handleUseTitle = (title: string) => {
    onUpdateTitle(title);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Assistant IA</h2>
          <p className="text-sm text-gray-500">Optimisez votre contenu avec l'intelligence artificielle</p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value as AssistantMode)}
            className={`p-3 rounded-lg border-2 transition-all ${
              mode === m.value
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-8 h-8 ${m.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <m.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-900">{m.label}</p>
          </button>
        ))}
      </div>

      {/* Prompt input */}
      {mode === 'content' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Demande à l'IA
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez ce que vous souhaitez générer..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ton de l'article
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tone === t.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {generating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Générer avec l'IA
          </>
        )}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900">Résultats</h3>
          
          {mode === 'keywords' && (
            <div className="space-y-2">
              {results.map((kw, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{kw.keyword}</p>
                    <p className="text-sm text-gray-500">
                      Vol: {kw.volume.toLocaleString()} · Diff: {kw.difficulty}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleInsert(kw.keyword)}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
                  >
                    Utiliser
                  </button>
                </div>
              ))}
            </div>
          )}

          {mode === 'topics' && (
            <div className="space-y-3">
              {results.map((topic, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{topic.title}</h4>
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      Potentiel: {topic.potential}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      Compétition: {topic.competition}
                    </span>
                  </div>
                  <button
                    onClick={() => handleUseTitle(topic.title)}
                    className="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm mt-2"
                  >
                    Utiliser ce sujet
                  </button>
                </div>
              ))}
            </div>
          )}

          {mode === 'outline' && results[0] && (
            <div className="space-y-2">
              {results[0].structure.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    item.level === 'h1' ? 'bg-purple-100 font-semibold' :
                    item.level === 'h2' ? 'bg-blue-50 ml-4' :
                    'bg-gray-50 ml-8'
                  }`}
                >
                  <span className="text-xs text-gray-500 mr-2">{item.level.toUpperCase()}</span>
                  {item.text}
                </div>
              ))}
              <button
                onClick={() => {
                  const outline = results[0].structure
                    .map((item: any) => `<${item.level}>${item.text}</${item.level}>`)
                    .join('\n');
                  handleInsert(outline);
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-4"
              >
                Insérer ce plan
              </button>
            </div>
          )}

          {mode === 'titles' && (
            <div className="space-y-2">
              {results.map((title, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <p className="flex-1 font-medium text-gray-900">{title}</p>
                  <button
                    onClick={() => handleUseTitle(title)}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 ml-2"
                  >
                    Utiliser
                  </button>
                </div>
              ))}
            </div>
          )}

          {mode === 'content' && results[0] && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div dangerouslySetInnerHTML={{ __html: results[0].content }} />
              </div>
              <button
                onClick={() => handleInsert(results[0].content)}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Insérer ce contenu
              </button>
            </div>
          )}

          {mode === 'plagiarism' && results[0] && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                {results[0].status === 'excellent' ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                )}
                <div>
                  <p className="font-semibold text-lg text-gray-900">
                    Unicité: {results[0].uniqueness}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {results[0].status === 'excellent' 
                      ? 'Excellent ! Votre contenu est hautement unique.'
                      : 'Quelques similarités détectées.'}
                  </p>
                </div>
              </div>
              {results[0].similarSources.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Sources similaires :</p>
                  {results[0].similarSources.map((source: any, index: number) => (
                    <div key={index} className="text-sm text-gray-600">
                      • {source.url} ({source.similarity}% de similarité)
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
