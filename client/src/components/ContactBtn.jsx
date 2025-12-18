import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactBtn(props) {
  let url;
  const getLogo = () => {
    switch (props.name) {
      case "github":
        url = "https://dbsweasey.github.io";
        return (
          <GitHubIcon
            style={{ color: "white", width: "auto", height: "auto" }}
          />
        );
      case "email":
        url = "https://google.com";
        return <EmailIcon style={{ width: "auto", height: "auto" }} />;
      case "linkedin":
        url = "https://www.linkedin.com/in/david-sweasey/";
        return <LinkedInIcon style={{ width: "auto", height: "auto" }} />;
    }
  };

  const logo = getLogo();

  return (
    <a href={url} target="_blank" className="logo elevated-button">
      {logo}
    </a>
  );
}
