import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";
import { colors as lightColors } from "./colors";
import { FormattedMessage } from "react-intl";
import LinkThumbnail from "./components/LinkThumbnail";
import { assetUrl } from "./utils/assets";

export type TimelineEvent = {
  icon: React.ReactNode;
  titleId: string;
  whenId: string;
  details: React.ReactNode;
};

type Project = {
  id: string;
  /** Its short name (the work projects' headings). */
  labelId: string;
  hrefEN?: string;
  hrefFI?: string;
};

/**
 * Pages the portfolio links to. The Tieto articles were taken down when
 * Tietoevry became Tieto, and Anyhau's site no longer answers: their copies
 * in the Wayback Machine stand in for them.
 */
const LINKS = {
  husArticleEN:
    "https://web.archive.org/web/20260613184118/https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2021/an-agile-and-cost-effective-way-to-combine-patient-data-from-different-systems-it-already-exists-and-this-is-how-it-works/",
  husArticleFI:
    "https://web.archive.org/web/20260411211307/https://www.tietoevry.com/fi/asiakkaitamme/2019/HUS-kehittaa-kliinisen-datan-hyodyntamista-tietoallas-ratkaisulla/",
  aiArticle:
    "https://web.archive.org/web/20260313021142/https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2024/02/ai-powered-healthcare/",
  anyhauEN:
    "https://web.archive.org/web/20250621020457/https://app.anyhau.fi/en/partners",
  anyhauFI:
    "https://web.archive.org/web/20250708111450/https://app.anyhau.fi/partners",
  hive: "https://www.hive.fi/en/",
};

export const projects: Project[] = [
  {
    id: "projectHusDatalakeTitle",
    labelId: "workNodeHus",
    hrefEN: LINKS.husArticleEN,
    hrefFI: LINKS.husArticleFI,
  },
  {
    id: "projectMedicalPocTitle",
    labelId: "workNodePoc",
    hrefEN: LINKS.aiArticle,
    hrefFI: LINKS.aiArticle,
  },
  { id: "projectIctDaysTitle", labelId: "workNodeIct" },
  {
    id: "projectAnyhauTitle",
    labelId: "workNodeAnyhau",
    hrefEN: LINKS.anyhauEN,
    hrefFI: LINKS.anyhauFI,
  },
];

const workIcon = <WorkIcon sx={{ fontSize: { xs: 28, md: 18 } }} />;
const schoolIcon = <SchoolIcon sx={{ fontSize: { xs: 28, md: 18 } }} />;

/** One paragraph of an event's story, from one or more messages. */
const paragraph = (ids: string[]) => (
  <Typography sx={{ color: lightColors.textLight }}>
    {ids.map((id, index) => (
      <Fragment key={id}>
        {index > 0 ? " " : null}
        <FormattedMessage id={id} />
      </Fragment>
    ))}
  </Typography>
);

/** An event told in one paragraph. */
const storyEvent = (
  icon: React.ReactNode,
  titleId: string,
  whenId: string,
  paragraphIds: string[],
): TimelineEvent => ({
  icon,
  titleId,
  whenId,
  details: paragraph(paragraphIds),
});

const tietoCaretech: TimelineEvent = {
  icon: workIcon,
  titleId: "eventTietoCaretechTitle",
  whenId: "eventTietoCaretechWhen",
  details: (
    <>
      {paragraph(["eventTietoCaretechP1", "eventTietoCaretechP2"])}
      <Typography sx={{ color: lightColors.textLight, fontWeight: 600 }}>
        <FormattedMessage id="eventTietoCaretechNotable" />
      </Typography>
      <List
        sx={{
          listStyle: "disc",
          pl: 4,
          color: lightColors.textLight,
          "& .MuiListItem-root": { display: "list-item", p: 0 },
        }}
      >
        {[
          "eventTietoCaretechB1",
          "eventTietoCaretechB2",
          "eventTietoCaretechB3",
        ].map((id) => (
          <ListItem key={id}>
            <ListItemText primary={<FormattedMessage id={id} />} />
          </ListItem>
        ))}
      </List>
      <Grid container spacing={5} sx={{ pt: 8 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LinkThumbnail
            id="linkThumbnailTitleTietoCaretechHus"
            descriptionId="linkThumbnailDescriptionTietoCaretechHus"
            image={assetUrl("hus-data-platform.webp")}
            urlEN={LINKS.husArticleEN}
            urlFI={LINKS.husArticleFI}
            readingMinutes={7}
            isArticle={true}
            date="01.2021"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LinkThumbnail
            id="linkThumbnailTitleTietoCaretechPoc"
            descriptionId="linkThumbnailDescriptionTietoCaretechPoc"
            image={assetUrl("childrens-hospital-ai.webp")}
            urlEN={LINKS.aiArticle}
            urlFI={LINKS.aiArticle}
            readingMinutes={4}
            isArticle={true}
            date="03.2024"
          />
        </Grid>
      </Grid>
    </>
  ),
};

const anyhau: TimelineEvent = {
  icon: workIcon,
  titleId: "eventAnyhauTitle",
  whenId: "eventAnyhauWhen",
  details: (
    <>
      {paragraph(["eventAnyhauP1"])}
      <Grid container spacing={5} sx={{ pt: 8 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LinkThumbnail
            id="linkThumbnailTitleAnyhau"
            descriptionId="linkThumbnailDescriptionAnyhau"
            image={assetUrl("anyhau.webp")}
            urlEN={LINKS.anyhauEN}
            urlFI={LINKS.anyhauFI}
          />
        </Grid>
      </Grid>
    </>
  ),
};

const hive: TimelineEvent = {
  icon: schoolIcon,
  titleId: "eventHiveTitle",
  whenId: "eventHiveWhen",
  details: (
    <>
      {paragraph(["eventHiveP1"])}
      <Grid container spacing={5} sx={{ pt: 8 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LinkThumbnail
            id="linkThumbnailTitleHive"
            descriptionId="linkThumbnailDescriptionHive"
            urlEN={LINKS.hive}
            urlFI={LINKS.hive}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 1,
              width: "100%",
              pt: "56.25%",
              "& iframe": { border: 0 },
            }}
          >
            {/* YouTube's privacy-enhanced embed: no cookies until the
                video is played. */}
            <Box
              component="iframe"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              src="https://www.youtube-nocookie.com/embed/Ma0Bp2rP48s"
              title="Hive Helsinki"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  ),
};

const sataEdu = storyEvent(
  schoolIcon,
  "eventSataEduTitle",
  "eventSataEduWhen",
  ["eventSataEduP1", "eventSataEduP2"],
);

/** The highlights tab: the developer years and what led to them. */
export const highlightedEvents: TimelineEvent[] = [
  tietoCaretech,
  anyhau,
  hive,
  sataEdu,
];

/** The full timeline, newest first. */
export const allEvents: TimelineEvent[] = [
  tietoCaretech,
  anyhau,
  hive,
  storyEvent(workIcon, "eventTekijaRentTitle", "eventTekijaRentWhen", [
    "eventTekijaRentP1",
  ]),
  storyEvent(workIcon, "eventKotipalveluTitle", "eventKotipalveluWhen", [
    "eventKotipalveluP1",
  ]),
  storyEvent(workIcon, "eventLumundooTitle", "eventLumundooWhen", [
    "eventLumundooP1",
  ]),
  storyEvent(workIcon, "eventAaltovoimaTitle", "eventAaltovoimaWhen", [
    "eventAaltovoimaP1",
  ]),
  storyEvent(workIcon, "eventEnersenseTitle", "eventEnersenseWhen", [
    "eventEnersenseP1",
  ]),
  storyEvent(workIcon, "eventDeltamarinTitle", "eventDeltamarinWhen", [
    "eventDeltamarinP1",
  ]),
  sataEdu,
  storyEvent(schoolIcon, "eventBkszcTitle", "eventBkszcWhen", [
    "eventBkszcP1",
    "eventBkszcP2",
    "eventBkszcP3",
  ]),
];

/** The Neural Decompiler's tools. */
export const neuralStack = [
  "Python",
  "PyTorch",
  "TransformerLens",
  "Pythia",
  "pytest",
  "uv",
];

/**
 * The skills a quick read leads with, grouped as on the CV, the AI work
 * second: what the About text names, the AI work and its tools, testing.
 */
export const keySkills = [
  {
    id: "skillsCatFrontendMobile",
    items: ["React", "Next.js", "React Native", "TypeScript", "Expo"],
  },
  {
    id: "skillsCatAi",
    items: [
      "Python",
      "PyTorch",
      "TransformerLens",
      "GitHub Copilot",
      "OpenAI Codex",
      "Claude",
      "Cursor",
    ],
  },
  {
    id: "skillsCatBackendApis",
    items: ["Node.js", "GraphQL", "PostgreSQL", "Elasticsearch"],
  },
  {
    id: "skillsCatCloudDevOps",
    items: [
      "Azure",
      "AKS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "CI/CD",
    ],
  },
  {
    id: "skillsCatTesting",
    items: ["Playwright", "Jest", "Cypress", "Detox"],
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
    id: "skillsCatMobileCloud",
    items: [
      "React Native",
      "Expo",
      "EAS",
      "MapLibre",
      "Protomaps/PMTiles",
      "Cloudflare Workers",
      "Cloudflare R2",
      "Supabase",
      "Auth0",
      "WeatherAPI",
    ],
  },
  {
    id: "skillsCatBackend",
    items: [
      "Node.js/Express",
      "Azure Functions",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "MariaDB",
      "Redis",
      "Elasticsearch",
      "GraphQL",
    ],
  },
  {
    id: "skillsCatAi",
    items: [
      "Python",
      "PyTorch",
      "TransformerLens",
      "Pythia",
      "GitHub Copilot",
      "OpenAI Codex",
      "Claude",
      "Cursor",
    ],
  },
  {
    id: "skillsCatTools",
    items: [
      "Azure DevOps",
      "Azure Cloud",
      "Terraform",
      "Helm",
      "Databricks",
      "GitHub",
      "GitLab",
      "Git",
      "CI/CD pipelines",
      "Docker",
      "Kubernetes",
      "AKS",
      "HAProxy",
      "Kibana",
      "Application Insights",
      "OpenTelemetry",
      "Figma",
      "Playwright",
      "Cypress",
      "Jest",
      "Vitest",
      "Asana",
      "Atlassian",
      "Jira",
      "Confluence",
      "Contentful",
      "Miro",
      "MAMP",
      "XAMPP",
      "LAMP",
      "phpMyAdmin",
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
      "IntelliJ IDEA",
      "Vim",
      "CLI",
      "Termux",
    ],
  },
];
