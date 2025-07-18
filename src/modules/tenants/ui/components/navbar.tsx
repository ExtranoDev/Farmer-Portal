"use client";

import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HomeIcon, ShoppingCartIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

interface Props {
  slug: string;
}

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button className="bg-white" disabled>
        <ShoppingCartIcon className="text-black" />
      </Button>
    ),
  }
);

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <nav className="h-20 border-b font-medium bg-white flex">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12 w-full">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <div className="max-w-(--breakpoint-xl) flex items-center h-full gap-2">
          <Button
            variant="elevated"
            asChild
            className="flex items-center justify-center "
          >
            <Link href={process.env.NEXT_PUBLIC_APP_URL!} className="">
              <HomeIcon size={4} />
            </Link>
          </Button>
          <CheckoutButton hideIfEmpty tenantSlug={slug} />
        </div>
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button className="bg-white" disabled>
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
};
