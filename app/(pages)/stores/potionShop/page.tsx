"use client"

// import Image from "next/image";
import { ingredients } from './data/ingredients';
import { useState } from "react";
import { CraftSection } from "@/app/components/shops/buttons/CraftSection";
import { potions } from '@/app/(pages)/stores/potionShop/data/potions';


export default function Home() {
    const [currentIngredients, setCurrentIngredients] = useState(ingredients);
    const [craftedPotions, setCraftedPotions] = useState([]);

    return (
     <>
    <div className="brew-area">
   
<CraftSection craftingMaterials={ingredients} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients} />
     
      <div className="brew-buttons">
        <button id="brew">Brew</button>
        <div className="result-area">
          <p id="potionResultText">Brew a potion:</p>
          {/* <Image width={300} height={300} id="potionResultImage" src="" alt="" /> */}
        </div>
        <button id="reset">Reset</button>
      </div>
    </div>

    <div id="books">
      <button id="almanac-button">Open Almanac</button>
      <button id="compendium-button">Open Compendium</button>

      <div id="almanac">
        <div id="almanac-content" className="almanac-content">
          <div className="almanac-background"></div>
        </div>
      </div>

      <div id="compendium">
        <div id="compendium-content" className="compendium-content">
          <div className="compendium-background"></div>
        </div>
      </div>
    </div>
    <div className="background"></div>
     </>
    );
  }
  