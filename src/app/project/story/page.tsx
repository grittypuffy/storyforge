"use client";

import { useState } from "react";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState<string>(""); // Markdown input
  const [previewContent, setPreviewContent] = useState<string>(""); // Processed HTML for preview
  const [isPreview, setIsPreview] = useState<boolean>(false); // Toggle between editor and preview

  const handlePreview = async () => {
    try {
      // Parse Markdown and convert to sanitized HTML
      const parsedMarkdown = await unified()
        .use(remarkParse) // Parse Markdown into a syntax tree
        .use(remarkRehype) // Convert Markdown AST to HTML AST
        .use(rehypeSanitize) // Sanitize the generated HTML for safety
        .use(rehypeStringify) // Convert HTML AST to an HTML string
        .process(markdownContent);

      // Update preview content and show the preview page
      setPreviewContent(String(parsedMarkdown));
      setIsPreview(true);
    } catch (error) {
      console.error("Error processing markdown:", error);
    }
  };

  const handleBackToEditor = () => {
    setIsPreview(false); // Switch back to editor
  };

  return (
    <div className="min-h-screen bg-black-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl border p-6 rounded-lg shadow-sm bg-black">
        {!isPreview ? (
          <>
            {/* Markdown Editor */}
            <h1 className="text-3xl font-bold mb-4 text-white">Create New Chapter</h1>
            <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-white">Markdown Editor</h2>
              <textarea
                className="w-full h-64 border rounded-md p-4 focus:ring-2 focus:ring-blue-500 text-white bg-black-700 shadow-sm resize-none"
                placeholder="Write your story using Markdown..."
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <Link href="../project">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition text-sm">
                  Back to Project
                </button>
              </Link>
              <button
                onClick={handlePreview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition"
              >
                <span className="inline-flex items-center">
                  Preview
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Preview Page */}
            <h1 className="text-3xl font-bold mb-4 text-white">Preview</h1>
            <div
              className="w-full h-64 border rounded-md p-4 bg-black-100 overflow-y-auto prose prose-invert prose-blue"
              dangerouslySetInnerHTML={{ __html: previewContent }}
            ></div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <Link href="../project">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 transition text-sm">
                  Back to Project
                </button>
              </Link>
              <button
                onClick={handleBackToEditor}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 transition text-sm"
              >
                Back to Editor
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
