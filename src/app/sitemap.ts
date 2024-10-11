import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultOptions = {
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  };

  const pages: MetadataRoute.Sitemap = [{ url: "https://labonion.com" }];

  return pages.map((po) => ({
    ...defaultOptions,
    ...po,
  })) as MetadataRoute.Sitemap;
}
