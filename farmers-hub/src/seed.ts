import { getPayload } from "payload";
import config from "@payload-config";
// import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Fresh Fruits",
    color: "#FFA07A",
    slug: "fresh-fruits",
    subcategories: [
      { name: "Citrus", slug: "citrus" },
      { name: "Berries", slug: "berries" },
      { name: "Tropical Fruits", slug: "tropical-fruits" },
      { name: "Stone Fruits", slug: "stone-fruits" },
      { name: "Melons", slug: "melons" },
      { name: "Pome Fruits", slug: "pome-fruits" },
      { name: "Exotic Fruits", slug: "exotic-fruits" },
      { name: "Bananas & Plantains", slug: "bananas-plantains" },
      { name: "Grapes", slug: "grapes" },
      { name: "Avocados", slug: "avocados" },
    ],
  },
  {
    name: "Cut & Ready-to-Eat",
    color: "#FFD700",
    slug: "cut-ready-to-eat",
    subcategories: [
      { name: "Fruit Salads", slug: "fruit-salads" },
      { name: "Snack Packs", slug: "snack-packs" },
      { name: "Smoothie Packs", slug: "smoothie-packs" },
      { name: "Pre-Sliced Fruits", slug: "pre-sliced-fruits" },
    ],
  },
  {
    name: "Organic Fruits",
    color: "#98FB98",
    slug: "organic-fruits",
    subcategories: [
      { name: "Certified Organic", slug: "certified-organic" },
      { name: "Locally Grown", slug: "locally-grown" },
      { name: "Non-GMO", slug: "non-gmo" },
    ],
  },
  {
    name: "Dried & Preserved",
    color: "#DEB887",
    slug: "dried-preserved",
    subcategories: [
      { name: "Dried Fruits", slug: "dried-fruits" },
      { name: "Candied Fruits", slug: "candied-fruits" },
      { name: "Fruit Chips", slug: "fruit-chips" },
      { name: "Sun-Dried", slug: "sun-dried" },
    ],
  },
  {
    name: "Juicing & Blending",
    color: "#FFB6C1",
    slug: "juicing-blending",
    subcategories: [
      { name: "Juicing Fruits", slug: "juicing-fruits" },
      { name: "Smoothie Fruits", slug: "smoothie-fruits" },
      { name: "Cold-Pressed Juices", slug: "cold-pressed-juices" },
      { name: "Detox Packs", slug: "detox-packs" },
    ],
  },
  {
    name: "Fruit Baskets & Gifts",
    color: "#DA70D6",
    slug: "fruit-baskets-gifts",
    subcategories: [
      { name: "Gift Baskets", slug: "gift-baskets" },
      { name: "Corporate Gifts", slug: "corporate-gifts" },
      { name: "Holiday Specials", slug: "holiday-specials" },
      { name: "Birthday Baskets", slug: "birthday-baskets" },
      { name: "Get Well Soon", slug: "get-well-soon" },
    ],
  },
  {
    name: "Seasonal Fruits",
    color: "#ADD8E6",
    slug: "seasonal-fruits",
    subcategories: [
      { name: "Spring Fruits", slug: "spring-fruits" },
      { name: "Summer Fruits", slug: "summer-fruits" },
      { name: "Autumn Fruits", slug: "autumn-fruits" },
      { name: "Winter Fruits", slug: "winter-fruits" },
      { name: "Limited Time Offers", slug: "limited-time-offers" },
    ],
  },
  {
    name: "Special Diets",
    color: "#F5DEB3",
    slug: "special-diets",
    subcategories: [
      { name: "Low Sugar", slug: "low-sugar" },
      { name: "Keto-Friendly", slug: "keto-friendly" },
      { name: "High Fiber", slug: "high-fiber" },
      { name: "Diabetic Friendly", slug: "diabetic-friendly" },
      { name: "Heart Healthy", slug: "heart-healthy" },
    ],
  },
  {
    name: "By Use Case",
    color: "#E6E6FA",
    slug: "by-use-case",
    subcategories: [
      { name: "For Kids", slug: "for-kids" },
      { name: "For Office", slug: "for-office" },
      { name: "For Events", slug: "for-events" },
      { name: "For Fitness", slug: "for-fitness" },
      { name: "For Cooking", slug: "for-cooking" },
    ],
  },
  {
    name: "Frozen Fruits",
    color: "#87CEFA",
    slug: "frozen-fruits",
    subcategories: [
      { name: "Frozen Berries", slug: "frozen-berries" },
      { name: "Frozen Mango", slug: "frozen-mango" },
      { name: "Frozen Mixed Fruits", slug: "frozen-mixed-fruits" },
    ],
  },
  {
    name: "Fruit Combos",
    color: "#F08080",
    slug: "fruit-combos",
    subcategories: [
      { name: "Breakfast Combos", slug: "breakfast-combos" },
      { name: "Smoothie Combos", slug: "smoothie-combos" },
      { name: "Family Packs", slug: "family-packs" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // const adminAccount = await stripe.accounts.create({});

  // create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });

  // create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seeding successful");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding", error);
  process.exit(1);
}
