import { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Quote,
  Eye,
  Tag,
} from 'lucide-react';

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  onOpenMediaLibrary?: () => void;
}

export function RichEditor({ content, onChange, onOpenMediaLibrary }: RichEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && !showPreview) {
      editorRef.current.innerHTML = content;
    }
  }, [content, showPreview]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const heading = document.createElement(`h${level}`);
      heading.textContent = selection.toString() || `Titre ${level}`;
      range.deleteContents();
      range.insertNode(heading);
      
      // Move cursor after heading
      const newRange = document.createRange();
      newRange.setStartAfter(heading);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = () => {
    const url = prompt('Entrez l\'URL :');
    if (url) {
      execCommand('createLink', url);
      handleInput();
    }
  };

  const insertImage = () => {
    if (onOpenMediaLibrary) {
      onOpenMediaLibrary();
    } else {
      const url = prompt('Entrez l\'URL de l\'image :');
      if (url) {
        execCommand('insertImage', url);
        handleInput();
      }
    }
  };

  const insertPromoBlock = () => {
    const category = prompt('Entrez la catégorie pour le bloc promo (ex: IA & Automatisation) :');
    if (category) {
      const promoBlock = `<p class="promo-placeholder" contenteditable="false" style="background: #f3f4f6; border: 2px dashed #C69C6D; padding: 12px; border-radius: 8px; margin: 16px 0; color: #C69C6D; font-family: monospace;">[[PROMO:${category}]]</p>`;
      document.execCommand('insertHTML', false, promoBlock);
      handleInput();
    }
  };

  const toolbarButtons = [
    {
      label: 'Text style',
      type: 'dropdown',
      options: [
        { label: 'Normal text', action: () => execCommand('formatBlock', 'p') },
        { label: 'Heading 2', action: () => insertHeading(2) },
        { label: 'Heading 3', action: () => insertHeading(3) },
      ],
    },
    { icon: Bold, label: 'Gras', action: () => { execCommand('bold'); handleInput(); } },
    { icon: Italic, label: 'Italique', action: () => { execCommand('italic'); handleInput(); } },
    { icon: List, label: 'Liste à puces', action: () => { execCommand('insertUnorderedList'); handleInput(); } },
    { icon: ListOrdered, label: 'Liste numérotée', action: () => { execCommand('insertOrderedList'); handleInput(); } },
    { icon: LinkIcon, label: 'Lien', action: insertLink },
    { icon: ImageIcon, label: 'Image', action: insertImage },
    { icon: Quote, label: 'Citation', action: () => { execCommand('formatBlock', 'blockquote'); handleInput(); } },
    { icon: Code, label: 'Code', action: () => { execCommand('formatBlock', 'pre'); handleInput(); } },
    { icon: Tag, label: 'Bloc promo', action: insertPromoBlock, color: 'text-[#C69C6D]' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 items-center">
        {/* Text style dropdown */}
        <div className="relative group">
          <button
            className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm flex items-center gap-1"
            onClick={(e) => {
              e.currentTarget.nextElementSibling?.classList.toggle('hidden');
            }}
          >
            Normal text
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="hidden absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[150px] z-10">
            <button
              onClick={() => { execCommand('formatBlock', 'p'); handleInput(); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              Normal text
            </button>
            <button
              onClick={() => { insertHeading(2); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              Heading 2
            </button>
            <button
              onClick={() => { insertHeading(3); }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
            >
              Heading 3
            </button>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Icon buttons */}
        {toolbarButtons.slice(1).map((button, index) => {
          if ('icon' in button) {
            const Icon = button.icon;
            return (
              <button
                key={index}
                onClick={button.action}
                className={`p-2 hover:bg-gray-200 rounded transition-colors ${button.color || 'text-gray-700'}`}
                title={button.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          }
          return null;
        })}

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
              showPreview ? 'bg-[#C69C6D] text-white' : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">{showPreview ? 'Éditeur' : 'Preview'}</span>
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {!showPreview ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-6 min-h-[500px] focus:outline-none prose max-w-none"
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        />
      ) : (
        <div className="p-6 min-h-[500px] prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
}
