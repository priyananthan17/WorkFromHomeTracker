import { GitHub, LinkedIn } from "@mui/icons-material";

const AdsData = [
  {
    name: "GitHub",
    url: "https://github.com/",
    icon: <GitHub fontSize="large" />,
    description: "GitHub is a web-based hosting service for version control of code using Git.",
    installs: 835,
    updated: "May 4, 2025",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/feed/",
    icon: <LinkedIn fontSize="large" />,
    description: "LinkedIn is a portal for searching for jobs and displaying skills.",
    installs: 85,
    updated: "May 4, 2025",
  },
  {
    name: "Rentify",
    url: "https://rentifybikerental.netlify.app/",
    icon: (
      <img
        src="https://www.rentify.co.ug/static/media/logo.d1ab13c39a6f82ee2d93.png"
        alt="Rentify Logo"
        width="40"
        height="40"
      />
    ),
    description:
      "Rentify is a bike rental platform offering affordable, convenient, and reliable two-wheeler rentals for travelers and commuters.",
    installs: 205,
    updated: "May 7, 2025",
  },
  {
    name: "Dropbox",
    url: "https://www.dropbox.com/",
    icon: (
      <img
        src="https://d33wubrfki0l68.cloudfront.net/33b6aba6009f1635ca406dc2383b9a774bbe5118/2d63b/images/integrations/dropbox.png"
        alt="Dropbox Logo"
        width="40"
        height="40"
      />
    ),
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, and a personal cloud.",
    installs: 125,
    updated: "May 8, 2025",
  },
  {
    name: "Medium",
    url: "https://medium.com/",
    icon: (
      <img
        src="https://www.pngrepo.com/png/165281/180/medium.png"
        alt="Medium Logo"
        width="40"
        height="40"
      />
    ),
    description:
      "Medium is an online publishing platform developed by Evan Williams, launched in August 2012.",
    installs: 100,
    updated: "May 8, 2025",
  },
];
export default AdsData;