import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}
const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 1,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 4,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"25px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px", color:"#d3d3d3" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 1,
        background: "linear-gradient(to right, #1E0F3B 80%, #512b4f 100%)",
        gap: 2,
        borderRadius: 4,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "#c88bc4", color: "#d3d3d3", fontSize:"15px" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px", marginTop:"6px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
