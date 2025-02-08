import { MDXProvider } from '@mdx-js/react';

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 style={{ fontSize: '1.5em', /*color: 'tomato',*/ fontWeight: 'semibold', marginBottom: '0.5em' , marginTop: '0.5em' }} {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 style={{ fontSize: '1.2em', /*color: 'orange',*/ fontWeight: 'semibold', marginBottom: '0.5em' , marginTop: '0.5em' }} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 style={{ fontSize: '1.1em', /*color: 'yellow',*/ fontWeight: 'semibold', marginBottom: '0.5em' , marginTop: '0.5em' }} {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p style={{ fontSize: '1em', marginBottom: '0.5em' , marginTop: '0.5em'}} {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a style={{ color: 'blue' }} {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }} {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol style={{ paddingLeft: '20px', listStyleType: 'decimal' }} {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li style={{ marginBottom: '0.5em' }} {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote style={{ borderLeft: '4px solid gray', paddingLeft: '1em', color: 'gray' }} {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code style={{ backgroundColor: '#f5f5f5', padding: '2px 4px', borderRadius: '4px' }} {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', overflowX: 'auto' }} {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img style={{ maxWidth: '100%' }} {...props} />,
};

export const Markdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXProvider components={components}>
      <div className="mdx-content">
        {children}
      </div>
    </MDXProvider>
  );
};