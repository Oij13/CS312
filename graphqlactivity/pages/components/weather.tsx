import { useState } from "react";

export default function PageComponentWeather() {
  const [clicked, setClicked] = useState(false);

  return (
    <section>
      <h1 onClick={() => setClicked((prev) => !prev)}>
        {clicked ? "Weather Clicked" : "Weather"}
      </h1>
    </section>
  );
}
