export async function fetchPlayerInventory() {
  const res = await fetch("/api/player/inventory", { method: "GET" });

  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return await res.json();
}
