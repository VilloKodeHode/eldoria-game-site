export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen text-potion-shop-lunar-pearl items-center py-16 flex flex-col px-2 md:px-8 lg:px-16">
      {children}
    </main>
  );
};
