import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import colors from "./colors";

export type Events = {
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

export const highlightedEvents: Events[] = [
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

export const allEvents: Events[] = [
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Full Stack Developer – Tietoevry",
    when: "Espoo, 2023 – Present",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          123I’m working as a Full Stack Developer in the healthcare domain,
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
    when: "Helsinki, 2021 – 2023",
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
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Scaffolder – Tekijä Rent Oy",
    when: "Espoo, 2020 – 2021",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          I led a team of scaffolders—delegating tasks, providing hands-on
          guidance, and coordinating workflows to meet tight metro construction
          milestones. I was also responsible for organizing all scaffolder
          storage and managing the complete build-up and dismantling of scaffold
          systems throughout the Soukka station project, ensuring efficient and
          safe operations.
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Housekeeper – Kotipalvelu Ykköset Oy",
    when: "Espoo, 2019 – 2020",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          I served as a full-time housekeeper at Kotipalvelu Ykköset from August
          2019 to June 2020, delivering thorough cleaning, organizing living
          spaces, and maintaining impeccable hygiene standards for residential
          clients . I proactively communicated with clients to understand their
          specific needs and consistently exceeded expectations, driving high
          satisfaction and repeat bookings Small Business Trends . I managed
          scheduling and maintained inventory of cleaning supplies—streamlining
          workflows to ensure timely, uninterrupted service delivery . My strong
          attention to detail, efficient time management, and reliable work
          ethic underpinned a seamless customer experience throughout my tenure.
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Founder of Lumundoo – Self-employed",
    when: "Espoo, 2018 – 2019",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Between December 2018 and December 2019, I founded and operated a
          drop-shipping business in Espoo, overseeing all aspects from customer
          care to inventory and website management resume-example.com
          resumegenius.com . I negotiated influencer partnerships, coordinated
          mailings and marketing materials, and gained foundational coding
          experience by building and maintaining my e-commerce site.
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Mover/Housekeeper – Aaltovoima Oy",
    when: "Espoo, 2018 – 2019",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          As a part-time Mover and Housekeeper at Aaltovoima Oy from June 2018
          to August 2019, I delivered seamless relocation and cleaning services
          across Espoo and Helsinki. I coordinated packing, loading,
          transportation, and unloading of household goods with care and
          efficiency, minimizing customer stress. I performed detailed cleaning
          and organizing tasks before and after each move, consistently
          exceeding client expectations. Through clear communication and
          proactive problem-solving, I ensured every relocation was positive and
          hassle-free.
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Final Maintainer – Enersense International Oyj/VMP Oy",
    when: "Rauma, 2017 – 2018",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Performed meticulous final‐cleaning of rooms, equipment, and support
          systems at the Olkiluoto 3 nuclear power plant, ensuring every surface
          met strict decontamination and hygiene standards. Adhered rigorously
          to STUK radiation‐safety regulations and company protocols—donning
          required PPE, controlling contamination zones, and maintaining
          accurate cleaning logs. Collaborated with maintenance crews to prepare
          areas for system re‐commissioning, contributing to a smooth,
          on‐schedule transition between outage phases.
        </Typography>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Ship designer – Deltamarin Oy",
    when: "Rauma, 2017 – 2017",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Completed a four-month internship at Deltamarin, primarily observing
          senior naval architects and absorbing ship design workflows through
          project-based exercises. Shadowed the full design process—reviewing
          existing technical drawings, attending team design reviews, and
          discussing draft revisions—to understand how concepts are translated
          into AutoCAD models. Applied these insights in hands-on AutoCAD tasks,
          gradually drafting simple components and layouts, which built a solid
          foundation in AutoCAD workflows and ship design principles.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Finnish Language School – SataEdu",
    when: "Rauma, 2016 – 2017",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Completed the TE Office’s Sataedu integration course in Finnish (A2
          level), participating in daily lessons focused on practical
          communication, grammar, and workplace vocabulary. Earned an A2
          proficiency certificate, demonstrating the ability to manage simple
          everyday and work-related conversations. Continued self-directed study
          beyond the formal program, reinforcing language skills through daily
          interactions and on-the-job practice to achieve conversational
          fluency.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Construction Technician – BKSZC Schulek Frigyes",
    when: "Budapest, 2011 – 2016",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Completed a five-year bilingual program in Building Construction
          Technology at BKSZC Schulek Frigyes (2011–2016), mastering technical
          drawing fundamentals and architectural plan development Developed
          practical construction skills through workshops on masonry, wall
          building, and formwork assembly, translating designs into on-site
          structures Produced numerous house-drawing projects using scale,
          dimensioning, and blueprint interpretation, laying a solid foundation
          for my architectural aspirations Utilized ArchiCAD to model structural
          layouts, perform material quantity take-offs, and calculate static
          load points for precise design validation. Graduated in June 2016 with
          a final grade of 69%, reflecting strong academic performance and
          hands-on expertise in both theory and practice
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
