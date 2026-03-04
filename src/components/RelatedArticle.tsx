import { Info } from "lucide-react";
import { Article } from "../data/articles";

interface RelatedArticleProps {
  title: string;
  slug: string;
}

interface RelatedArticleCardProps {
  article: Article;
}

// Inline "À lire aussi" component (utilisé dans le contenu de l'article)
export function RelatedArticle({ title, slug }: RelatedArticleProps) {
  return (
    <div className="my-8 p-6 bg-[#FFF8F0] border-2 border-[#C69C6D]/20 rounded-2xl flex items-start gap-4 hover:border-[#C69C6D]/40 transition-all">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C69C6D] flex items-center justify-center">
        <Info className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 pt-2">
        <span className="text-[#1D1D1D] font-medium">À lire aussi : </span>
        <a 
          href={`/article/${slug}`}
          className="text-[#C69C6D] hover:text-[#B88C5D] underline decoration-2 underline-offset-4 transition-colors font-medium"
        >
          {title}
        </a>
      </div>
    </div>
  );
}

// Card component pour la grille "Articles similaires"
export function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  return (
    <a
      href={`/article/${article.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#C69C6D] hover:shadow-xl transition-shadow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[#1D1D1D] group-hover:text-[#C69C6D] transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
      </div>
    </a>
  );
}