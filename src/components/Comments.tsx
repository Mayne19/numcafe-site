import { useState, useEffect, FormEvent } from 'react';
import { MessageCircle, User, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Comment {
  id: string;
  articleSlug: string;
  author: string;
  content: string;
  date: string;
}

interface CommentsProps {
  articleSlug: string;
}

export function Comments({ articleSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Charger les commentaires depuis localStorage
    const allComments = JSON.parse(localStorage.getItem('article_comments') || '[]');
    const articleComments = allComments.filter((c: Comment) => c.articleSlug === articleSlug);
    setComments(articleComments);

    // Charger le nom sauvegardé
    const savedName = localStorage.getItem('comment_author_name');
    if (savedName) {
      setName(savedName);
    }
  }, [articleSlug]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !content.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      articleSlug,
      author: name.trim(),
      content: content.trim(),
      date: new Date().toISOString(),
    };

    // Sauvegarder dans localStorage
    const allComments = JSON.parse(localStorage.getItem('article_comments') || '[]');
    allComments.push(newComment);
    localStorage.setItem('article_comments', JSON.stringify(allComments));

    // Sauvegarder le nom pour la prochaine fois
    localStorage.setItem('comment_author_name', name.trim());

    // Mettre à jour l'état
    setComments([newComment, ...comments]);
    setContent('');
    toast.success('Commentaire publié avec succès !');
  };

  const handleDelete = (commentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return;
    }

    const allComments = JSON.parse(localStorage.getItem('article_comments') || '[]');
    const updatedComments = allComments.filter((c: Comment) => c.id !== commentId);
    localStorage.setItem('article_comments', JSON.stringify(updatedComments));

    setComments(comments.filter(c => c.id !== commentId));
    toast.success('Commentaire supprimé');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-[#C69C6D]" />
        <h3 className="text-xl font-medium text-[#1D1D1D]">
          Commentaires ({comments.length})
        </h3>
      </div>

      {/* Formulaire de commentaire */}
      <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-medium mb-4 text-[#1D1D1D]">Laisser un commentaire</h4>
        
        <div className="mb-4">
          <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-2">
            Votre nom
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#C69C6D] focus:ring-2 focus:ring-[#C69C6D]/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment-content" className="block text-sm font-medium text-gray-700 mb-2">
            Votre commentaire
          </label>
          <textarea
            id="comment-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Partagez votre avis..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#C69C6D] focus:ring-2 focus:ring-[#C69C6D]/20 outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#C69C6D] text-white hover:bg-[#B58A5C] transition-colors font-medium"
        >
          <Send className="w-4 h-4" />
          Publier le commentaire
        </button>
      </form>

      {/* Liste des commentaires */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun commentaire pour le moment.</p>
            <p className="text-sm mt-2">Soyez le premier à partager votre avis !</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C69C6D]/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#C69C6D]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1D1D1D]">{comment.author}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  aria-label="Supprimer le commentaire"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed ml-13">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
