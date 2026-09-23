import { MetadataRoute } from "next";
import { allChecklists } from "@/data/checklists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pastorsprovision.com";

  // Checklists paths
  const checklistUrls = allChecklists.map((category) => ({
    url: `${baseUrl}/checklists/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Static paths
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...checklistUrls];
}
