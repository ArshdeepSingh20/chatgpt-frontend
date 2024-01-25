import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your Own AI",
        1000,
        "Built With OpenAI",
        2000,
        "Your Own Customized ChatGPT",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "55px",
        color: "white",
        fontWeight:"600",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
