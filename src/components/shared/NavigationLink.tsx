import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  buttonWidth:string,
  onClick?: () => Promise<void>;
};
const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ width: props.buttonWidth }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
