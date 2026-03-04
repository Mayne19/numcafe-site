import { useState } from "react";
import { User, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Comment } from "../data/comments";

interface CommentItemProps {
  comment: Comment;
  level?: number;
  likes: { [key: string]: number };
  dislikes: { [key: string]: number };
  userLikes: { [key: string]: boolean };
  userDislikes: { [key: string]: boolean };
  replyingTo: string | null;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReply: (commentId: string) => void;
  onReplySubmit: (e: React.FormEvent, commentId: string, name: string, text: string) => void;
  onReplyCancel: () => void;
}

export function CommentItem({
  comment,
  level = 0,
  likes,
  dislikes,
  userLikes,
  userDislikes,
  replyingTo,
  onLike,
  onDislike,
  onReply,
  onReplySubmit,
  onReplyCancel,
}: CommentItemProps) {
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");

  const marginLeft = level === 0 ? "" : level === 1 ? "ml-14" : "ml-28";
  const spacing = level === 0 ? "mt-8" : "mt-5";

  const handleReplySubmit = (e: React.FormEvent) => {
    onReplySubmit(e, comment.id, replyName, replyText);
    setReplyName("");
    setReplyText("");
  };

  return (
    <>
      <div className={`flex gap-3 relative z-10 ${level === 0 ? "" : spacing}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              comment.isAuthor
                ? "bg-[#C19A6B] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            <User size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-gray-900">
              {comment.author}
            </span>
            {comment.isAuthor && (
              <span className="bg-[#C19A6B] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                Auteur
              </span>
            )}
            <span className="text-xs text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {comment.content}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                userLikes[comment.id]
                  ? "text-[#C19A6B]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ThumbsUp
                size={12}
                className={userLikes[comment.id] ? "fill-[#C19A6B]" : ""}
              />
              <span>{likes[comment.id] || 0}</span>
            </button>
            <button
              onClick={() => onDislike(comment.id)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                userDislikes[comment.id]
                  ? "text-[#1D1D1D]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <ThumbsDown
                size={12}
                className={userDislikes[comment.id] ? "fill-[#1D1D1D]" : ""}
              />
              <span>{dislikes[comment.id] || 0}</span>
            </button>
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <MessageSquare
                size={12}
                className="group-hover:text-[#C19A6B] transition-colors"
              />
              Répondre
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C19A6B] border border-[#E8DCCB]">
                  <User size={16} />
                </div>
              </div>
              <div className="flex-grow relative">
                <form onSubmit={handleReplySubmit} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Votre nom ou pseudonyme"
                    className="w-full px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent transition-all outline-none text-gray-700 placeholder-gray-400"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Écrivez votre réponse..."
                    className="w-full h-16 p-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C19A6B] focus:border-transparent resize-none transition-all outline-none text-gray-700 placeholder-gray-400"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs bg-[#C19A6B] text-white rounded-lg hover:bg-[#A6855C] transition-colors"
                    >
                      Publier
                    </button>
                    <button
                      type="button"
                      onClick={onReplyCancel}
                      className="px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render replies recursively */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={marginLeft}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              level={level + 1}
              likes={likes}
              dislikes={dislikes}
              userLikes={userLikes}
              userDislikes={userDislikes}
              replyingTo={replyingTo}
              onLike={onLike}
              onDislike={onDislike}
              onReply={onReply}
              onReplySubmit={onReplySubmit}
              onReplyCancel={onReplyCancel}
            />
          ))}
        </div>
      )}
    </>
  );
}