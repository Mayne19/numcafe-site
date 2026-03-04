import { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  CheckSquare,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
  Table as TableIcon,
  Paperclip,
  Eye,
  EyeOff,
  Type,
  Tag,
} from 'lucide-react';

interface AdvancedEditorProps {
  content: string;
  onChange: (content: string) => void;
  onOpenMediaLibrary?: () => void;
  onOpenPromoBlocks?: () => void;
}

export function AdvancedEditor({
  content,
  onChange,
  onOpenMediaLibrary,
  onOpenPromoBlocks,
}: AdvancedEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
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

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHeading = (level: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString();
      const heading = document.createElement(`h${level}`);
      heading.textContent = selectedText || `Titre ${level}`;
      
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(heading);
      
      // Move cursor after
      const newRange = document.createRange();
      newRange.setStartAfter(heading);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
      
      handleInput();
    }
  };

  const handleLinkInsert = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString();
      if (selectedText) {
        setLinkText(selectedText);
      }
    }
    setShowLinkDialog(true);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    
    if (linkText) {
      const link = `<a href="${linkUrl}" style="color: #C69C6D; text-decoration: underline;">${linkText}</a>`;
      document.execCommand('insertHTML', false, link);
    } else {
      execCommand('createLink', linkUrl);
    }
    
    setShowLinkDialog(false);
    setLinkText('');
    setLinkUrl('');
    handleInput();
  };

  const insertTable = () => {
    const rows = prompt('Nombre de lignes :', '3');
    const cols = prompt('Nombre de colonnes :', '3');
    if (rows && cols) {
      let tableHTML = '<table style="border-collapse: collapse; width: 100%; margin: 16px 0;">';
      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML += '<td style="border: 1px solid #ddd; padding: 8px;"></td>';
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table><p></p>';
      document.execCommand('insertHTML', false, tableHTML);
      handleInput();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = item.getAsFile();
        if (blob) {
          // Créer une URL temporaire pour l'image
          const url = URL.createObjectURL(blob);
          const img = `<img src="${url}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />`;
          document.execCommand('insertHTML', false, img);
          handleInput();
        }
      }
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2">
        <div className="flex flex-wrap gap-1 items-center">
          {/* Text style dropdown */}
          <div className="relative group">
            <button
              className="px-3 py-2 hover:bg-gray-200 rounded transition-colors text-sm flex items-center gap-1"
              onClick={(e) => {
                e.currentTarget.nextElementSibling?.classList.toggle('hidden');
              }}
            >
              <Type className="w-4 h-4" />
              Style
            </button>
            <div className="hidden absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[150px] z-10">
              <button
                onClick={() => { execCommand('formatBlock', 'p'); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
              >
                Normal
              </button>
              <button
                onClick={() => { insertHeading(1); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-lg font-bold"
              >
                Titre 1
              </button>
              <button
                onClick={() => { insertHeading(2); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-base font-bold"
              >
                Titre 2
              </button>
              <button
                onClick={() => { insertHeading(3); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm font-bold"
              >
                Titre 3
              </button>
              <button
                onClick={() => { insertHeading(4); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm font-semibold"
              >
                Titre 4
              </button>
              <button
                onClick={() => { insertHeading(5); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs font-semibold"
              >
                Titre 5
              </button>
              <button
                onClick={() => { insertHeading(6); }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs"
              >
                Titre 6
              </button>
            </div>
          </div>

          <div className="w-px h-6 bg-gray-300" />

          {/* Format buttons */}
          <button onClick={() => execCommand('bold')} className="p-2 hover:bg-gray-200 rounded" title="Gras">
            <Bold className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('italic')} className="p-2 hover:bg-gray-200 rounded" title="Italique">
            <Italic className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('underline')} className="p-2 hover:bg-gray-200 rounded" title="Souligné">
            <Underline className="w-5 h-5" />
          </button>
          <button
            onClick={() => execCommand('backColor', '#ffeb3b')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Surligner"
          >
            <Highlighter className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Alignment */}
          <button onClick={() => execCommand('justifyLeft')} className="p-2 hover:bg-gray-200 rounded" title="Aligner à gauche">
            <AlignLeft className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('justifyCenter')} className="p-2 hover:bg-gray-200 rounded" title="Centrer">
            <AlignCenter className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('justifyRight')} className="p-2 hover:bg-gray-200 rounded" title="Aligner à droite">
            <AlignRight className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('justifyFull')} className="p-2 hover:bg-gray-200 rounded" title="Justifier">
            <AlignJustify className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Lists */}
          <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded" title="Liste à puces">
            <List className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded" title="Liste numérotée">
            <ListOrdered className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300" />

          {/* Insert */}
          <button onClick={handleLinkInsert} className="p-2 hover:bg-gray-200 rounded" title="Insérer un lien">
            <LinkIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onOpenMediaLibrary?.()}
            className="p-2 hover:bg-gray-200 rounded"
            title="Insérer une image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button onClick={insertTable} className="p-2 hover:bg-gray-200 rounded" title="Insérer un tableau">
            <TableIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => execCommand('formatBlock', 'blockquote')}
            className="p-2 hover:bg-gray-200 rounded"
            title="Citation"
          >
            <Quote className="w-5 h-5" />
          </button>
          <button onClick={() => execCommand('formatBlock', 'pre')} className="p-2 hover:bg-gray-200 rounded" title="Code">
            <Code className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-gray-300" />
          
          {/* Promo block */}
          {onOpenPromoBlocks && (
            <button
              onClick={onOpenPromoBlocks}
              className="p-2 hover:bg-gray-200 rounded text-[#C69C6D]"
              title="Insérer un bloc promo"
            >
              <Tag className="w-5 h-5" />
            </button>
          )}

          {/* Preview */}
          <div className="ml-auto">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                showPreview ? 'bg-[#C69C6D] text-white' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{showPreview ? 'Éditeur' : 'Prévisualisation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor / Preview */}
      {!showPreview ? (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          className="p-6 min-h-[500px] focus:outline-none prose max-w-none"
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        />
      ) : (
        <div className="p-6 min-h-[500px] bg-gray-50">
          <div
            className="prose max-w-none bg-white p-6 rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg mb-4">Insérer un lien</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Texte du lien</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                  placeholder="Texte affiché"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">URL</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                  placeholder="https://exemple.com"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowLinkDialog(false);
                    setLinkText('');
                    setLinkUrl('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={insertLink}
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
