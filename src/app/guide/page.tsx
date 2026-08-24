"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Markdown, slugifyHeading } from "@/components/Markdown";

type Section = {
  id: string;
  title: string;
  level: 1 | 2 | 3;
};

type TocSection = Section & {
  children: TocSection[];
};

const cleanTitle = (title: string) =>
  title
    .replace(/\[\[#?([^\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();

const getSections = (markdown: string): Section[] =>
  markdown.split(/\r?\n/).reduce<Section[]>((sections, line) => {
    const match = /^(#|##|###)\s+(.+?)\s*$/.exec(line);
    if (!match) return sections;

    const title = cleanTitle(match[2]);
    sections.push({
      id: slugifyHeading(title),
      title,
      level: match[1].length as 1 | 2 | 3,
    });
    return sections;
  }, []);

const getToc = (sections: Section[]): TocSection[] => {
  const toc: TocSection[] = [];
  const parents: TocSection[] = [];

  sections.forEach((section) => {
    const item: TocSection = { ...section, children: [] };

    while (parents.length > 0 && parents[parents.length - 1].level >= item.level) {
      parents.pop();
    }

    const parent = parents[parents.length - 1];
    if (parent) parent.children.push(item);
    else toc.push(item);

    parents.push(item);
  });

  return toc;
};

const renderWikiLinks = (markdown: string) =>
  markdown.replace(/\[\[#?([^\]]+)\]\]/g, (_match, value: string) => {
    const [rawTarget, rawLabel] = value.split("|");
    const target = cleanTitle(rawTarget);
    const label = cleanTitle(rawLabel ?? rawTarget);
    return "[" + label + "](#" + slugifyHeading(target) + ")";
  });

export default function GuidePage() {
  const [content, setContent] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const loadGuide = async () => {
      const response = await fetch("/guide.md");

      if (!response.ok) {
        throw new Error(`Could not load guide: ${response.status}`);
      }

      const markdown = renderWikiLinks(await response.text());
      const nextSections = getSections(markdown);
      setContent(markdown);
      setSections(nextSections);
      setActiveId(nextSections[0]?.id ?? "");
    };

    loadGuide().catch((error) => console.error("Error loading guide:", error));
  }, []);

  useEffect(() => {
    if (!content) return;

    const setIdFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) setActiveId(id);
    };
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h1, article h2, article h3"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId((visible.target as HTMLElement).id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
    setIdFromHash();
    window.addEventListener("hashchange", setIdFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", setIdFromHash);
    };
  }, [content]);

  const toc = getToc(sections);
  const linkClass = (id: string, nested = false) =>
    `block rounded py-1 ${nested ? "text-sm" : ""} ${
      activeId === id
        ? "bg-purple-100 px-2 font-semibold opacity-100 dark:bg-zinc-800"
        : "opacity-70 hover:opacity-100 hover:underline"
    }`;

  return (
    <Container className="max-w-7xl py-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          <nav aria-label="Навигация по гайду">
            <ul className="space-y-2 border-l border-gray-300 pl-4 dark:border-gray-700">
              {toc.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setActiveId(section.id)}
                    className={linkClass(section.id)}
                  >
                    {section.title}
                  </a>
                  {section.children.length > 0 && (
                    <ul className="mt-1 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-800">
                      {section.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            onClick={() => setActiveId(child.id)}
                            className={linkClass(child.id, true)}
                          >
                            {child.title}
                          </a>
                          {child.children.length > 0 && (
                            <ul className="mt-1 space-y-1 border-l border-gray-200 pl-3 dark:border-gray-800">
                              {child.children.map((grandchild) => (
                                <li key={grandchild.id}>
                                  <a
                                    href={`#${grandchild.id}`}
                                    onClick={() => setActiveId(grandchild.id)}
                                    className={linkClass(grandchild.id, true)}
                                  >
                                    {grandchild.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="basic min-w-0 widget">
          {content ? <Markdown content={content} /> : <p>Загружаем гайд…</p>}
        </article>
      </div>
    </Container>
  );
}
