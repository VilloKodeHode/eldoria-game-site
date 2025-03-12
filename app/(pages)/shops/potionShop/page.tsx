"use client";

import { ingredients } from "@/app/(pages)/shops/potionShop/data/ingredients";
import { CraftSection } from "@/app/components/shops/buttons/CraftSection";
import { potionShopTexts } from "./data/potionShopTexts";

// import { potions } from "@/app/(pages)/shops/potionShop/data/potions";



export default function Home() {
  // const [craftedPotions, setCraftedPotions] = useState([]);
  console.log(potionShopTexts);
  return (
    <>
      <div className="brew-area">
        <CraftSection items={ingredients} />

        <div className="brew-buttons">
          <button id="brew">{potionShopTexts.createButton}</button>
          <div className="result-area">
            <p id="potionResultText">{potionShopTexts.resultText}</p>
            {/* <Image width={300} height={300} id="potionResultImage" src="" alt="" /> */}
          </div>
          <button id="reset">{potionShopTexts.resetButton}</button>
        </div>
      </div>

      <div id="books">
        <button id="almanac-button">{potionShopTexts.almanacButton}</button>
        <button id="compendium-button">{potionShopTexts.compendiumButton}</button>

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
