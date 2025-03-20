"use client";

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

export function CreateCharacter({
  onCharacterCreated,
}: {
  onCharacterCreated: (character: any) => void;
}) {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [playerClass, setPlayerClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
}
