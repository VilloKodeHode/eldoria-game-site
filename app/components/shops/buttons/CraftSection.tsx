"use client";

import { MaterialType } from "@/app/interfaces/shopTypes";
import { useShopStore } from "@/app/stores/shopStore/shopStore";
import Image from "next/image";
import { useEffect } from "react";

interface CraftSectionProps {
  material: Record<string, MaterialType>;
  materialType: string;
}
export const CraftSection: React.FC<CraftSectionProps> = ({
  material,
  materialType,
}) => {
  const {
    data,
    setData,
    increaseMaterialAmount,
    decreaseMaterialAmount,
    // resetMaterials,
  } = useShopStore();

  useEffect(() => {
    // const existingData = useShopStore.getState().data;
    // if (!existingData) {
    setData(materialType, material);
    // }
  }, [material, materialType, setData]);

  useEffect(() => {
    console.log(data);
    // console.log(material);
  }, [data]);
  return (
    <>
      <div className="flex flex-wrap gap-16 justify-center">
        {data[materialType] &&
          Object.keys(data[materialType]).map((key) => {
            const materials = data[materialType][key];
            return (
              <div
                key={materials.id}
                className={`h-50 w-50 relative flex flex-col justify-between bg-potion-shop-lunar-pearl-translucent`}>
                <Image
                  className="absolute top-0 left-0 -z-10"
                  width={200}
                  height={200}
                  src={materials.src}
                  alt=""
                />
                <p>{materials.name}</p>
                <div className="flex flex-col w-full justify-center">
                  <span className="">{materials.amount}</span>
                  <div className="flex justify-between">
                    <button
                      className="text-2xl"
                      onClick={() => increaseMaterialAmount(materialType, key)}>
                      +
                    </button>
                    <button
                      className="text-2xl"
                      onClick={() => decreaseMaterialAmount(materialType, key)}>
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
