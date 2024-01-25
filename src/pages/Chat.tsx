import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    console.log(chatData);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          const initialChats = data.chats || [];
          setChatMessages([...initialChats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          mt: 9.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            background:"linear-gradient(to right, #1d0e3a 60%, #240d23 100%)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "#d3d3d3",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name ? auth?.user?.name[0] : ""}
            {auth?.user?.name && auth?.user?.name.split(" ").length > 1 ? auth?.user?.name.split(" ")[1][0] : ""}
          </Avatar>
          <Typography sx={{ mx: "auto", color:"#d3d3d3" , fontFamily: "inter" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto",color:"#d3d3d3" ,fontFamily: "inter", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "#d3d3d3",
              fontWeight: "400",
              borderRadius: 2,
              textTransform:"none",
              mx: "auto",
              background: "radial-gradient(231.94% 231.94% at 50% 100%,#c88bc4 0,rgba(200,139,196,0) 25.24%),linear-gradient(180deg,rgba(243,238,255,0),rgba(243,238,255,.04)),rgba(200,139,196,.01)",
              backgroundSize: "cover",
              border:"1px solid",
              "--tw-border-opacity": 1,
              borderColor:"rgb(255 255 255/var(--tw-border-opacity))",
              boxShadow:"0 0 0 0 rgba(51,0,44,.4), 0 2px 5px 0 rgba(46,0,51,.39), 0 8px 8px 0 rgba(48,0,51,.34), 0 19px 11px 0 rgba(16,0,51,.2), 0 34px 14px 0 rgba(16,0,51,.06), 0 53px 15px 0 rgba(16,0,51,.01), inset 0 0 12px 0 hsla(0,0%,100%,.08), inset 0 -8px 32px 0 #1e001c",
              ":hover": {
                background: "radial-gradient(231.94% 231.94% at 50% 100%,#c88bc4 0,rgba(53,41,128,0) 25.24%),linear-gradient(180deg,rgba(255,238,254,0),rgba(255,238,254,.04)),rgba(255,130,251,.6)",
                backgroundSize: "cover",
                boxShadow:"inset 0 0 12px 0 hsla(0,0%,100%,.08), inset 0 -8px 32px 0 #490d44, 0 0 0 0 rgba(51,0,46,.4), 0 2px 5px 0 rgba(50,0,51,.39), 0 8px 8px 0 rgba(51,0,51,.34), 0 19px 11px 0 rgba(51,0,50,.2), 0 34px 14px 0 rgba(51,0,48,.06), 0 53px 15px 0 rgba(51,0,48,.01)"
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#ededed",
            mb: 4,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.length === 0 ? (
            <Typography
              sx={{
                fontSize: "18px",
                color: "#d3d3d3",
                mx: "auto",
                my: 4,
              }}
            >
              No chats to show.
            </Typography>
          ) : (
            chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          )}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 10,
            backgroundColor: "transparent",
            display: "flex",
            marginTop: "10px",
            border:"1px solid lightgray"
          }}
        >
          {" "}
          <input
            ref={inputRef}
            placeholder="Ask me anything ...."
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              borderRadius: 2,
              padding: "18px",
              outline: "none",
              color: "#d3d3d3",
              fontSize: "18px",
             border:"none"
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
