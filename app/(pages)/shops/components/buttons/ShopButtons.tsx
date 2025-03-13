export const CraftButton = ({
  shopText,
  isCreateButton = false,
  isResetButton = false,
  onClick,
}) => {
  const textToUse = isCreateButton
    ? shopText.createButton
    : isResetButton
    ? shopText.resetButton
    : shopText.createButton; // prevents error
  const ButtonStyle = isCreateButton
    ? "bg-potion-shop-forest-emerald"
    : isResetButton
    ? "bg-potion-shop-crimson-flame"
    : ""; // fallback style
  return (
    <button
      onClick={onClick}
      className={`${ButtonStyle} p-8 text-shadow`}
      //   style={{ textShadow: "0px 0px 5px 5px black" }}
    >
      {textToUse}
    </button>
  );
};
