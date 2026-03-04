import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Mail, Instagram, Facebook, User, Send, Linkedin, ChevronDown } from "lucide-react";
import { getCategoryColor, articles as staticArticles, Article } from "../data/articles";
import { getAuthor } from "../data/authors";
import { AuthorModal } from "../components/AuthorModal";
import { AuthorBio } from "../components/AuthorBio";
import { RelatedArticleCard } from "../components/RelatedArticle";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";
import { getArticleComments, countTotalComments, initialLikes, initialDislikes, Comment as CommentType } from "../data/comments";
import { CommentItem } from "../components/CommentItem";
import xLogo from "figma:asset/d94dae558bdbb03d41eeb901a581c8cd90987c2c.png";

// Helper to calculate time ago
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "il y a quelques secondes";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  const years = Math.floor(months / 12);
  return `il y a ${years} an${years > 1 ? 's' : ''}`;
}

// Helper to convert Markdown to HTML
function convertMarkdownToHTML(content: string): string {
  // If already contains HTML tags, return as is
  if (content.includes('<h2>') || content.includes('<p>') || content.includes('<table')) {
    return content;
  }
  
  let html = content;
  
  // Split by double newlines to process blocks
  const blocks = html.split('\n\n');
  const processedBlocks: string[] = [];
  
  let inList = false;
  let inOrderedList = false;
  let listItems: string[] = [];
  
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i].trim();
    
    if (!block) continue;
    
    // Check if this is an unordered list item (starts with - or *)
    if (block.match(/^[-*]\s+/)) {
      // Start collecting list items
      const lines = block.split('\n');
      for (const line of lines) {
        if (line.match(/^[-*]\s+/)) {
          const item = line.replace(/^[-*]\s+/, '').trim();
          listItems.push(`  <li>${item}</li>`);
          inList = true;
        }
      }
      
      // Check if next block is also a list
      const nextBlock = i + 1 < blocks.length ? blocks[i + 1].trim() : '';
      if (!nextBlock.match(/^[-*]\s+/)) {
        // End of list, output it
        processedBlocks.push('<ul class="coffee-list">\n' + listItems.join('\n') + '\n</ul>');
        listItems = [];
        inList = false;
      }
      continue;
    }
    
    // Check if this is an ordered list item (starts with number.)
    if (block.match(/^\d+\.\s+/)) {
      // Start collecting ordered list items
      const lines = block.split('\n');
      for (const line of lines) {
        if (line.match(/^\d+\.\s+/)) {
          const item = line.replace(/^\d+\.\s+/, '').trim();
          listItems.push(`  <li>${item}</li>`);
          inOrderedList = true;
        }
      }
      
      // Check if next block is also an ordered list
      const nextBlock = i + 1 < blocks.length ? blocks[i + 1].trim() : '';
      if (!nextBlock.match(/^\d+\.\s+/)) {
        // End of ordered list, output it
        processedBlocks.push('<ol class="coffee-list-ordered">\n' + listItems.join('\n') + '\n</ol>');
        listItems = [];
        inOrderedList = false;
      }
      continue;
    }
    
    // If we were in a list and this block is not a list item, close the list
    if (inList && !block.match(/^[-*]\s+/)) {
      processedBlocks.push('<ul class="coffee-list">\n' + listItems.join('\n') + '\n</ul>');
      listItems = [];
      inList = false;
    }
    
    if (inOrderedList && !block.match(/^\d+\.\s+/)) {
      processedBlocks.push('<ol class="coffee-list-ordered">\n' + listItems.join('\n') + '\n</ol>');
      listItems = [];
      inOrderedList = false;
    }
    
    // Process headers
    if (block.startsWith('### ')) {
      processedBlocks.push(`<h3>${block.substring(4)}</h3>`);
    } else if (block.startsWith('## ')) {
      processedBlocks.push(`<h2>${block.substring(3)}</h2>`);
    } else if (block.startsWith('# ')) {
      processedBlocks.push(`<h1>${block.substring(2)}</h1>`);
    } else {
      // Regular paragraph - preserve line breaks within the block
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      if (lines.length > 0) {
        processedBlocks.push(`<p>${lines.join(' ')}</p>`);
      }
    }
  }
  
  // If we ended while still in a list, close it
  if (inList && listItems.length > 0) {
    processedBlocks.push('<ul class="coffee-list">\n' + listItems.join('\n') + '\n</ul>');
  }
  
  if (inOrderedList && listItems.length > 0) {
    processedBlocks.push('<ol class="coffee-list-ordered">\n' + listItems.join('\n') + '\n</ol>');
  }
  
  return processedBlocks.join('\n\n');
}

// Helper to remove first paragraph from HTML content
function removeFirstParagraph(html: string): string {
  // Remove the first <p>...</p> tag from the HTML
  return html.replace(/^\s*<p>.*?<\/p>\s*/, '');
}

export function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: { [key: string]: number } }>(initialLikes);
  const [dislikes, setDislikes] = useState<{ [key: string]: { [key: string]: number } }>(initialDislikes);
  const [userLikes, setUserLikes] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  const [userDislikes, setUserDislikes] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  
  // New comment form states
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  
  // Dynamic comments state (start with initial comments from data)
  const [allComments, setAllComments] = useState<{ [key: string]: CommentType[] }>({});
  
  const authorData = article?.author ? getAuthor(article.author) : undefined;

  // Comments data - combine initial + new comments
  const initialComments = getArticleComments(article?.slug || '');
  const comments = allComments[article?.slug || ''] || initialComments;

  // Calculate total number of comments (parents + replies)
  const totalComments = countTotalComments(comments);

  // Find article from static data
  useEffect(() => {
    if (!slug) return;
    
    const foundArticle = staticArticles.find(a => a.slug === slug);
    setArticle(foundArticle || null);
    
    // Find related articles (same category, different article)
    if (foundArticle?.category) {
      const related = staticArticles
        .filter(a => a.category === foundArticle.category && a.slug !== slug)
        .slice(0, 4);
      setRelatedArticles(related);
    }
  }, [slug]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentName && newCommentText) {
      const newComment: CommentType = {
        id: `new-${Date.now()}`,
        author: newCommentName,
        content: newCommentText,
        date: getTimeAgo(new Date().toISOString()),
        isAuthor: false,
        replies: [],
      };
      const currentComments = allComments[article?.slug || ''] || initialComments;
      setAllComments(prev => ({
        ...prev,
        [article?.slug || '']: [...currentComments, newComment],
      }));
      setNewCommentName("");
      setNewCommentText("");
      setShowAllComments(true); // Show all comments to see the new one
    }
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: string, replyName: string, replyText: string) => {
    e.preventDefault();
    if (replyName && replyText) {
      const newReply: CommentType = {
        id: `new-${Date.now()}`,
        author: replyName,
        content: replyText,
        date: getTimeAgo(new Date().toISOString()),
        isAuthor: false,
        replies: [],
      };
      
      const currentComments = allComments[article?.slug || ''] || initialComments;
      const addReplyToComment = (comments: CommentType[]): CommentType[] => {
        return comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }
          return comment;
        });
      };
      
      setAllComments(prev => ({
        ...prev,
        [article?.slug || '']: addReplyToComment(currentComments),
      }));
      setReplyingTo(null);
    }
  };

  const handleLike = (commentId: string) => {
    const articleSlug = article?.slug || '';
    const currentLikes = likes[articleSlug] || {};
    const currentUserLikes = userLikes[articleSlug] || {};
    const currentDislikes = dislikes[articleSlug] || {};
    const currentUserDislikes = userDislikes[articleSlug] || {};

    if (currentUserLikes[commentId]) {
      // Unlike
      setLikes({ 
        ...likes, 
        [articleSlug]: { 
          ...currentLikes, 
          [commentId]: currentLikes[commentId] - 1 
        }
      });
      setUserLikes({ 
        ...userLikes, 
        [articleSlug]: { 
          ...currentUserLikes, 
          [commentId]: false 
        }
      });
    } else {
      // Like
      setLikes({ 
        ...likes, 
        [articleSlug]: { 
          ...currentLikes, 
          [commentId]: (currentLikes[commentId] || 0) + 1 
        }
      });
      setUserLikes({ 
        ...userLikes, 
        [articleSlug]: { 
          ...currentUserLikes, 
          [commentId]: true 
        }
      });
      // Remove dislike if exists
      if (currentUserDislikes[commentId]) {
        setDislikes({ 
          ...dislikes, 
          [articleSlug]: { 
            ...currentDislikes, 
            [commentId]: currentDislikes[commentId] - 1 
          }
        });
        setUserDislikes({ 
          ...userDislikes, 
          [articleSlug]: { 
            ...currentUserDislikes, 
            [commentId]: false 
          }
        });
      }
    }
  };

  const handleDislike = (commentId: string) => {
    const articleSlug = article?.slug || '';
    const currentLikes = likes[articleSlug] || {};
    const currentUserLikes = userLikes[articleSlug] || {};
    const currentDislikes = dislikes[articleSlug] || {};
    const currentUserDislikes = userDislikes[articleSlug] || {};

    if (currentUserDislikes[commentId]) {
      // Remove dislike
      setDislikes({ 
        ...dislikes, 
        [articleSlug]: { 
          ...currentDislikes, 
          [commentId]: currentDislikes[commentId] - 1 
        }
      });
      setUserDislikes({ 
        ...userDislikes, 
        [articleSlug]: { 
          ...currentUserDislikes, 
          [commentId]: false 
        }
      });
    } else {
      // Dislike
      setDislikes({ 
        ...dislikes, 
        [articleSlug]: { 
          ...currentDislikes, 
          [commentId]: (currentDislikes[commentId] || 0) + 1 
        }
      });
      setUserDislikes({ 
        ...userDislikes, 
        [articleSlug]: { 
          ...currentUserDislikes, 
          [commentId]: true 
        }
      });
      // Remove like if exists
      if (currentUserLikes[commentId]) {
        setLikes({ 
          ...likes, 
          [articleSlug]: { 
            ...currentLikes, 
            [commentId]: currentLikes[commentId] - 1 
          }
        });
        setUserLikes({ 
          ...userLikes, 
          [articleSlug]: { 
            ...currentUserLikes, 
            [commentId]: false 
          }
        });
      }
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#1D1D1D] mb-4">Article non trouvé</h1>
          <a href="/blog" className="text-[#C69C6D] hover:underline">
            Retour au blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead 
        title={`${article.title} | Numcafé`}
        description={article.excerpt}
        keywords={`${article.category}, actualité numérique, tendances tech, ${article.title.toLowerCase()}`}
        ogImage={article.image}
        ogType="article"
        canonical={`https://numcafe.com/article/${article.slug}`}
        url={`https://numcafe.com/article/${article.slug}`}
      />
      
      {/* Structured Data - Article Schema */}
      <StructuredData 
        type="article" 
        data={{
          title: article.title,
          description: article.excerpt,
          image: article.image,
          author: article.author,
          datePublished: article.date,
          dateModified: article.date,
          category: article.category,
          url: `https://numcafe.com/article/${article.slug}`,
        }}
      />
      
      {/* Author Modal */}
      {authorData && (
        <AuthorModal
          author={authorData}
          isOpen={isAuthorModalOpen}
          onClose={() => setIsAuthorModalOpen(false)}
        />
      )}
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C69C6D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </a>
      </div>

      {/* Main content layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Left sidebar - Social media icons (sticky) - Hidden on mobile */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-28 space-y-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110 shadow-md"
                aria-label="X (Twitter)"
              >
                <img src={xLogo} alt="X" className="w-6 h-6 md:w-8 md:h-8" style={{ filter: 'brightness(0) invert(1) contrast(2)' }} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110 shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          {/* Center - Article content (délimité) */}
          <div className="md:col-span-11 lg:col-span-8 space-y-6 md:space-y-8">
            <article>
              <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden">
                {/* Title and meta */}
                <div className="p-4 sm:p-6 md:p-8 pb-4 md:pb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D1D1D] mb-4 md:mb-6 leading-tight">{article.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs sm:text-sm text-gray-600">
                    {article.category && (
                      <>
                        <span className={`text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <span className="text-gray-300">•</span>
                      </>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {article.readTime && (
                      <>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </>
                    )}
                    {article.author && (
                      <>
                        <span className="text-gray-300">•</span>
                        <a 
                          href="#author"
                          className="flex items-center gap-2 hover:text-[#C69C6D] transition-colors cursor-pointer group"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('author')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="underline decoration-dotted underline-offset-2">Par {article.author}</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {/* Article image */}
                {article.image && (
                  <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
                    <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                {/* Article content - unified prose container */}
                <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
                  <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                    {/* Introduction */}
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Promo Numcafé - treated as normal content block */}
                    <div
                      style={{
                        position: "relative",
                        background: "#FCF8F4",
                        border: "1px solid rgba(198,156,109,0.35)",
                        borderRadius: 16,
                        padding: "26px 22px 8px 48px",
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
                        {/* Icône Coffee (Lucide SVG) */}
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

                      <p style={{ margin: 0, color: "#1D1D1D", lineHeight: 1.7, fontFamily: "inherit" }}>
                        Sur Numcafé, trouvez rapidement des{" "}
                        <a
                          href="/blog"
                          style={{
                            color: "#C69C6D",
                            textDecoration: "underline",
                            textUnderlineOffset: 4,
                            fontWeight: 500,
                          }}
                        >
                          guides et tendances tech pour rester à jour.
                        </a>
                      </p>
                    </div>

                    {/* Main content */}
                    <div dangerouslySetInnerHTML={{ __html: removeFirstParagraph(convertMarkdownToHTML(article.content)) }} />
                  </div>
                </div>
              </div>
            </article>

            {/* Author Bio */}
            <div id="author" className="scroll-mt-32">
              <AuthorBio 
                name="Mayne"
                bio="Depuis plus de 10 ans, je contribue à faire rayonner nos sites en imaginant des stratégies qui renforcent notre visibilité et notre position de référence dans l'univers du digital, de la tech et de l'IA."
              />
            </div>

            {/* Comments section */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-2xl font-semibold text-[#1D1D1D]">Commentaires <span className="text-gray-400 text-sm md:text-base font-normal ml-2">({totalComments})</span></h2>
              </div>

              {/* New Comment Input Area */}
              <form onSubmit={handleCommentSubmit} className="mb-8 md:mb-10">
                <div className="flex gap-3 md:gap-4 mb-3">
                  <div className="flex-shrink-0">
                    {/* Current User Avatar Placeholder - Adapted to Brand Color */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C19A6B] border border-[#E8DCCB]">
                      <User size={16} className="sm:hidden" />
                      <User size={20} className="hidden sm:block" />
                    </div>
                  </div>
                  <div className="flex-grow space-y-2">
                    <input 
                      type="text"
                      placeholder="Votre nom ou pseudonyme"
                      className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all outline-none text-gray-700 placeholder-gray-400"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      required
                    />
                    <div className="relative">
                      <textarea 
                        placeholder="Partagez votre avis sur l'article..." 
                        className="w-full h-16 sm:h-20 p-2.5 sm:p-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent resize-none transition-all outline-none text-gray-700 placeholder-gray-400"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        required
                      />
                      <button 
                        type="submit"
                        className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-[#C19A6B] text-white p-1.5 sm:p-2 rounded-lg hover:bg-[#A6855C] transition-colors shadow-sm"
                      >
                        <Send size={12} className="sm:hidden" />
                        <Send size={14} className="hidden sm:block" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comment Thread */}
              <div className="relative">
                {comments.length > 0 ? (
                  <>
                    {/* First comment - Always visible */}
                    {comments[0] && (
                      <CommentItem
                        comment={comments[0]}
                        level={0}
                        likes={likes[article?.slug || ''] || {}}
                        dislikes={dislikes[article?.slug || ''] || {}}
                        userLikes={userLikes[article?.slug || ''] || {}}
                        userDislikes={userDislikes[article?.slug || ''] || {}}
                        replyingTo={replyingTo}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        onReply={(id) => setReplyingTo(replyingTo === id ? null : id)}
                        onReplySubmit={handleReplySubmit}
                        onReplyCancel={() => setReplyingTo(null)}
                      />
                    )}

                    {/* Remaining comments - Only visible when expanded */}
                    {showAllComments && comments.slice(1).map((comment) => (
                      <div key={comment.id} className="mt-8">
                        <CommentItem
                          comment={comment}
                          level={0}
                          likes={likes[article?.slug || ''] || {}}
                          dislikes={dislikes[article?.slug || ''] || {}}
                          userLikes={userLikes[article?.slug || ''] || {}}
                          userDislikes={userDislikes[article?.slug || ''] || {}}
                          replyingTo={replyingTo}
                          onLike={handleLike}
                          onDislike={handleDislike}
                          onReply={(id) => setReplyingTo(replyingTo === id ? null : id)}
                          onReplySubmit={handleReplySubmit}
                          onReplyCancel={() => setReplyingTo(null)}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Aucun commentaire pour le moment. Soyez le premier à commenter !
                  </p>
                )}
              </div>

              {/* Footer Button - Toggle comments */}
              {comments.length > 1 && (
                <div className="mt-10 text-center">
                  <button 
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#C19A6D] transition-all duration-200"
                  >
                    <span>{showAllComments ? 'Masquer les commentaires' : `Afficher plus de commentaires (${totalComments - 1})`}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-all duration-200 ${showAllComments ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} 
                    />
                  </button>
                </div>
              )}

            </div>

            {/* Related articles - inside the center column */}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1D1D1D] mb-6">Articles similaires</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="md:col-span-3 space-y-6">
            <div className="md:sticky md:top-28 space-y-6">
              {/* Newsletter block */}
              <div className="bg-[#C69C6D] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-white">Newsletter</h3>
                </div>
                <p className="text-sm text-white/90 mb-4">
                  Recevez nos meilleurs articles tech et café chaque semaine.
                </p>
                {subscribed && (
                  <div className="mb-4 p-3 bg-white/20 rounded-lg text-sm">
                    <p>Merci pour votre inscription !</p>
                  </div>
                )}
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg text-white placeholder:text-white/70 bg-[#C69C6D] border-2 border-[#E5D4C1] focus:outline-none focus:ring-2 focus:ring-[#E5D4C1]/50"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-[#1D1D1D] text-white rounded-lg hover:bg-[#2D2D2D] transition-colors"
                  >
                    S'abonner
                  </button>
                  <p className="text-xs text-white/80 mt-2">
                    Vous consentez à recevoir les communications Numcafé par email. Consultez notre{' '}
                    <a href="/politique-de-confidentialite" className="underline hover:text-white transition-colors">
                      Politique de Confidentialité
                    </a>.
                  </p>
                </form>
              </div>

              {/* Project CTA block */}
              <div className="bg-gradient-to-br from-[#1D1D1D] to-[#2D2D2D] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Send className="w-5 h-5 text-[#C69C6D]" />
                  <h3 className="text-lg font-semibold">Votre projet</h3>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Une idée ? Un projet digital ? Notre équipe est là pour vous accompagner de A à Z.
                </p>
                <ul className="text-sm text-gray-300 mb-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C69C6D] mt-1">•</span>
                    <span>Création de site web & application mobile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C69C6D] mt-1">•</span>
                    <span>Stratégie SEO & marketing digital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C69C6D] mt-1">•</span>
                    <span>Design UX/UI & identité visuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C69C6D] mt-1">•</span>
                    <span>Rédaction web & copywriting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C69C6D] mt-1">•</span>
                    <span>Community management</span>
                  </li>
                </ul>
                <a
                  href="/contact"
                  className="block w-full px-4 py-3 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D] transition-colors text-center"
                >
                  Démarrer un projet
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}