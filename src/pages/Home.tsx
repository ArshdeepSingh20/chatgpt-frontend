import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
          justifyContent:"space-between"
        }}
      >
        <Box sx={{mb:13,}}>
          <TypingAnim />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "75%" : "55%",
              borderRadius: 20,
              boxShadow: "-5px -4px 65px 50px #1E0F3B",
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
