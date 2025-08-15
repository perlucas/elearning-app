import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import './RichTextEditor.scss';
import DOMPurify from 'dompurify';

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    onIsEmptyChange?: (isEmpty: boolean) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onIsEmptyChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);
    const isInitialized = useRef(false);

    console.log('🎨 RICH TEXT EDITOR RENDER:', {
        valueLength: value?.length || 0,
        valuePreview: value?.substring(0, 50) + '...' || 'EMPTY VALUE',
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const loadQuill = async () => {
            const Quill = (await import('quill')).default;
            if (editorRef.current && toolbarRef.current && !quillRef.current) {
                const quill = new Quill(editorRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: {
                            container: toolbarRef.current,
                        },
                    },
                });
                if (value) {
                    quill.clipboard.dangerouslyPasteHTML(DOMPurify.sanitize(value));
                }
                quill.on('text-change', () => {
                    if (!isInitialized.current) return;
                    const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML ?? '';
                    const cleanHtml = DOMPurify.sanitize(html);
                    onChange(cleanHtml);
                    const isEmpty = quill.getLength() === 1;
                    onIsEmptyChange?.(isEmpty);
                });

                quillRef.current = quill;

                setTimeout(() => {
                    isInitialized.current = true;
                    const isEmpty = quill.getLength() === 1;
                    onIsEmptyChange?.(isEmpty);
                }, 100);
            }
        };

        loadQuill();

        return () => {
            if (quillRef.current) {
                isInitialized.current = false;
                quillRef.current.off('text-change');
                quillRef.current = null;
            }
        };
    }, [isClient]);

    useEffect(() => {
        if (quillRef.current && value !== undefined && isInitialized.current) {
            const currentContent = quillRef.current.root.innerHTML;
            const sanitizedValue = DOMPurify.sanitize(value || '');
            if (sanitizedValue !== currentContent) {
                isInitialized.current = false;
                quillRef.current.clipboard.dangerouslyPasteHTML(sanitizedValue);
                setTimeout(() => {
                    isInitialized.current = true;
                    const isEmpty = quillRef.current?.getLength() === 1;
                    onIsEmptyChange?.(isEmpty);
                }, 50);
            }
        }
    }, [value]);

    return (
        <div className="mb-4">
            <div ref={toolbarRef} style={{ borderRadius: '8px 8px 0 0', backgroundColor: '#dde0e3' }}>
                <span className="ql-formats">
                    <select className="ql-header" defaultValue="">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value=""></option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                </span>
                <span className="ql-formats">
                    <button className="ql-link" style={{ right: '0', left: 'auto' }}></button>
                    <button className="ql-clean"></button>
                </span>
            </div>
            <div
                ref={editorRef}
                style={{
                    borderRadius: '0 0 8px 8px',
                    height: '15rem',
                    overflowY: 'auto',
                    color: 'black',
                }}
            />
        </div>
    );
};

export default RichTextEditor;
