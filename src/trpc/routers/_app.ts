import { createTRPCRouter } from "@/trpc/init";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { authRouter } from "@/modules/auth/server/procedures";
import { productsRouter } from "@/modules/products/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedure";
import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { checkoutRouter } from "@/modules/checkout/server/procedure";
import { libraryRouter } from "@/modules/library/server/procedure";
import { reviewsRouter } from "@/modules/reviews/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  products: productsRouter,
  categories: categoriesRouter,
  checkout: checkoutRouter,
  library: libraryRouter,
  reviews: reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
