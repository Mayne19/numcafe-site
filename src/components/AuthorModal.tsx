import { X, Linkedin, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Author } from "../data/authors";

interface AuthorModalProps {
  author: Author;
  isOpen: boolean;
  onClose: () => void;
}

export function AuthorModal({ author, isOpen, onClose }: AuthorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 p-8 mx-4"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Author avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C69C6D] to-[#B88C5D] flex items-center justify-center text-white text-2xl font-semibold mb-4">
                {author.avatar}
              </div>
              <h2 className="text-2xl font-semibold text-[#1D1D1D] mb-1">{author.name}</h2>
              <p className="text-[#C69C6D]">{author.role}</p>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">{author.bio}</p>
            </div>

            {/* Expertise tags */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#1D1D1D] mb-3">Domaines d'expertise</h3>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links */}
            {author.social && (
              <div>
                <h3 className="text-sm font-semibold text-[#1D1D1D] mb-3">Réseaux sociaux</h3>
                <div className="flex gap-3">
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {author.social.github && (
                    <a
                      href={author.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C69C6D] hover:bg-[#B88C5D] text-white transition-all hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}