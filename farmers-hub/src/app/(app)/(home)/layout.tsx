import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersSkelenton } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkelenton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
