import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
    sequence={[
      "Welcome to Your Personal AI Assistant",
      1500,
      "Enhance Productivity with Smart Conversations",
      1500,
      "Ask Questions, Get Answers Instantly",
      1000,
      "Built with Cutting-Edge OpenAI Technology",
      2000,
      "Your Customized Chat Experience Awaits",
      1500,
      "Discover the Power of ChatGPT in Action",
      1500,
      "Effortless Communication, Intelligent Responses",
      2000,
      "Unlock the Potential of Conversational AI",
      1500,
      "Your Chat, Your Way – Tailored Just for You",
      1500,
      "Start Chatting and Explore Endless Possibilities",
      2000,
    ]}
    
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        fontWeight:"600",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
