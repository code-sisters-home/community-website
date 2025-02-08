import React from 'react';
import ReactMarkdown from 'react-markdown';

const components = {
  h1: ({ node, ...props }: any) => (
    <h1 style={{ fontSize: '1.5em', fontWeight: 'semibold', marginBottom: '0.5em', marginTop: '0.5em' }} {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 style={{ fontSize: '1.2em', fontWeight: 'semibold', marginBottom: '0.5em', marginTop: '0.5em' }} {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 style={{ fontSize: '1.1em', fontWeight: 'semibold', marginBottom: '0.5em', marginTop: '0.5em' }} {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p style={{ fontSize: '1em', marginBottom: '0.5em', marginTop: '0.5em' }} {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <a style={{ color: 'blue' }} {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }} {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol style={{ paddingLeft: '20px', listStyleType: 'decimal' }} {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li style={{ marginBottom: '0.5em' }} {...props} />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote style={{ borderLeft: '4px solid gray', paddingLeft: '1em', color: 'gray' }} {...props} />
  ),
  code: ({ node, ...props }: any) => (
    <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }} {...props} />
  ),
  pre: ({ node, ...props }: any) => (
    <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflowX: 'auto' }} {...props} />
  ),
  img: ({ node, ...props }: any) => (
    <img style={{ maxWidth: '100%' }} {...props} />
  ),
};

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className="mdx-content">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
