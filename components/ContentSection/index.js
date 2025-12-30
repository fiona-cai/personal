import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./ContentSection.module.css"; // Importing the CSS module

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  p: ({ node, children, ...props }) => {
    // Check if this paragraph only contains an image
    const hasOnlyImage = 
      React.Children.count(children) === 1 &&
      React.isValidElement(children) &&
      children.type === 'img';
    
    // Add a class to identify image-only paragraphs
    const className = hasOnlyImage ? 'image-paragraph' : '';
    
    return (
      <p className={className} {...props}>
        {children}
      </p>
    );
  },
};

const ContentSection = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // After render, mark the last image in each consecutive group
    if (containerRef.current) {
      const imageParagraphs = containerRef.current.querySelectorAll('.image-paragraph');
      
      imageParagraphs.forEach((paragraph, index) => {
        const nextSibling = paragraph.nextElementSibling;
        const isLastInGroup = !nextSibling || !nextSibling.classList.contains('image-paragraph');
        
        if (isLastInGroup) {
          paragraph.classList.add('last-image-in-group');
        } else {
          paragraph.classList.remove('last-image-in-group');
        }
      });
    }
  }, [content]);

  // Check if content is blank
  const isBlank = !content || (typeof content === 'string' && content.trim() === '');

  if (isBlank) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl text-gray-600">I will write this soon 🫡</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.markdownClass}>
      <ReactMarkdown components={CodeBlock} className="markdown-class">
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ContentSection;
