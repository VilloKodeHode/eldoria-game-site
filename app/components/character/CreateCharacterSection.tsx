// "use client"

// import { SignedIn} from "@clerk/nextjs";


// export const CreateCharacterSection = () => {
//     return (
//         <SignedIn>
//         {character ? (
//           <>
//             <DevCheats />
//             <CharacterInventory character={character} />
//             <CharacterRecipeBook />
//             <Map />
//             <main className="min-h-screen text-potion-shop-lunar-pearl items-center py-16 flex flex-col px-2 md:px-8 lg:px-16">
//               {children}
//               <SanityLive />
//             </main>
//           </>
//         ) : (
//           <CreateCharacter onCharacterCreated={setCharacter} />
//         )}
//       </SignedIn>
//     )
// }