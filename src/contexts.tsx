import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import colors from "./colors";
import { FormattedMessage } from "react-intl";

export type TimelineEvent = {
  icon: React.ReactNode;
  bgColor: string;
  titleId: string;
  whenId: string;
  details: React.ReactNode;
};

export const projects = [
  {
    id: "projectHusDatalakeTitle",
    href: "https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2021/an-agile-and-cost-effective-way-to-combine-patient-data-from-different-systems-it-already-exists-and-this-is-how-it-works/",
  },
  {
    id: "projectMedicalPocTitle",
    href: "https://www.tietoevry.com/fi/asiakkaitamme/2024/generatiivinen-tekoaly-auttaa-kliinikoita-paatoksenteossa-uudessa-lastensairaalassa/",
  },
  { id: "projectIctDaysTitle" },
  { id: "projectAnyhauTitle", href: "https://app.anyhau.fi/partners" },
];

export const highlightedEvents: TimelineEvent[] = [
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventTietoevryTitle",
    whenId: "eventTietoevryWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventTietoevryP1" />
          <FormattedMessage id="eventTietoevryP2" />
        </Typography>
        <Typography sx={{ color: colors.textLight, fontWeight: 600 }}>
          <FormattedMessage id="eventTietoevryNotable" />
        </Typography>
        <List
          sx={{
            listStyle: "disc",
            pl: 4,
            color: colors.textLight,
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
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventAnyhauTitle",
    whenId: "eventAnyhauWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventAnyhauP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    titleId: "eventHiveTitle",
    whenId: "eventHiveWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventHiveP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    titleId: "eventSataEduTitle",
    whenId: "eventSataEduWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventSataEduP1" />
          <FormattedMessage id="eventSataEduP2" />
        </Typography>
      </>
    ),
  },
];

export const allEvents: TimelineEvent[] = [
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventTietoevryTitle",
    whenId: "eventTietoevryWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventTietoevryP1" />
          <FormattedMessage id="eventTietoevryP2" />
        </Typography>
        <Typography sx={{ color: colors.textLight, fontWeight: 600 }}>
          <FormattedMessage id="eventTietoevryNotable" />
        </Typography>
        <List
          sx={{
            listStyle: "disc",
            pl: 4,
            color: colors.textLight,
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
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventAnyhauTitle",
    whenId: "eventAnyhauWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventAnyhauP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    titleId: "eventHiveTitle",
    whenId: "eventHiveWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventHiveP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventTekijaRentTitle",
    whenId: "eventTekijaRentWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventTekijaRentP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventKotipalveluTitle",
    whenId: "eventKotipalveluWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventKotipalveluP1" />
          <FormattedMessage id="eventKotipalveluP2" />
          <FormattedMessage id="eventKotipalveluP3" />
          <FormattedMessage id="eventKotipalveluP4" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventLumundooTitle",
    whenId: "eventLumundooWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventLumundooP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventAaltovoimaTitle",
    whenId: "eventAaltovoimaWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventAaltovoimaP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventEnersenseTitle",
    whenId: "eventEnersenseWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventEnersenseP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    titleId: "eventDeltamarinTitle",
    whenId: "eventDeltamarinWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventDeltamarinP1" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    titleId: "eventSataEduTitle",
    whenId: "eventSataEduWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          <FormattedMessage id="eventSataEduP1" />
          <FormattedMessage id="eventSataEduP2" />
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    titleId: "eventBkszcTitle",
    whenId: "eventBkszcWhen",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
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
