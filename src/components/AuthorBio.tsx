import { Linkedin, User } from 'lucide-react';
import { XLogo } from './XLogo';

interface AuthorBioProps {
  name: string;
  bio: string;
  avatar?: string;
}

export function AuthorBio({ name, bio, avatar }: AuthorBioProps) {
  return (
    <div 
      id="author"
      className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start scroll-mt-32"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#C69C6D] flex items-center justify-center text-white">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User size={48} className="sm:hidden" strokeWidth={2.5} />
          )}
          {!avatar && (
            <User size={56} className="hidden sm:block" strokeWidth={2.5} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold mb-4 text-[#1D1D1D] text-[21px]">{name}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          {bio}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <a 
            href="/auteur/mayne"
            className="px-6 py-3 rounded-lg text-white font-medium transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#C69C6D' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B88C5D'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C69C6D'}
          >
            Voir mes articles 
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              className="px-3 py-3 rounded-lg flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#C69C6D' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B88C5D'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C69C6D'}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="px-3 py-3 rounded-lg flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#C69C6D' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B88C5D'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C69C6D'}
              aria-label="X (Twitter)"
            >
              <XLogo className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}