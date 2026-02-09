import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_LANGUAGE } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || post.data.metaDescription || "",
      link: `/blog/${post.id}/`,
      pubDate: new Date(post.data.pubDate),
      customData: post.data.heroImage
        ? `<media:content url="${post.data.heroImage}" medium="image" />`
        : "",
    })),
    // ✅ Define proper XML namespaces and metadata
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
    },
    customData: `
      <language>${SITE_LANGUAGE}</language>
      <image>
        <url>${context.site}favicon.png</url>
        <title>${SITE_TITLE}</title>
        <link>${context.site}</link>
      </image>
      <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />
    `,
  });
}
