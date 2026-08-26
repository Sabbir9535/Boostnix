import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  // Facebook
  { name: "Facebook Followers", category: "Facebook", description: "Real-looking followers delivered gradually to your profile.", quantity: 1000, price: 57.9, pricePerUnit: 0.0579 },
  { name: "Facebook Followers", category: "Facebook", description: "Real-looking followers delivered gradually to your profile.", quantity: 2000, price: 115.8, pricePerUnit: 0.0579 },
  { name: "Facebook Page Likes", category: "Facebook", description: "Grow your Page's like count with steady, natural delivery.", quantity: 1000, price: 62.0, pricePerUnit: 0.062 },
  { name: "Facebook Post Likes", category: "Facebook", description: "Boost engagement on a specific post.", quantity: 500, price: 35.0, pricePerUnit: 0.07 },
  { name: "Facebook Video Views", category: "Facebook", description: "Increase view count on your video content.", quantity: 5000, price: 45.0, pricePerUnit: 0.009 },
  // Instagram
  { name: "Instagram Followers", category: "Instagram", description: "High-retention followers delivered gradually.", quantity: 1000, price: 69.9, pricePerUnit: 0.0699 },
  { name: "Instagram Followers", category: "Instagram", description: "High-retention followers delivered gradually.", quantity: 2000, price: 132.9, pricePerUnit: 0.06645 },
  { name: "Instagram Likes", category: "Instagram", description: "Fast delivery likes for posts and reels.", quantity: 1000, price: 40.0, pricePerUnit: 0.04 },
  { name: "Instagram Views", category: "Instagram", description: "Views for reels, videos, and stories.", quantity: 5000, price: 30.0, pricePerUnit: 0.006 },
  // TikTok
  { name: "TikTok Followers", category: "TikTok", description: "Grow your TikTok audience steadily.", quantity: 1000, price: 75.0, pricePerUnit: 0.075 },
  { name: "TikTok Likes", category: "TikTok", description: "Boost likes on your TikTok videos.", quantity: 1000, price: 38.0, pricePerUnit: 0.038 },
  { name: "TikTok Views", category: "TikTok", description: "Increase your video view count quickly.", quantity: 10000, price: 25.0, pricePerUnit: 0.0025 },
  // YouTube
  { name: "YouTube Views", category: "YouTube", description: "Retention-friendly views for your videos.", quantity: 1000, price: 90.0, pricePerUnit: 0.09 },
  { name: "YouTube Subscribers", category: "YouTube", description: "Grow your channel's subscriber count.", quantity: 500, price: 150.0, pricePerUnit: 0.3 },
];

async function main() {
  console.log("Seeding services...");
  await prisma.service.deleteMany();
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`Seeded ${services.length} services.`);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
