import { getCollection } from "astro:content";

export async function GET() {
  // Pega todos os posts da coleção
  const posts = await getCollection("blog");

  // Cria conjunto único de categorias (sem duplicadas)
  const categoriesSet = new Set();

  for (const post of posts) {
    const cat = post.data.category;
    if (cat) {
      const slug = cat
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Mn}/gu, "")
        .replace(/\s+/g, "-");
      categoriesSet.add(JSON.stringify({ name: cat.trim(), slug }));
    }
  }

  // Converte para array final
  const categories = [...categoriesSet].map((x) => JSON.parse(x));

  return new Response(JSON.stringify(categories, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=3600, public", // cache leve
    },
  });
}
