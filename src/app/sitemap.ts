import type { MetadataRoute } from "next";
import { getPublicCatalog } from "@/lib/commerce-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://novidades.store";
  const catalog = await getPublicCatalog();

  const staticRoutes = [
    "",
    "/conteudos-digitais",
    "/cursos",
    "/aulas",
    "/webinars",
    "/ebooks",
    "/ferramentas",
    "/sobre",
    "/contato",
    "/ajuda",
    "/termos",
    "/privacidade",
    "/cookies",
    "/direitos-de-privacidade",
    "/informacoes-legais",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : ["/conteudos-digitais", "/cursos", "/aulas", "/webinars", "/ebooks"].includes(path) ? 0.85 : 0.35,
  }));

  const productEntries: MetadataRoute.Sitemap = catalog
    .filter((item) => item.fulfillmentType === "digital" && item.priceCents !== null)
    .map((item) => ({
      url: base + "/" + encodeURIComponent(item.categorySlug) + "/" + encodeURIComponent(item.slug),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: item.featured ? 0.8 : 0.65,
    }));

  return [...staticEntries, ...productEntries];
}
