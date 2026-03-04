import { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Lightbulb,
  FileText,
  Type,
  Wand2,
  CheckCircle,
  AlertCircle,
  Settings,
  X,
  Copy,
  RefreshCw
} from 'lucide-react';
import {
  getAIConfig,
  saveAIConfig,
  suggestKeywords,
  suggestTopics,
  generateOutline,
  generateTitles,
  checkPlagiarism,
  AIConfig,
  WritingTone
} from '../../data/aiAssistant';

interface AIAssistantProps {
  onContentGenerated?: (content: string) => void;
  onTitleSelected?: (title: string) => void;
  currentTopic?: string;
  currentContent?: string;
}

export function AIAssistant({
  onContentGenerated,
  onTitleSelected,
  currentTopic = '',
  currentContent = ''
}: AIAssistantProps) {
  const [config, setConfig] = useState<AIConfig>(getAIConfig());
  const [activeTab, setActiveTab] = useState<
    'config' | 'keywords' | 'topics' | 'outline' | 'titles' | 'plagiarism'
  >('keywords');
  const [isLoading, setIsLoading] = useState(false);

  // État pour chaque fonctionnalité
  const [keywordsData, setKeywordsData] = useState<any[]>([]);
  const [topicsData, setTopicsData] = useState<any[]>([]);
  const [outlineData, setOutlineData] = useState<any[]>([]);
  const [titlesData, setTitlesData] = useState<any[]>([]);
  const [plagiarismData, setPlagiarismData] = useState<any>(null);

  // Formulaires
  const [keywordTopic, setKeywordTopic] = useState(currentTopic);
  const [topicCategory, setTopicCategory] = useState('Intelligence artificielle');
  const [outlineTopic, setOutlineTopic] = useState(currentTopic);
  const [outlineKeyword, setOutlineKeyword] = useState('');
  const [outlineTone, setOutlineTone] = useState<WritingTone>('professional');

  const handleSaveConfig = (newConfig: AIConfig) => {
    saveAIConfig(newConfig);
    setConfig(newConfig);
  };

  const handleSearchKeywords = async () => {
    if (!keywordTopic) return;
    setIsLoading(true);
    try {
      const results = await suggestKeywords(keywordTopic, topicCategory);
      setKeywordsData(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTopics = async () => {
    setIsLoading(true);
    try {
      const results = await suggestTopics(topicCategory, []);
      setTopicsData(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateOutline = async () => {
    if (!outlineTopic || !outlineKeyword) return;
    setIsLoading(true);
    try {
      const results = await generateOutline(outlineTopic, outlineKeyword, outlineTone);
      setOutlineData(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTitles = async () => {
    if (!outlineTopic || !outlineKeyword) return;
    setIsLoading(true);
    try {
      const results = await generateTitles(outlineTopic, outlineKeyword);
      setTitlesData(results);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckPlagiarism = async () => {
    if (!currentContent) return;
    setIsLoading(true);
    try {
      const results = await checkPlagiarism(currentContent);
      setPlagiarismData(results);
    } finally {
      setIsLoading(false);
    }
  };

  if (!config.enabled) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Assistant IA non configuré</h3>
          <p className="text-gray-600 mb-6">
            Configurez votre API IA pour bénéficier de l'assistance à la rédaction,
            recherche de mots-clés et génération de contenu.
          </p>
          <button
            onClick={() => setActiveTab('config')}
            className="px-6 py-3 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
          >
            Configurer maintenant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          <TabButton
            active={activeTab === 'keywords'}
            onClick={() => setActiveTab('keywords')}
            icon={<Search className="w-4 h-4" />}
            label="Mots-clés"
          />
          <TabButton
            active={activeTab === 'topics'}
            onClick={() => setActiveTab('topics')}
            icon={<Lightbulb className="w-4 h-4" />}
            label="Sujets"
          />
          <TabButton
            active={activeTab === 'outline'}
            onClick={() => setActiveTab('outline')}
            icon={<FileText className="w-4 h-4" />}
            label="Plan"
          />
          <TabButton
            active={activeTab === 'titles'}
            onClick={() => setActiveTab('titles')}
            icon={<Type className="w-4 h-4" />}
            label="Titres"
          />
          <TabButton
            active={activeTab === 'plagiarism'}
            onClick={() => setActiveTab('plagiarism')}
            icon={<CheckCircle className="w-4 h-4" />}
            label="Unicité"
          />
          <TabButton
            active={activeTab === 'config'}
            onClick={() => setActiveTab('config')}
            icon={<Settings className="w-4 h-4" />}
            label="Configuration"
          />
        </div>
      </div>

      {/* Contenu des tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'config' && (
          <ConfigPanel config={config} onSave={handleSaveConfig} />
        )}

        {activeTab === 'keywords' && (
          <KeywordsPanel
            topic={keywordTopic}
            onTopicChange={setKeywordTopic}
            category={topicCategory}
            onCategoryChange={setTopicCategory}
            keywords={keywordsData}
            onSearch={handleSearchKeywords}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'topics' && (
          <TopicsPanel
            category={topicCategory}
            onCategoryChange={setTopicCategory}
            topics={topicsData}
            onSearch={handleSearchTopics}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'outline' && (
          <OutlinePanel
            topic={outlineTopic}
            onTopicChange={setOutlineTopic}
            keyword={outlineKeyword}
            onKeywordChange={setOutlineKeyword}
            tone={outlineTone}
            onToneChange={setOutlineTone}
            outline={outlineData}
            onGenerate={handleGenerateOutline}
            isLoading={isLoading}
            onContentGenerated={onContentGenerated}
          />
        )}

        {activeTab === 'titles' && (
          <TitlesPanel
            topic={outlineTopic}
            onTopicChange={setOutlineTopic}
            keyword={outlineKeyword}
            onKeywordChange={setOutlineKeyword}
            titles={titlesData}
            onGenerate={handleGenerateTitles}
            isLoading={isLoading}
            onTitleSelected={onTitleSelected}
          />
        )}

        {activeTab === 'plagiarism' && (
          <PlagiarismPanel
            data={plagiarismData}
            onCheck={handleCheckPlagiarism}
            isLoading={isLoading}
            hasContent={!!currentContent}
          />
        )}
      </div>
    </div>
  );
}

// Composants de panels

function ConfigPanel({
  config,
  onSave
}: {
  config: AIConfig;
  onSave: (config: AIConfig) => void;
}) {
  const [formData, setFormData] = useState(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-2">Fournisseur IA</label>
        <select
          value={formData.provider}
          onChange={(e) =>
            setFormData({
              ...formData,
              provider: e.target.value as AIConfig['provider']
            })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        >
          <option value="none">Aucun</option>
          <option value="chatgpt">ChatGPT (OpenAI)</option>
          <option value="claude">Claude (Anthropic)</option>
          <option value="perplexity">Perplexity</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">Clé API</label>
        <input
          type="password"
          value={formData.apiKey}
          onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
          placeholder="sk-..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Votre clé API est stockée localement et n'est jamais partagée
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="enabled"
          checked={formData.enabled}
          onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
          className="rounded border-gray-300 text-[#C69C6D] focus:ring-[#C69C6D]"
        />
        <label htmlFor="enabled" className="text-sm">
          Activer l'assistant IA
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors"
      >
        Enregistrer la configuration
      </button>
    </form>
  );
}

function KeywordsPanel({
  topic,
  onTopicChange,
  category,
  onCategoryChange,
  keywords,
  onSearch,
  isLoading
}: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Sujet</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            placeholder="Ex: intelligence artificielle"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Catégorie</label>
          <input
            type="text"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
      </div>

      <button
        onClick={onSearch}
        disabled={isLoading || !topic}
        className="flex items-center gap-2 px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
        Rechercher des mots-clés
      </button>

      {keywords.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-sm">Mot-clé</th>
                  <th className="text-right py-2 px-3 text-sm">Volume</th>
                  <th className="text-right py-2 px-3 text-sm">Difficulté</th>
                  <th className="text-right py-2 px-3 text-sm">CPC</th>
                  <th className="text-right py-2 px-3 text-sm">Pertinence</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((kw: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2 px-3 text-sm">{kw.keyword}</td>
                    <td className="py-2 px-3 text-sm text-right">{kw.volume}</td>
                    <td className="py-2 px-3 text-sm text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          kw.difficulty < 40
                            ? 'bg-green-100 text-green-700'
                            : kw.difficulty < 60
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-sm text-right">{kw.cpc}€</td>
                    <td className="py-2 px-3 text-sm text-right">{kw.relevance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function TopicsPanel({ category, onCategoryChange, topics, onSearch, isLoading }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-2">Catégorie</label>
        <input
          type="text"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        />
      </div>

      <button
        onClick={onSearch}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Lightbulb className="w-4 h-4" />
        )}
        Générer des idées de sujets
      </button>

      {topics.length > 0 && (
        <div className="border-t border-gray-200 pt-4 space-y-3">
          {topics.map((topic: any, idx: number) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium flex-1">{topic.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Score: {topic.potentialScore}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      topic.competitionLevel === 'low'
                        ? 'bg-green-100 text-green-700'
                        : topic.competitionLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {topic.competitionLevel}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OutlinePanel({
  topic,
  onTopicChange,
  keyword,
  onKeywordChange,
  tone,
  onToneChange,
  outline,
  onGenerate,
  isLoading,
  onContentGenerated
}: any) {
  const handleUseOutline = () => {
    const content = outline
      .map((section: any) => `<${section.type}>${section.title}</${section.type}>\n<p>${section.description}</p>`)
      .join('\n\n');
    onContentGenerated?.(content);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Sujet de l'article</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Mot-clé principal</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">Ton de l'article</label>
        <select
          value={tone}
          onChange={(e) => onToneChange(e.target.value as WritingTone)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
        >
          <option value="professional">Professionnel</option>
          <option value="conversational">Conversationnel</option>
          <option value="humorous">Humoristique</option>
          <option value="technical">Technique</option>
          <option value="casual">Décontracté</option>
        </select>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !topic || !keyword}
        className="flex items-center gap-2 px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        Générer un plan
      </button>

      {outline.length > 0 && (
        <div className="border-t border-gray-200 pt-4 space-y-2">
          {outline.map((section: any, idx: number) => (
            <div
              key={idx}
              className={`p-3 border-l-4 ${
                section.type === 'h1'
                  ? 'border-[#C69C6D] bg-[#C69C6D] bg-opacity-5'
                  : section.type === 'h2'
                  ? 'border-blue-500 bg-blue-50 ml-4'
                  : 'border-gray-300 bg-gray-50 ml-8'
              }`}
            >
              <p className="font-medium mb-1">{section.title}</p>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>
          ))}
          <button
            onClick={handleUseOutline}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            Utiliser ce plan
          </button>
        </div>
      )}
    </div>
  );
}

function TitlesPanel({
  topic,
  onTopicChange,
  keyword,
  onKeywordChange,
  titles,
  onGenerate,
  isLoading,
  onTitleSelected
}: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-2">Sujet</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Mot-clé</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
          />
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !topic || !keyword}
        className="flex items-center gap-2 px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <Type className="w-4 h-4" />
        )}
        Générer des titres
      </button>

      {titles.length > 0 && (
        <div className="border-t border-gray-200 pt-4 space-y-2">
          {titles.map((title: any, idx: number) => (
            <div
              key={idx}
              className="p-3 border border-gray-200 rounded-lg hover:border-[#C69C6D] hover:bg-[#C69C6D] hover:bg-opacity-5 transition-colors cursor-pointer"
              onClick={() => onTitleSelected?.(title.title)}
            >
              <div className="flex items-center justify-between">
                <p className="flex-1">{title.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Score: {title.score}</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {title.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlagiarismPanel({ data, onCheck, isLoading, hasContent }: any) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Vérifiez l'unicité de votre contenu pour vous assurer qu'il n'est pas dupliqué
        ailleurs sur le web.
      </p>

      <button
        onClick={onCheck}
        disabled={isLoading || !hasContent}
        className="flex items-center gap-2 px-6 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        Vérifier l'unicité
      </button>

      {data && (
        <div className="border-t border-gray-200 pt-4">
          <div
            className={`p-6 rounded-lg ${
              data.uniqueness >= 90
                ? 'bg-green-50 border-2 border-green-500'
                : data.uniqueness >= 75
                ? 'bg-yellow-50 border-2 border-yellow-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {data.uniqueness >= 90 ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-orange-600" />
              )}
              <div>
                <p className="text-2xl font-semibold">{data.uniqueness}%</p>
                <p className="text-sm">Contenu unique</p>
              </div>
            </div>

            {data.sources.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Sources similaires détectées :</p>
                <ul className="space-y-1">
                  {data.sources.map((source: any, idx: number) => (
                    <li key={idx} className="text-sm flex items-center justify-between">
                      <span className="truncate">{source.url}</span>
                      <span className="text-orange-600 font-medium ml-2">
                        {source.similarity}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-[#C69C6D] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
