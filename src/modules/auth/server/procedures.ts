import { headers as getHeaders } from "next/headers";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { registerSchema } from "../schemas";
import { deleteAuthCookies, generateAuthCookies } from "../utils";
// import { stripe } from "@/lib/stripe";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),
  // REGISTRATION
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      // const account = await stripe.accounts.create({});

      // if (!account) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Failed to create Stripe account",
      //   });
      // }

      const tenant = await ctx.db.create({
        collection: "tenants",
        data: {
          name: input.username,
          slug: input.username,
          stripeAccountId: Math.random().toString(36).substring(2, 10),
        },
      });

      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
          tenants: [{ tenant: tenant.id }],
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),
  // LOGIN
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });

      return data;
    }),
  logout: protectedProcedure.mutation(async () => {
    await deleteAuthCookies();
  }),
});
