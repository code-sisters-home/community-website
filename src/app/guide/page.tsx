import { readFile } from "node:fs/promises";
import path from "node:path";
import { Container } from "@/components/Container";
import { Markdown, slugifyHeading } from "@/components/Markdown";
import { GuideNavigation, type GuideSection } from "./GuideNavigation";

const cleanTitle = (title: string) =>
  title
    .replace(/\[\[#?([^\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();

const getSections = (markdown: string): GuideSection[] =>
  markdown.split(/\r?\n/).reduce<GuideSection[]>((sections, line) => {
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

const renderWikiLinks = (markdown: string) =>
  markdown.replace(/\[\[#?([^\]]+)\]\]/g, (_match, value: string) => {
    const [rawTarget, rawLabel] = value.split("|");
    const target = cleanTitle(rawTarget);
    const label = cleanTitle(rawLabel ?? rawTarget);
    return "[" + label + "](#" + slugifyHeading(target) + ")";
  });

export default async function GuidePage() {
  const guidePath = path.join(process.cwd(), "public", "guide.md");
  const content = renderWikiLinks(await readFile(guidePath, "utf8"));
  const sections = getSections(content);

  return (
    <Container className="max-w-7xl py-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          <GuideNavigation sections={sections} />
        </aside>
        <article className="basic min-w-0 widget">
          <Markdown content={content} />
        </article>
      </div>
    </Container>
  );
}
