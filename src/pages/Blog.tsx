import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Clock, Sparkles, Palette, Code, Brain, Coffee, Search, Share2 } from "lucide-react";
import { getCategoryColor } from "../data/articles";
import { SEOHead } from "../components/SEOHead";
import { CategoryDescription } from "../components/CategoryDescription";
import { fetchArticlesFromGitHub } from "../lib/githubClient";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  image: string;
  published_at: string;
}

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchArticlesFromGitHub();
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    setSelectedCategory(categoryFromUrl || "Tous");
  }, [searchParams]);

  const categories = [
    { name: "Tous", icon: null, color: "#C69C6D" },
    { name: "Culture Digitale", icon: Sparkles, color: "#8B5CF6" },
    { name: "Design & UX", icon: Palette, color: "#EC4899" },
    { name: "Développement Web", icon: Code, color: "#3B82F6" },
    { name: "Intelligence Artificielle", icon: Brain, color: "#10B981" },
    { name: "Productivité & Café", icon: Coffee, color: "#C69C6D" },
    { name: "SEO & Référencement", icon: Search, color: "#F59E0B" },
    { name: "Réseaux sociaux", icon: Share2, color: "#EF4444" },
  ];

  const filteredArticles = articles.filter((article) =>
    selectedCategory === "Tous" ? true : article.category === selectedCategory
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === "Tous") setSearchParams({});
    else setSearchParams({ category });
  };

  return (
    <div className="py-16 bg-gradient-to-br from-[#FAF7F4] via-white to-[#FAF7F4] min-h-screen relative overflow-hidden">
      <SEOHead
        title="Blog Numcafé - Actualité Numérique, Intelligence Artificielle & Guides Tech"
        description="Explorez nos articles sur l'actualité numérique, l'intelligence artificielle, les outils IA gratuits et les tendances tech 2025."
        keywords="actualité numérique, intelligence artificielle, tendances tech, culture digitale"
        canonical="https://numcafe.com/blog"
      />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D1D1D] mb-3 md:mb-4">
            Blog - Actualité Numérique & Tendances Tech
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explorez nos articles sur l'actualité numérique, l'intelligence artificielle, les outils IA et la culture digitale.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative group overflow-hidden rounded-xl px-3 md:px-4 py-2 md:py-2.5 transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:shadow-md border-2 border-gray-200 hover:border-[#C69C6D]"
                }`}
              >
                <div className="flex items-center gap-1.5 md:gap-2">
                  {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: isSelected ? "white" : category.color }} />}
                  <p className={`text-xs md:text-sm font-semibold whitespace-nowrap ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {category.name}
                  </p>
                </div>
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{ backgroundColor: category.color }}
                ></div>
              </button>
            );
          })}
        </div>

        <CategoryDescription selectedCategory={selectedCategory} />

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouvé{filteredArticles.length > 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Chargement des articles...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.slug}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-[#C69C6D] transition-all flex flex-col h-full"
              >
                <a href={`/article/${article.slug}`} className="block">
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}
                </a>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  {article.category && (
                    <div className="flex items-start mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  )}
                  <a href={`/article/${article.slug}`}>
                    <h3 className="text-base md:text-lg font-semibold text-[#1D1D1D] mb-2 group-hover:text-[#C69C6D] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </a>
                  {article.excerpt && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(article.published_at).toLocaleDateString("fr-FR")}</span>
                      </div>
                      {article.read_time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{article.read_time}</span>
                        </div>
                      )}
                    </div>
                    
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center px-4 py-2 bg-[#1D1D1D] text-white rounded-lg hover:bg-[#2D2D2D] transition-all text-xs font-medium"
                    >
                      Lire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">Aucun article disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
