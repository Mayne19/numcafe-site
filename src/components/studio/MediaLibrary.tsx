import { useState } from 'react';
import { Upload, X, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  uploaded_at: string;
}

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  isModal?: boolean;
}

export function MediaLibrary({ onSelectImage, isModal = false }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mock upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newMedia: MediaItem = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: event.target?.result as string,
            name: file.name,
            uploaded_at: new Date().toISOString(),
          };
          setMedia((prev) => [newMedia, ...prev]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Supprimer cette image ?')) {
      setMedia((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleSelect = (url: string) => {
    if (onSelectImage) {
      onSelectImage(url);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#C69C6D] transition-colors">
        <input
          type="file"
          id="media-upload"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
        <label htmlFor="media-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">Cliquez pour uploader des images</p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
        </label>
      </div>

      {/* Media grid */}
      {media.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune image pour le moment</p>
          <p className="text-sm text-gray-400 mt-2">Uploadez vos premières images ci-dessus</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div
                className="aspect-square bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item.url)}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center gap-2">
                {/* Copy button */}
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-lg hover:bg-gray-100 transition-all"
                  title="Copier l'URL"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-700" />
                  )}
                </button>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-lg hover:bg-red-50 transition-all"
                  title="Supprimer"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>

              {/* Name */}
              <div className="p-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 truncate">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
