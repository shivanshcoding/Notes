'use client';

import { useState } from 'react';
import { FiBook, FiX } from 'react-icons/fi';
import MarkdownRenderer from './MarkdownRenderer';

const MARKDOWN_EXAMPLES = `# Markdown Guide

## Text Formatting

**Bold text** or __bold text__
*Italic text* or _italic text_
***Bold and italic*** or ___bold and italic___
~~Strikethrough~~

## Headings

# Heading 1
## Heading 2  
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Code

Inline \`code\` with backticks

\`\`\`javascript
// Code block with syntax highlighting
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

\`\`\`python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## Math Equations

Inline math: $E = mc^2$

Block math:
$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

More complex equation:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Tables | ✅ | Full support |
| Math | ✅ | KaTeX rendering |
| Code Highlighting | ✅ | 100+ languages |
| Task Lists | ✅ | Interactive checkboxes |

## Blockquotes

> This is a blockquote
> 
> It can span multiple lines

> ### Blockquotes can contain other markdown
> 
> - Including **lists**
> - And \`code\`

## Links and Images

[External link](https://example.com)
[Link with title](https://example.com "Link Title")

![Alt text](https://via.placeholder.com/300x200 "Image Title")

## Horizontal Rules

---

## HTML Support

You can use <mark>HTML tags</mark> for additional formatting.

<details>
<summary>Click to expand</summary>
This content is hidden by default!
</details>

## Special Characters

You can use emojis: 🚀 ✨ 💡 📝

And special symbols: © ® ™ § ¶
`;

export default function MarkdownGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-animate flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand/10 rounded-lg">
              <FiBook size={20} className="text-brand" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Markdown Guide</h2>
              <p className="text-sm text-muted-foreground">Complete reference for all supported features</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <FiX size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <MarkdownRenderer content={MARKDOWN_EXAMPLES} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              All features are supported in real-time preview
            </div>
            <button
              onClick={onClose}
              className="btn btn-primary"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}