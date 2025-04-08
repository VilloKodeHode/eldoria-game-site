

export default async function Home() {
  // const { data } = await sanityFetch({query: allItems});
  return (
    <>
      <section
        className={`flex flex-col items-center min-h-screen justify-center `}>
        {/* {loading && <span>Loading...</span>} */}

        <h1 className={`text-9xl`}>Eldoria game</h1>
    
        <p>use the compass in the top left corner to check out locations!</p>
      </section>
    </>
  );
}
