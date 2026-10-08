import { siteUrl } from "@/lib/site";
import { getSources } from "@/lib/content";
export function ArticleSchema({
  title,
  description,
  path,
  sourceIds,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  sourceIds: string[];
  updated: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl()}${path}`,
    dateModified: updated,
    publisher: { "@type": "Organization", name: "ANTHROVERSE" },
    citation: getSources(sourceIds).map((s) => s.url),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
