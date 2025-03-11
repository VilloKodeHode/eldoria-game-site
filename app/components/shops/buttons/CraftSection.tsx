"use client"
// import { MaterialType } from '../../../interfaces/materialType';


export const CraftSection = ({ currentIngredients, setCurrentIngredients, craftingMaterials }) => {
    
    function increaseAmount(material) {
setCurrentIngredients((prevMaterials)=> ({
    ...prevMaterials,
    [material]: {
        ...prevMaterials[material],
        amount: Math.min(prevMaterials[material].amount + 1, 10)
    }
}))
      }

      function decreaseAmount(material) {
    setCurrentIngredients((prevMaterials) => ({
        ...prevMaterials,
        [material]: {
            ...prevMaterials[material],
            amount: Math.max(prevMaterials[material].amount -1, 0)
        }
    }))
      }

  return (
    <>
      <div className="ingredients" id="ingredients">
        {Object.values(craftingMaterials).map((craftingMaterial) => (
          <div key={craftingMaterial.id} className="ingredient">
            <p>{craftingMaterial.name}</p>
            <div className="flex flex-wrap w-[150px]">
              <button className="text-9xl order-2"
                onClick={() =>
                  increaseAmount(craftingMaterial.name)
                }
              >
                +
              </button>
              <span className="text-9xl order-1">{currentIngredients[craftingMaterial.name].amount}</span>
              <button className="text-9xl order-3"
                onClick={() =>
                  decreaseAmount(craftingMaterial.name)
                }
              >-</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
