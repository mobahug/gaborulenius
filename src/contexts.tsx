import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import colors from "./colors";

export type HighlightedEvents = {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  when: string;
  details: React.ReactNode;
};

export const projects = [
  {
    title:
      " Developed an LLM-based AI solution for ICT Days, Finland’s largest healthcare tech event",
  },
  {
    title:
      "Built an AI PoC to assist doctors in faster diagnosis via medical document analysis",
    href: "https://www.tietoevry.com/fi/asiakkaitamme/2024/generatiivinen-tekoaly-auttaa-kliinikoita-paatoksenteossa-uudessa-lastensairaalassa/",
  },
  {
    title:
      "Contributing to the HUS DataLake platform for real-time healthcare data access",
    href: "https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2021/an-agile-and-cost-effective-way-to-combine-patient-data-from-different-systems-it-already-exists-and-this-is-how-it-works/",
  },
];

export const highlightedEvents: HighlightedEvents[] = [
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Full Stack Developer – Tietoevry",
    when: "Espoo, 2023 – Present",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          I’m working as a Full Stack Developer in the healthcare domain,
          building cloud-native, AI-powered solutions that improve the
          accessibility and usability of patient data across the Nordic region.
          My work focuses on React, TypeScript, Node.js, GraphQL, PostgreSQL,
          Docker, Kubernetes, Terraform, and Azure DevOps within Agile Scrum
          teams.
        </Typography>
        <Typography sx={{ color: colors.textLight, fontWeight: 600 }}>
          Notable contributions:
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
            <ListItemText primary="Developed an LLM-powered AI solution at ICT Days, Finland’s largest healthcare tech event" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Contributed to the HUS DataLake, enabling real-time access to healthcare data across multiple systems" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Built an AI PoC leveraging LLMs to help doctors find diagnoses faster through medical documents" />
          </ListItem>
        </List>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Full Stack Developer – Anyhau",
    when: "Espoo, 2022 – 2023",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Worked on a greenfield web application for booking animal-related
          services, in collaboration with the 2022 Diili show winner. Built from
          the ground up using Next.js, Material UI, and MongoDB. The platform
          enable service providers to list offerings and customers to book and
          pay online.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Software Developer – Hive Helsinki",
    when: "2021 – 2023",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Completed a project-based program focused on teamwork,
          problem-solving, and self-directed learning. Built skills in
          collaboration, critical thinking, and adaptability for real-world
          software development.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Finnish Language School – SataEdu",
    when: "2016 – 2017",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          After the school I continued self-studies in Finnish to advance fluent
          conversational proficiency. Comfortable in everyday discussions, with
          ongoing efforts to improve further.
        </Typography>
      </>
    ),
  },
];

export const categories = [
  {
    label: "Frontend",
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
    label: "Backend",
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
    label: "Tools",
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
