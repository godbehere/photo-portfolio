export const HeroOverlay = ({
    variant = "black",
  }: {
    variant?: "black" | "gradient" | "color";
  }) => {
    const styles = {
      black: "bg-black/40",
      gradient: "bg-gradient-to-b from-black/60 via-black/30 to-transparent",
      color: "bg-indigo-800/40",
    };
  
    return <div className={`absolute inset-0 z-10 ${styles[variant]} pointer-events-none`} />;
  };