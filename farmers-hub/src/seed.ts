import { getPayload } from "payload";
import config from "@payload-config";
// import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "Vegetables",
    color: "#32CD32",
    slug: "vegetables",
    subcategories: [
      { name: "Tomatoes", slug: "tomatoes" },
      { name: "Peppers", slug: "peppers" },
      { name: "Onions", slug: "onions" },
      { name: "Okra", slug: "okra" },
      { name: "Garden Egg", slug: "garden-egg" },
      { name: "Amaranth Leaf", slug: "amaranth-leaf" },
      { name: "Fluted Pumpkin Leaf (Ugu)", slug: "fluted-pumpkin-leaf" },
    ],
  },
  {
    name: "Fruits",
    color: "#FFA500",
    slug: "fruits",
    subcategories: [
      { name: "Mango", slug: "mango" },
      { name: "Pineapple", slug: "pineapple" },
      { name: "Banana", slug: "banana" },
      { name: "Orange", slug: "orange" },
      { name: "Guava", slug: "guava" },
      { name: "Watermelon", slug: "watermelon" },
      { name: "Pawpaw (Papaya)", slug: "pawpaw" },
      { name: "Avocado", slug: "avocado" },
    ],
  },
  {
    name: "Grains",
    color: "#DAA520",
    slug: "grains",
    subcategories: [
      { name: "Maize (Corn)", slug: "maize" },
      { name: "Sorghum", slug: "sorghum" },
      { name: "Millet", slug: "millet" },
      { name: "Rice", slug: "rice" },
      { name: "Fonio (Acha)", slug: "fonio" },
    ],
  },
  {
    name: "Legumes",
    color: "#8B4513",
    slug: "legumes",
    subcategories: [
      { name: "Cowpea (Brown Beans)", slug: "cowpea" },
      { name: "Soybean", slug: "soybean" },
      { name: "Groundnut (Peanut)", slug: "groundnut" },
      { name: "Bambara Nut", slug: "bambara-nut" },
      { name: "Pigeon Pea", slug: "pigeon-pea" },
    ],
  },
  {
    name: "Root Crops",
    color: "#A0522D",
    slug: "root-crops",
    subcategories: [
      { name: "Cassava", slug: "cassava" },
      { name: "Yam", slug: "yam" },
      { name: "Sweet Potato", slug: "sweet-potato" },
      { name: "Cocoyam", slug: "cocoyam" },
      { name: "Taro", slug: "taro" },
    ],
  },
  {
    name: "Oil Crops",
    color: "#FFD700",
    slug: "oil-crops",
    subcategories: [
      { name: "Palm Fruit", slug: "palm-fruit" },
      { name: "Sesame Seed", slug: "sesame-seed" },
      { name: "Castor Seed", slug: "castor-seed" },
      { name: "Shea Nut", slug: "shea-nut" },
      { name: "Beniseed", slug: "beniseed" },
    ],
  },
  {
    name: "Spices & Herbs",
    color: "#8FBC8F",
    slug: "spices-herbs",
    subcategories: [
      { name: "Ginger", slug: "ginger" },
      { name: "Turmeric", slug: "turmeric" },
      { name: "Scent Leaf", slug: "scent-leaf" },
      { name: "Basil", slug: "basil" },
      { name: "Lemongrass", slug: "lemongrass" },
      { name: "African Nutmeg (Ehuru)", slug: "african-nutmeg" },
    ],
  },
  {
    name: "Tuber Crops",
    color: "#DEB887",
    slug: "tuber-crops",
    subcategories: [
      { name: "Irish Potato", slug: "irish-potato" },
      { name: "Chinese Yam", slug: "chinese-yam" },
      { name: "Livingstone Potato", slug: "livingstone-potato" },
    ],
  },
  {
    name: "Plantain",
    color: "#9ACD32",
    slug: "plantain",
    subcategories: [
      { name: "Unripe Plantain", slug: "unripe-plantain" },
      { name: "Ripe Plantain", slug: "ripe-plantain" },
      { name: "Dried Plantain Chips", slug: "dried-plantain-chips" },
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
