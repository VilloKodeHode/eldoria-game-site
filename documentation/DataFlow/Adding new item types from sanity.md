# 🧪 How to Add New Item Types to the Game (e.g. Weapons, Armor, Jewelry)

This guide walks you through how to add new item types (like weapons, armor, etc.) from **Sanity** into the game, so they are fetched, stored, hydrated, and rendered correctly in the frontend.

---

## 1. 🌀 Define GROQ Query & Fetch Function

### 🗞️ In `lib/sanity/queries.ts`:

```ts
export const allWeapons = defineQuery(`
  *[_type == "item" && "weapon" in subCategory] {
    _id,
    name,
    description,
    "src": src.asset->url,
    category,
    subCategory,
    buyPrice,
    sellPrice
    // Add more fields if needed (e.g. damage, durability)
  }
`);
```

### 🔍 In `lib/sanity/fetchers.ts`:

```ts
export async function cacheFetchAllWeapons() {
  return client.fetch(allWeapons);
}
```

Repeat this for other types (armor, jewelry, etc.).

---

## 2. 🧠 Extend Zustand Sanity Store

### ✍️ In `interfaces/sanity.ts`:

```ts
export interface SanityDataStore {
  weapons: ShopItem[];
  setWeapons: (items: ShopItem[]) => void;
  // existing fields...
  sanityLoaded: boolean;
  setSanityLoaded: (value: boolean) => void;
}
```

### ⚡ In `stores/sanityDataStore.ts`:

```ts
export const useSanityDataStore = create<SanityDataStore>((set) => ({
  weapons: [],
  setWeapons: (items) => set({ weapons: items }),
  // existing store setup...
}));
```

---

## 3. 🔀 Update `SanityDataLoader`

In `lib/sanity/SanityDataLoader.ts`, update your loader to fetch and set the new data:

```ts
import { cacheFetchAllWeapons } from "./fetchers";

useEffect(() => {
  async function fetchAndStore() {
    const [ingredients, potions, weapons] = await Promise.all([
      cacheFetchAllIngredients(),
      cacheFetchAllPotions(),
      cacheFetchAllWeapons(), // New
    ]);

    setIngredients(ingredients);
    setPotions(potions);
    setWeapons(weapons); // New
    setSanityLoaded(true);
  }

  fetchAndStore();
}, []);
```

---

## 4. 💾 Update `PlayerInventoryLoader`

In `lib/mongoDB/PlayerInventoryLoader.ts`, expand the included items used for enriching MongoDB data:

```ts
const sanityItems = [
  ...sanityData.ingredients,
  ...sanityData.potions,
  ...sanityData.weapons, // Add new types here
  // ...sanityData.armor,
  // ...sanityData.jewelry,
];
```

Make sure your `InventoryItem` interface supports new optional fields (like `weapon`, `armor`, etc.) as needed.

---

## 5. 🧹 Optional: Update UI Components

Update components like `CharacterInventory`, `CraftSection`, `TradeSection`, etc. to render the new item types if needed:

```ts
// Example filter
const weapons = playerInventory.items.filter((i) => i.type === "weapon");
```

---

## ✅ Done!

Your new item types will now:

- Be fetched from Sanity
- Stored in Zustand
- Enriched on inventory load
- Displayed in the UI

You can now expand recipes, shops, and crafting to support these new item types as needed.
