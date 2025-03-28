export async function addToInventory(itemId: string, itemType: string, amount = 1) {
    const response = await fetch("/api/player/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, itemType, amount }),
    });
  
    if (!response.ok) {
      console.error("Failed to add item to inventory:", await response.json());
      throw new Error("Failed to update inventory");
    }
  
    return response.json();
  }