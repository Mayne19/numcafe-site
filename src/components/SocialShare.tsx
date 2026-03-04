import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SocialShareProps {
  title: string;
  url: string;
  description: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Lien copié dans le presse-papiers !');
    } catch (err) {
      toast.error('Erreur lors de la copie du lien');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-[#1D1D1D]">
        Partager cet article
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors"
          aria-label="Partager sur Facebook"
        >
          <Facebook className="w-5 h-5" />
          <span className="hidden sm:inline">Facebook</span>
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1A94DA] transition-colors"
          aria-label="Partager sur Twitter"
        >
          <Twitter className="w-5 h-5" />
          <span className="hidden sm:inline">Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white hover:bg-[#095196] transition-colors"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        <a
          href={shareLinks.email}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C69C6D] text-white hover:bg-[#B58A5C] transition-colors"
          aria-label="Partager par email"
        >
          <Mail className="w-5 h-5" />
          <span className="hidden sm:inline">Email</span>
        </a>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-[#1D1D1D] hover:bg-gray-300 transition-colors"
          aria-label="Copier le lien"
        >
          <LinkIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Copier le lien</span>
        </button>
      </div>
    </div>
  );
}
