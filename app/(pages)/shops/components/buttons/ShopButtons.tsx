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
    ? "bg-forest-emerald"
    : isResetButton
    ? "bg-crimson-flame"
    : ""; // fallback style
  return (
    <button
      onClick={onClick}
      className={`${ButtonStyle} self-center p-8 h-fit cursor-pointer text-4xl font-bold text-lunar-pearl text-shadow`}
        style={{ textShadow: "2px 2px 5px black" }}
    >
      {textToUse}
    </button>
  );
};
