import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { colors as lightColors } from "./colors";
import { colors as darkColors } from "./colorsDark";
import { FormattedMessage } from "react-intl";

export type TimelineEvent = {
  icon: React.ReactNode;
  titleId: string;
  whenId: string;
  details: React.ReactNode;
};

export type Project = {
  id: string;
  hrefEN?: string;
  hrefFI?: string;
};

export const projects: Project[] = [
  {
    id: "projectHusDatalakeTitle",
    hrefEN:
      "https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2021/an-agile-and-cost-effective-way-to-combine-patient-data-from-different-systems-it-already-exists-and-this-is-how-it-works/",
    hrefFI:
      "https://www.tietoevry.com/fi/asiakkaitamme/2019/HUS-kehittaa-kliinisen-datan-hyodyntamista-tietoallas-ratkaisulla/",
  },
  {
    id: "projectMedicalPocTitle",
    hrefEN:
      "https://www.tietoevry.com/en/success-stories/2024/generative-ai-pilot-assists-clinicians-at-new-childrens-hospital/",
    hrefFI:
      "https://www.tietoevry.com/fi/asiakkaitamme/2024/generatiivinen-tekoaly-auttaa-kliinikoita-paatoksenteossa-uudessa-lastensairaalassa/",
  },
  { id: "projectIctDaysTitle" },
  {
    id: "projectAnyhauTitle",
    hrefEN: "https://app.anyhau.fi/en/partners",
    hrefFI: "https://app.anyhau.fi/partners",
  },
];

export const highlightedEvents: TimelineEvent[] = [
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventTietoevryTitle",
    whenId: "eventTietoevryWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventTietoevryP1" />
          <FormattedMessage id="eventTietoevryP2" />
        </Typography>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
            fontWeight: 600,
          }}
        >
          <FormattedMessage id="eventTietoevryNotable" />
        </Typography>
        <List
          sx={{
            listStyle: "disc",
            pl: 4,
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
            "& .MuiListItem-root": { display: "list-item", p: 0 },
          }}
        >
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB1" />}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB2" />}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB3" />}
            />
          </ListItem>
        </List>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventAnyhauTitle",
    whenId: "eventAnyhauWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventAnyhauP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventHiveTitle",
    whenId: "eventHiveWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventHiveP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventSataEduTitle",
    whenId: "eventSataEduWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventSataEduP1" />
          <FormattedMessage id="eventSataEduP2" />
        </Typography>
      </>
    ),
  },
];

export const allEvents: TimelineEvent[] = [
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventTietoevryTitle",
    whenId: "eventTietoevryWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventTietoevryP1" />
          <FormattedMessage id="eventTietoevryP2" />
        </Typography>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
            fontWeight: 600,
          }}
        >
          <FormattedMessage id="eventTietoevryNotable" />
        </Typography>
        <List
          sx={{
            listStyle: "disc",
            pl: 4,
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
            "& .MuiListItem-root": { display: "list-item", p: 0 },
          }}
        >
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB1" />}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB2" />}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<FormattedMessage id="eventTietoevryB3" />}
            />
          </ListItem>
        </List>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventAnyhauTitle",
    whenId: "eventAnyhauWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventAnyhauP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventHiveTitle",
    whenId: "eventHiveWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventHiveP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventTekijaRentTitle",
    whenId: "eventTekijaRentWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventTekijaRentP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventKotipalveluTitle",
    whenId: "eventKotipalveluWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventKotipalveluP1" />
          <FormattedMessage id="eventKotipalveluP2" />
          <FormattedMessage id="eventKotipalveluP3" />
          <FormattedMessage id="eventKotipalveluP4" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventLumundooTitle",
    whenId: "eventLumundooWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventLumundooP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventAaltovoimaTitle",
    whenId: "eventAaltovoimaWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventAaltovoimaP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventEnersenseTitle",
    whenId: "eventEnersenseWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventEnersenseP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventDeltamarinTitle",
    whenId: "eventDeltamarinWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventDeltamarinP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventSataEduTitle",
    whenId: "eventSataEduWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventSataEduP1" />
          <FormattedMessage id="eventSataEduP2" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />,
    titleId: "eventBkszcTitle",
    whenId: "eventBkszcWhen",
    details: (
      <>
        <Typography
          sx={{
            color: (theme) =>
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <FormattedMessage id="eventBkszcP1" />
          <FormattedMessage id="eventBkszcP2" />
          <FormattedMessage id="eventBkszcP3" />
          <FormattedMessage id="eventBkszcP4" />
        </Typography>
      </>
    ),
  },
];

export const categories = [
  {
    id: "skillsCatFrontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "GraphQL",
      "HTML5",
      "CSS3",
      "JavaScript",
    ],
  },
  {
    id: "skillsCatBackend",
    items: [
      "Node.js/Express",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "MariaDB",
      "Redis",
      "GraphQL",
    ],
  },
  {
    id: "skillsCatTools",
    items: [
      "Azure DevOps",
      "Azure Cloud",
      "GitHub",
      "GitLab",
      "Git",
      "CI/CD pipelines",
      "Docker",
      "Kubernetes",
      "Asana",
      "Atlassian",
      "Jira",
      "Confluence",
      "Miro",
      "MAMP",
      "XAMPP",
      "LAMP",
      "MyphpAdmin",
      "pgAdmin",
      "DataGrip",
      "Postico 2",
      "DBeaver",
      "Mongoose",
      "Postman",
      "Lucidchart",
      "Bulma",
      "MUI",
      "Tailwind",
      "Redux",
      "Recoil",
      "Jotai",
      "VS Code",
      "Vim",
      "CLI",
      "Termux",
    ],
  },
];
