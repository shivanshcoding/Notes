'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useEffect } from 'react';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

// Custom components for enhanced rendering
const MarkdownComponents = {
  // Enhanced code blocks
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    if (inline) {
      return (
        <code 
          className="px-1.5 py-0.5 bg-muted text-foreground rounded text-sm font-mono border" 
          {...props}
        >
          {children}
        </code>
      );
    }
    
    return (
      <div className="relative group" suppressHydrationWarning>
        {language && (
          <div className="absolute top-0 right-0 bg-muted/80 text-muted-foreground px-2 py-1 text-xs rounded-bl-md rounded-tr-lg">
            {language}
          </div>
        )}
        <pre className="bg-muted/30 border rounded-lg p-4 overflow-x-auto" suppressHydrationWarning>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },

  // Enhanced blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand/50 bg-brand/5 pl-4 py-2 my-4 italic">
      {children}
    </blockquote>
  ),

  // Enhanced tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  
  thead: ({ children }) => (
    <thead className="bg-muted/30">
      {children}
    </thead>
  ),
  
  th: ({ children }) => (
    <th className="border border-border px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  
  td: ({ children }) => (
    <td className="border border-border px-4 py-2">
      {children}
    </td>
  ),

  // Enhanced lists
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-1 my-4">
      {children}
    </ul>
  ),
  
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-1 my-4">
      {children}
    </ol>
  ),

  // Task lists
  li: ({ children, className }) => {
    // Check if it's a task list item
    if (className?.includes('task-list-item')) {
      return (
        <li className="list-none flex items-start gap-2">
          {children}
        </li>
      );
    }
    return <li className="leading-relaxed">{children}</li>;
  },

  // Enhanced headings with anchors
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 pb-2 border-b border-border">
      {children}
    </h1>
  ),
  
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3 pb-2 border-b border-border/50">
      {children}
    </h2>
  ),
  
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-5 mb-3">
      {children}
    </h3>
  ),
  
  h4: ({ children }) => (
    <h4 className="text-lg font-medium mt-4 mb-2">
      {children}
    </h4>
  ),
  
  h5: ({ children }) => (
    <h5 className="text-base font-medium mt-3 mb-2">
      {children}
    </h5>
  ),
  
  h6: ({ children }) => (
    <h6 className="text-sm font-medium mt-3 mb-2 text-muted-foreground">
      {children}
    </h6>
  ),

  // Enhanced paragraphs - prevent nesting issues
  p: ({ children }) => {
    // Always use div to prevent any HTML nesting issues
    return (
      <div className="leading-relaxed mb-4 text-foreground/90" suppressHydrationWarning>
        {children}
      </div>
    );
  },

  // Enhanced links
  a: ({ href, children }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-brand hover:text-brand-hover underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),

  // Enhanced horizontal rule
  hr: () => (
    <hr className="my-8 border-t-2 border-border/20" />
  ),

  // Enhanced emphasis
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  
  em: ({ children }) => (
    <em className="italic text-foreground/90">
      {children}
    </em>
  ),

  // Enhanced images
  img: ({ src, alt }) => (
    <div className="my-6">
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full h-auto rounded-lg border border-border shadow-sm"
      />
      {alt && (
        <p className="text-center text-sm text-muted-foreground mt-2">
          {alt}
        </p>
      )}
    </div>
  ),

  // Enhanced checkboxes for task lists
  input: ({ type, checked, ...props }) => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={checked}
          disabled
          className="mr-2 rounded border-border"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
};

export default function MarkdownRenderer({ content, className = "" }) {
  useEffect(() => {
    // Initialize highlight.js for code syntax highlighting
    import('highlight.js').then((hljs) => {
      hljs.default.highlightAll();
    });
  }, [content]);

  if (!content || !content.trim()) {
    return (
      <div className={`flex items-center justify-center h-full text-muted-foreground ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <p className="font-medium">Start writing to see preview</p>
          <p className="text-sm mt-1">Supports Markdown, Math, Code & More</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className}`} suppressHydrationWarning>
      <ReactMarkdown
        components={MarkdownComponents}
        remarkPlugins={[
          remarkGfm,      // GitHub Flavored Markdown (tables, strikethrough, task lists, etc.)
          remarkMath,     // Math support ($inline$ and $$block$$)
          remarkBreaks,   // Line breaks
        ]}
        rehypePlugins={[
          rehypeKatex,    // Render math equations
          rehypeHighlight, // Syntax highlighting for code blocks
        ]}
        skipHtml={true}
      >
        {content}
      </ReactMarkdown>
      
      {/* Math equation styles */}
      <style jsx global>{`
        .katex {
          font-size: 1.1em;
        }
        .katex-display {
          margin: 1.5em 0;
        }
        
        /* Task list styling */
        .task-list-item {
          list-style: none;
        }
        .task-list-item input[type="checkbox"] {
          margin-right: 0.5em;
        }
        
        /* Code block enhancements */
        pre code.hljs {
          background: transparent;
          padding: 0;
        }
        
        /* Table enhancements */
        .prose table th {
          background-color: hsl(var(--muted) / 0.3);
        }
        
        /* Blockquote enhancements */
        .prose blockquote {
          border-left-color: hsl(var(--brand) / 0.5);
          background-color: hsl(var(--brand) / 0.05);
        }
      `}</style>
    </div>
  );
}