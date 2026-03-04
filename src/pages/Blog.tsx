import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Clock, Sparkles, Palette, Code, Brain, Coffee, Search, Share2, ShoppingCart } from "lucide-react";
import { getCategoryColor, articles as staticArticles } from "../data/articles";
import { SEOHead } from "../components/SEOHead";
import { CategoryDescription } from "../components/CategoryDescription";

export function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  // Sync with URL params on mount and when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("Tous");
    }
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
    { name: "E-commerce & Marketing Digital", icon: ShoppingCart, color: "#06B6D4" }
  ];

  const filteredArticles = staticArticles.filter((article) => {
    if (selectedCategory === "Tous") return true;
    return article.category === selectedCategory;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === "Tous") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-[#FAF7F4] via-white to-[#FAF7F4] min-h-screen relative overflow-hidden">
      <SEOHead 
        title="Blog Numcafé - Actualité Numérique, Intelligence Artificielle & Guides Tech"
        description="Explorez nos articles sur l'actualité numérique, l'intelligence artificielle, les outils IA gratuits et les tendances tech 2025. Guides numériques et innovations expliquées simplement."
        keywords="actualité numérique, intelligence artificielle, tendances tech, culture digitale, outils IA gratuits, guides numériques, innovations tech, futur du numérique, tech 2025, outils et astuces"
        canonical="https://numcafe.com/blog"
      />
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#C69C6D] opacity-5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 relative">
          {/* Geometric illustrations - hidden on mobile */}
          <div className="hidden md:block absolute -top-10 left-1/4 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="25" stroke="#C69C6D" strokeWidth="3" />
              <circle cx="30" cy="30" r="15" fill="#C69C6D" opacity="0.3" />
            </svg>
          </div>
          
          <div className="hidden md:block absolute -top-5 right-1/4 opacity-20">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="30" height="30" stroke="#C69C6D" strokeWidth="3" transform="rotate(45 25 25)" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D1D1D] mb-3 md:mb-4 px-4">
            Blog - Actualité Numérique & Tendances Tech
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explorez nos articles sur l'actualité numérique, l'intelligence artificielle, les outils IA et la culture digitale.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`relative group overflow-hidden rounded-xl px-3 md:px-4 py-2 md:py-2.5 transition-all touch-manipulation ${
                  isSelected
                    ? "bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:shadow-md border-2 border-gray-200 hover:border-[#C69C6D]"
                }`}
              >
                {/* Icon and text inline */}
                <div className={`flex items-center gap-1.5 md:gap-2 ${isSelected ? 'text-white' : ''}`}>
                  {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: isSelected ? 'white' : category.color }} />}
                  <p className={`text-xs md:text-sm font-semibold whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </p>
                </div>
                
                {/* Bottom accent bar */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{ backgroundColor: category.color }}
                ></div>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <CategoryDescription selectedCategory={selectedCategory} />

        {/* Display number of articles found */}
        <div className="text-center mb-6 px-4">
          <p className="text-sm text-gray-500">
            {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:shadow-2xl hover:border-[#C69C6D] transition-all flex flex-col h-full"
              >
                <a
                  href={`/article/${article.slug}`}
                  className="block"
                >
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </a>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  {article.category && (
                    <div className="flex items-start mb-3">
                      <span 
                        className={`text-xs px-3 py-1 rounded-full font-bold ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </span>
                    </div>
                  )}
                  <a href={`/article/${article.slug}`}>
                    <h3 className="text-base md:text-lg font-semibold text-[#1D1D1D] mb-2 md:mb-3 group-hover:text-[#C69C6D] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </a>
                  {article.excerpt && (
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                  )}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">{new Date(article.date).toLocaleDateString("fr-FR")}</span>
                        <span className="sm:hidden">{new Date(article.date).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}</span>
                      </div>
                      {article.readTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-[#1D1D1D] text-white rounded-lg hover:bg-[#2D2D2D] transition-all hover:gap-2 whitespace-nowrap text-xs md:text-sm font-medium w-full sm:w-auto justify-center"
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
            <p className="text-gray-600 text-base">Aucun article disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}