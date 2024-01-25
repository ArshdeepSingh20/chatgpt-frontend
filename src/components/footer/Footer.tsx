import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "10vh",
          maxHeight: "15vh",
          marginTop:"90px",
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://www.sweetdesignhub.com/"}
            >
              Sweet Design Hub
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
