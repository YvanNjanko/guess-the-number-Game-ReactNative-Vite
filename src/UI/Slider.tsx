import React, { useState } from "react";

const SliderComponent: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(10);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
    localStorage.setItem("invervalValue", value.toString());
  };

  return (
    <div>
      <input
        type="range"
        min={10}
        max={1000}
        step={1}
        value={sliderValue}
        onChange={handleChange}
        style={{
          width: "50%",
        }}
      />
      <p>L'interval actuel du jeu est : 0 à {sliderValue}</p>
    </div>
  );
};

export default SliderComponent;
