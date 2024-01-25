import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openai"
          width={"20px"}
          height={"20px"}
          className="image-inverted"
        />
      </Link>{" "}
      <Link to={"/"} style={{textDecoration:"none"}}>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span >CHAT</span>-GPT
      </Typography>
      </Link>
    </div>
  );
};

export default Logo;
