"use client";

import { useEffect, useState } from "react";

export type GuideSection = {
  id: string;
  title: string;
  level: 1 | 2 | 3;
};

type TocSection = GuideSection & { children: TocSection[] };

const getToc = (sections: GuideSection[]): TocSection[] => {
  const toc: TocSection[] = [];
  const parents: TocSection[] = [];

  sections.forEach((section) => {
    const item: TocSection = { ...section, children: [] };
    while (
      parents.length > 0 &&
      parents[parents.length - 1].level >= item.level
    )
      parents.pop();
    const parent = parents[parents.length - 1];
    if (parent) parent.children.push(item);
    else toc.push(item);
    parents.push(item);
  });

  return toc;
};

export const GuideNavigation = ({ sections }: { sections: GuideSection[] }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const setIdFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) setActiveId(id);
    };
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        "article h1, article h2, article h3",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
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
  }, []);

  const toc = getToc(sections);
  const linkClass = (id: string, nested = false) =>
    `block rounded py-1 ${nested ? "text-sm" : ""} ${
      activeId === id
        ? "bg-purple-100 px-2 font-semibold opacity-100 dark:bg-zinc-800"
        : "opacity-70 hover:opacity-100 hover:underline"
    }`;

  return (
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
  );
};
