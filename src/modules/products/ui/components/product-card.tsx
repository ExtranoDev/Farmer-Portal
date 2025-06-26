import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
  price: number;
  tags?: string[];
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  reviewRating,
  reviewCount,
  price,
  tags = [],
}: ProductCardProps) => {
  const router = useRouter();

  return (
    <Link prefetch href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
      <div className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            className="object-cover"
            src={imageUrl || "/placeholder.png"}
          />
        </div>
        <div className="p-4 border-y flex flex-col gap-3 felx-1">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          {/* Tenant area as a button to avoid nested <a> and navigation conflicts */}
          <button
            type="button"
            className="flex items-center gap-2 bg-transparent border-none p-0 m-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push(generateTenantURL(tenantSlug));
            }}
          >
            {tenantImageUrl && (
              <Image
                alt={tenantSlug}
                src={tenantImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm underline font-medium">{tenantSlug}</p>
          </button>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
        <div className="p-4 flex items-center gap-2 justify-between">
          <div className="relative px-2 py-1 border bg-pink-400 w-fit">
            <p className="text-sm font-medium">{formatCurrency(price)}</p>
          </div>
          {/* Muted tags beside price, at most three */}
          {tags.length > 0 && (
            <div className="flex gap-1 overflow-hidden">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1 bg-neutral-200 text-neutral-500 text-xs font-medium rounded-md italic"
                  title={tag}
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
};
