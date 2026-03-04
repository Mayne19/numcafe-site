import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, Highlighter, List, ListOrdered, CheckSquare,
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
  Link, Image, Quote, Table, Eye, Code, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { getPromoBlocks, renderPromoBlock, PromoBlock } from '../../data/promoBlocksSystem';

interface WYSIWYGEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function WYSIWYGEditor({ content, onChange }: WYSIWYGEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [showPromoBlocks, setShowPromoBlocks] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHeading = (level: number) => {
    execCommand('formatBlock', `h${level}`);
  };

  const insertList = (ordered: boolean) => {
    execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const insertLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setLinkText(selection.toString());
      setShowLinkDialog(true);
    } else {
      setShowLinkDialog(true);
    }
  };

  const confirmLink = () => {
    if (linkUrl) {
      if (linkText) {
        const html = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        execCommand('insertHTML', html);
      } else {
        execCommand('createLink', linkUrl);
      }
    }
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = `<img src="${event.target?.result}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 1rem 0;">`;
        execCommand('insertHTML', img);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = `<img src="${event.target?.result}" alt="Pasted image" style="max-width: 100%; height: auto; margin: 1rem 0;">`;
              execCommand('insertHTML', img);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    }
  };

  const insertTable = () => {
    const table = `
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">En-tête 1</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">En-tête 2</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">En-tête 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 2</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 3</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 4</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 5</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Cellule 6</td>
          </tr>
        </tbody>
      </table>
    `;
    execCommand('insertHTML', table);
  };

  const insertQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  const insertPromoBlock = (block: PromoBlock) => {
    const html = renderPromoBlock(block);
    execCommand('insertHTML', html);
    setShowPromoBlocks(false);
  };

  const promoBlocks = getPromoBlocks();

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 sticky top-0 z-10">
        <div className="flex flex-wrap gap-1">
          {/* Headings */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <ToolbarButton icon={Heading1} onClick={() => insertHeading(1)} title="Titre 1" />
            <ToolbarButton icon={Heading2} onClick={() => insertHeading(2)} title="Titre 2" />
            <ToolbarButton icon={Heading3} onClick={() => insertHeading(3)} title="Titre 3" />
            <ToolbarButton icon={Heading4} onClick={() => insertHeading(4)} title="Titre 4" />
            <ToolbarButton icon={Heading5} onClick={() => insertHeading(5)} title="Titre 5" />
            <ToolbarButton icon={Heading6} onClick={() => insertHeading(6)} title="Titre 6" />
          </div>

          {/* Text formatting */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <ToolbarButton icon={Bold} onClick={() => execCommand('bold')} title="Gras" />
            <ToolbarButton icon={Italic} onClick={() => execCommand('italic')} title="Italique" />
            <ToolbarButton icon={Underline} onClick={() => execCommand('underline')} title="Souligné" />
            <ToolbarButton icon={Highlighter} onClick={() => execCommand('hiliteColor', '#FFEB3B')} title="Surligner" />
          </div>

          {/* Alignment */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <ToolbarButton icon={AlignLeft} onClick={() => execCommand('justifyLeft')} title="Aligner à gauche" />
            <ToolbarButton icon={AlignCenter} onClick={() => execCommand('justifyCenter')} title="Centrer" />
            <ToolbarButton icon={AlignRight} onClick={() => execCommand('justifyRight')} title="Aligner à droite" />
          </div>

          {/* Lists */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <ToolbarButton icon={List} onClick={() => insertList(false)} title="Liste à puces" />
            <ToolbarButton icon={ListOrdered} onClick={() => insertList(true)} title="Liste numérotée" />
            <ToolbarButton icon={CheckSquare} onClick={() => insertList(false)} title="Checklist" />
          </div>

          {/* Insert elements */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <ToolbarButton icon={Link} onClick={insertLink} title="Insérer un lien" />
            <ToolbarButton 
              icon={Image} 
              onClick={() => fileInputRef.current?.click()} 
              title="Insérer une image" 
            />
            <ToolbarButton icon={Quote} onClick={insertQuote} title="Citation" />
            <ToolbarButton icon={Table} onClick={insertTable} title="Tableau" />
          </div>

          {/* Promo blocks */}
          <div className="flex gap-1 border-r border-gray-200 pr-2">
            <button
              onClick={() => setShowPromoBlocks(!showPromoBlocks)}
              className="p-2 hover:bg-gray-100 rounded text-gray-700 text-sm"
              title="Insérer un bloc promo"
            >
              Bloc promo
            </button>
          </div>

          {/* Preview */}
          <div className="flex gap-1 ml-auto">
            <ToolbarButton 
              icon={Eye} 
              onClick={() => setShowPreview(!showPreview)} 
              title="Prévisualisation"
              active={showPreview}
            />
          </div>
        </div>

        {/* Promo blocks picker */}
        {showPromoBlocks && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-2">Sélectionnez un bloc promotionnel</h3>
            <div className="space-y-2">
              {promoBlocks.filter(b => b.active).map(block => (
                <button
                  key={block.id}
                  onClick={() => insertPromoBlock(block)}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm">{block.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{block.type}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor / Preview */}
      {showPreview ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[500px]">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          dir="ltr"
          onInput={handleInput}
          onPaste={handlePaste}
          className="bg-white border border-gray-200 rounded-lg p-8 min-h-[500px] focus:outline-none focus:ring-2 focus:ring-[#C69C6D] prose prose-lg max-w-none"
          style={{ 
            outline: 'none',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            direction: 'ltr',
            textAlign: 'left',
            unicodeBidi: 'embed'
          }}
        />
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Link dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Insérer un lien</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte du lien
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="Texte à afficher"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C69C6D] focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkUrl('');
                    setLinkText('');
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmLink}
                  className="px-4 py-2 bg-[#C69C6D] text-white rounded-lg hover:bg-[#B88C5D]"
                >
                  Insérer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ToolbarButtonProps {
  icon: any;
  onClick: () => void;
  title: string;
  active?: boolean;
}

function ToolbarButton({ icon: Icon, onClick, title, active }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded transition-colors ${
        active ? 'bg-[#C69C6D] text-white hover:bg-[#B88C5D]' : 'text-gray-700'
      }`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}