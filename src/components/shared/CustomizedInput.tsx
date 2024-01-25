import TextField from "@mui/material/TextField";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "#ededed" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      placeholder=""
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 8,
          height:"60px",
          fontSize: 15,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
