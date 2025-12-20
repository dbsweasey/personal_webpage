import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactBtn(props) {
  let url;
  const getLogo = () => {
    switch (props.name) {
      case "github":
        url = "https://github.com/dbsweasey";
        return <GitHubIcon className="icon" fontSize="inherit" />;
      case "email":
        url = "mailto:davidbsweasey@gmail.com?subject=Website%20Inquiry";
        return <EmailIcon className="icon" fontSize="inherit" />;
      case "linkedin":
        url = "https://www.linkedin.com/in/david-sweasey/";
        return <LinkedInIcon className="icon" fontSize="inherit" />;
    }
  };

  const logo = getLogo();

  return (
    <a href={url} target="_blank" className="logo elevated-button">
      {logo}
    </a>
  );
}
