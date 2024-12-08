"use client"
import { useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handlePreview = async () => {
    try {
      const parsedMarkdown = await unified()
        .use(remarkParse) // Parse Markdown
        .use(remarkGfm) // Support GitHub Flavored Markdown
        .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST
        .use(rehypeRaw) // Parse raw HTML within Markdown
        .use(rehypeStringify) // Convert HTML AST to HTML string
        .process(markdownContent);

      setPreviewContent(String(parsedMarkdown));
      setIsPreview(true);
    } catch (error) {
      console.error("Error processing markdown:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Markdown Editor</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Write Markdown</h2>
          <textarea
            className="w-full h-80 p-4 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>

        {/* Preview Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Preview</h2>
          <div
            className="w-full h-80 p-4 border rounded-md shadow-sm bg-white text-gray-800 overflow-y-auto prose prose-blue"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        </div>
      </div>

      <button
        onClick={handlePreview}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Generate Preview
      </button>
    </div>
  );
}
