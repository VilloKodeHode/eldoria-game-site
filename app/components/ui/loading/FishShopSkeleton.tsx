import { Skeleton } from "./Skeleton";

export const FishShopSkeleton = () => (
  <section className="grid gap-16">
    <Skeleton className="h-10 w-1/3 mx-auto" />

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-obsidian-black/40 h-44 grid grid-cols-[150px_1fr] gap-4">
          <Skeleton className="h-full w-full" />
          <div className="flex flex-col justify-between py-2 pr-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  </section>
);
