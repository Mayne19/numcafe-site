import coffeeIcon from "figma:asset/7144e1968d926663741218e5a60ae530189746ac.png";
import coffeeBullet from "figma:asset/6344bb84b68e22c4c443ddb47f5bb06ee02ab43f.png";
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Coffee, User } from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SocialShare } from './SocialShare';
import { NewsletterSubscribe } from './NewsletterSubscribe';
import { Comments } from './Comments';
import { AuthorBio } from './AuthorBio';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useMemo } from 'react';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const article = getArticleBySlug(slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = getRelatedArticles(article.id, article.category);

  const contentWithAd = useMemo(() => {
    const adBanner = `
<div data-promo="numcafe" style="margin: 2rem 0; padding: 1.25rem; background: #fff; border: 1px solid rgba(198,156,109,.35); border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,.08);">
  <div style="display:flex; align-items:flex-start; gap: 1rem;">
    <div style="flex:0 0 auto; width:48px; height:48px; background:#C69C6D; border-radius:999px; display:flex; align-items:center; justify-content:center; color:#fff;">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    </div>
    <div style="flex:1;">
      <p style="margin:0; color:#1D1D1D; line-height:1.6;">
        Sur Numcafé, trouvez rapidement des
        <a href="/blog" style="color:#C69C6D; text-decoration:underline; text-underline-offset:4px; font-weight:500;">
          guides et tendances tech pour rester à jour.
        </a>
      </p>
      <p style="margin:8px 0 0; font-size:12px; opacity:.65;">(debug: promo injectée ✅)</p>
    </div>
  </div>
</div>
`;

    const c = article.content || "";

    // 1) Si HTML avec <p>...</p>
    const htmlP = c.indexOf("</p>");
    if (htmlP !== -1) {
      return c.slice(0, htmlP + 4) + adBanner + c.slice(htmlP + 4);
    }

    // 2) Si Markdown: première séparation de paragraphe
    const mdSep = c.indexOf("\n\n");
    if (mdSep !== -1) {
      return c.slice(0, mdSep) + "\n\n" + adBanner + "\n\n" + c.slice(mdSep + 2);
    }

    // 3) Fallback: on ajoute au début
    return adBanner + "\n\n" + c;
  }, [article.content]);

  return (
    <div className="min-h-screen bg-white">
      {/* Back button */}
      <div className="bg-[#F5F5F5] py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C69C6D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>

      {/* Article Header Image */}
      <div className="w-full aspect-[21/9] overflow-hidden">
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-6xl mx-auto px-6 py-12">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
          <span 
            className="px-4 py-1.5 rounded-full inline-flex items-center gap-2"
            style={{ backgroundColor: '#C69C6D', color: '#FFFFFF' }}
          >
            <Tag className="w-4 h-4" />
            {article.category}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(article.date).toLocaleDateString('fr-FR', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {article.readTime} de lecture
          </span>
          <a 
            href="#author"
            className="flex items-center gap-2 hover:text-[#C69C6D] transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('author')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <User className="w-4 h-4" />
            Par Mayne
          </a>
        </div>

        {/* Title */}
        <h1 className="mb-8">{article.title}</h1>

        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-12 leading-relaxed border-l-4 border-[#C69C6D] pl-6 italic">
          {article.excerpt}
        </p>

        {/* NEW PROMO BLOCK (Coffee/Brand style) */}
        {/* NEW PROMO BLOCK (Numcafé) */}
        <div
          style={{
            position: "relative",
            background: "#FCF8F4",
            border: "1px solid rgba(198, 156, 109, 0.4)",
            borderRadius: 16,
            padding: "18px 22px 18px 48px",
            margin: "32px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -14,
              left: -14,
              width: 36,
              height: 36,
              background: "#C69C6D",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              zIndex: 10,
            }}
          >
            {/* Lucide Coffee SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" y1="2" x2="6" y2="4" />
              <line x1="10" y1="2" x2="10" y2="4" />
              <line x1="14" y1="2" x2="14" y2="4" />
            </svg>
          </div>
        
          <p style={{ margin: 0, color: "#4B4B4B", lineHeight: 1.6 }}>
            Sur Numcafé, trouvez rapidement des guides et tendances tech pour rester à jour.{" "}
            <a
              href="/blog"
              style={{
                color: "#C69C6D",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#B88C5D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C69C6D")}
            >
              Voir tous nos articles.
            </a>
          </p>
        </div>


        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ children }) => (
                <h2 className="mt-12 mb-4 pb-2 border-b border-gray-200">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 text-gray-700 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 space-y-2 ml-6">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-[#555555] leading-relaxed flex items-start gap-2">
                  <img src={coffeeBullet} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold" style={{ color: '#1D1D1D' }}>
                  {children}
                </strong>
              ),
            }}
          >
            {contentWithAd}
          </ReactMarkdown>
        </div>

        {/* Share section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <SocialShare 
            title={article.title}
            url={`/article/${article.slug}`}
            description={article.excerpt}
          />
        </div>

        {/* Newsletter subscribe */}
        <div className="mt-16">
          <NewsletterSubscribe />
        </div>

        {/* Author Bio */}
        <div className="mt-16">
          <AuthorBio 
            name="Mayne"
            bio="Depuis plus de 10 ans, je contribue à faire rayonner nos sites en imaginant des stratégies qui renforcent notre visibilité et notre position de référence dans l'univers du digital, de la tech et de l'IA."
          />
        </div>

        {/* Comments */}
        <div className="mt-16">
          <Comments articleSlug={article.slug} />
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F5F5F5] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="mb-8">Articles similaires</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <article 
                  key={relatedArticle.id} 
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link to={`/article/${relatedArticle.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <ImageWithFallback
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span 
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ backgroundColor: '#C69C6D', color: '#FFFFFF' }}
                      >
                        {relatedArticle.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {relatedArticle.readTime}
                      </span>
                    </div>
                    
                    <Link to={`/article/${relatedArticle.slug}`}>
                      <h3 className="mb-3 hover:text-[#C69C6D] transition-colors">
                        {relatedArticle.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <Link 
                      to={`/article/${relatedArticle.slug}`}
                      className="inline-flex items-center gap-2 text-[#1D1D1D] hover:gap-3 transition-all font-medium"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}