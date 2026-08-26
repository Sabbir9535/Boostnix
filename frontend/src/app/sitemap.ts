import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boostnix.edufuze.com';
  const currentDate = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/track`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/d3a7f51f-6745-447f-b19a-fd8ae8619998`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/63d4d61c-061a-45b0-9997-ab5652f76257`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/6e0a5842-3257-473c-89ea-1ac7aa805425`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/c43e4d09-7239-4021-9def-8f1e5e796141`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/7de1ec6e-3988-447a-a7b1-73f5efe229dd`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/17f9fc33-8e8d-4b8c-a91b-6df458c8236a`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/order/7582e43c-46b0-4529-9f4d-25d717e9ef34`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 },
    { url: `${baseUrl}/order/635101c8-bfa1-4a62-ab20-6b45ecc97094`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 },
    { url: `${baseUrl}/order/025f8d2c-9b99-454d-ad9a-eba8a40e9149`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 },
    { url: `${baseUrl}/order/bc8cc359-f2ad-4f8f-bbef-f16dde1f486a`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 },
    { url: `${baseUrl}/order/b78d6c9e-8fcf-4594-b69c-c4c4f4bd5d89`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 },
    { url: `${baseUrl}/order/d6f3285a-f369-438a-8c0f-0004e104e340`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.64 }
  ]
}