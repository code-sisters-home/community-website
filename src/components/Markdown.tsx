import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export const slugifyHeading = (text: string) =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "") || "section";

const textFromChildren = (children: React.ReactNode): string =>
  React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return textFromChildren(child.props.children);
      }
      return "";
    })
    .join("");

const createComponents = () => ({
  h1: ({ node, children, ...props }: any) => (
    <h1
      id={slugifyHeading(textFromChildren(children))}
      className="mb-5 mt-10 scroll-mt-32 text-3xl font-semibold leading-tight text-zinc-950 dark:text-zinc-50"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }: any) => (
    <h2
      id={slugifyHeading(textFromChildren(children))}
      className="mb-4 mt-9 scroll-mt-32 border-t border-zinc-200 pt-7 text-2xl font-semibold leading-snug text-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }: any) => (
    <h3
      id={slugifyHeading(textFromChildren(children))}
      className="mb-3 mt-7 scroll-mt-32 text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-100"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="mb-3 mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
  h5: ({ node, ...props }: any) => (
    <h5 className="mb-2 mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-100" {...props} />
  ),
  h6: ({ node, ...props }: any) => (
    <h6
      className="mb-2 mt-5 text-sm font-semibold uppercase tracking-normal text-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
  p: ({ node, ...props }: any) => (
    <p className="my-4 whitespace-pre-line leading-8 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: ({ node, href, ...props }: any) => {
    const isAnchor = typeof href === "string" && href.startsWith("#");

    return (
      <a
        href={href}
        target={isAnchor ? undefined : "_blank"}
        rel={isAnchor ? undefined : "noopener noreferrer"}
        className="font-medium text-purple-700 underline underline-offset-4 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-200"
        {...props}
      />
    );
  },
  ul: ({ node, ...props }: any) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="pl-1 leading-7" {...props} />,
  blockquote: ({ node, ...props }: any) => (
    <blockquote
      className="my-6 border-l-4 border-purple-200 bg-purple-50/60 py-1 pl-5 pr-4 text-zinc-700 dark:border-purple-900/70 dark:bg-zinc-900/70 dark:text-zinc-300"
      {...props}
    />
  ),
  code: ({ node, ...props }: any) => (
    <code
      className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
      {...props}
    />
  ),
  pre: ({ node, ...props }: any) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-sm leading-6 text-zinc-100 dark:border-zinc-800"
      {...props}
    />
  ),
  img: ({ node, ...props }: any) => (
    <Image className="my-6 h-auto max-w-full rounded-lg" {...props} alt="" />
  ),
});

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div className="mdx-content max-w-none text-base">
      <ReactMarkdown components={createComponents()}>{content}</ReactMarkdown>
    </div>
  );
};
