"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const races = [
  "Eldrin",
  "Human",
  "Umbran",
  "Stonekin",
  "Skyforged",
  "Verdwalker",
  "Eidralis",
];
const classes = [
  "Cleric",
  "Barbarian",
  "Engineer",
  "Warrior",
  "Mage",
  "Summoner",
  "Thief",
  "Defender",
];

export function CreateCharacter() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [race, setRace] = useState(races[0]);
  const [playerClass, setPlayerClass] = useState(classes[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, race, playerClass }),
    });

    const data = await response.json();

    if (response.ok) {
      router.refresh();
    } else {
      setError(data.error || "something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-obsidian-black border-2 border-lunar-pearl text-lunar-pearl rounded-2xl">
      <h2 className="text-4xl">Character creation</h2>
      {error && <p className="text-crimson-flame">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          maxLength={20}
          type="text"
          placeholder="Character name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border-2 border-lunar-pearl bg-obsidian-black text-lunar-pearl rounded-md"
        />
        <select
          onChange={(e) => setRace(e.target.value)}
          className="w-full p-2 border-2 border-lunar-pearl bg-obsidian-black text-lunar-pearl rounded-md"
        >
          <option key="default" value="">
            Select a race
          </option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
        <select
          value={playerClass}
          onChange={(e) => setPlayerClass(e.target.value)}
          className="w-full p-2 border-2 border-lunar-pearl bg-obsidian-black text-lunar-pearl rounded-md"
        >
          {classes.map((playerClass) => (
            <option key={playerClass} value={playerClass}>
              {playerClass}
            </option>
          ))}
        </select>
        <button
          className="w-full p-2 border-2 border-lunar-pearl bg-obsidian-black text-lunar-pearl rounded-md"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
