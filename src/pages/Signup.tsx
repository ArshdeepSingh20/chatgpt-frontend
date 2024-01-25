import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"280px"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems:"center"
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={500}
            >
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                padding:"10px",
                mt: 2,
                width: "150px",
                fontSize:"16px",
                borderRadius: 2,
                textTransform:"none",
                background:
                  "radial-gradient(231.94% 231.94% at 50% 100%, #8a6cff 0, rgba(53, 41, 128, 0) 25.24%), linear-gradient(180deg, rgba(243, 238, 255, 0), rgba(243, 238, 255, 0.04)), rgba(147, 130, 255, 0.01)",
                backgroundSize: "cover",
                color: "white",
                border: "1px solid lightgray",
                boxShadow:"0 0 0 0 rgba(16,0,51,.4), 0 2px 5px 0 rgba(16,0,51,.39), 0 8px 8px 0 rgba(16,0,51,.34), 0 19px 11px 0 rgba(16,0,51,.2), 0 34px 14px 0 rgba(16,0,51,.06), 0 53px 15px 0 rgba(16,0,51,.01), inset 0 0 12px 0 hsla(0,0%,100%,.08), inset 0 -8px 32px 0 #1e0d49",
                ":hover": {
                  background:
                    "radial-gradient(231.94% 231.94% at 50% 100%,#8a6cff 0,rgba(53,41,128,0) 25.24%),linear-gradient(180deg,rgba(243,238,255,0),rgba(243,238,255,.04)),rgba(147,130,255,.6)",
                  backgroundSize: "cover",
                  color: "white",
                  boxShadow:
                    "inset 0 0 12px 0 hsla(0,0%,100%,.08), inset 0 -8px 32px 0 #1e0d49, 0 0 0 0 rgba(16,0,51,.4), 0 2px 5px 0 rgba(16,0,51,.39), 0 8px 8px 0 rgba(16,0,51,.34), 0 19px 11px 0 rgba(16,0,51,.2), 0 34px 14px 0 rgba(16,0,51,.06), 0 53px 15px 0 rgba(16,0,51,.01)",
                },
              }}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
