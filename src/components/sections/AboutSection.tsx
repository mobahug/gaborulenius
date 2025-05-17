import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { fadeUp } from "../Sections";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkThumbnail from "../LinkThumbnail";

const META_ITEMS = [
  {
    id: "aboutExperience",
    icon: <WorkIcon />,
  },
  {
    id: "aboutEducation",
    icon: <SchoolIcon />,
  },
  {
    id: "aboutLocation",
    icon: <LocationOnIcon />,
  },
];

const AboutSection = ({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper
        id="about"
        ref={innerRef}
        sx={{ width: { xs: "100%", md: "80%" }, mx: "auto" }}
      >
        <motion.div custom={1} variants={fadeUp}>
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="aboutHeading" />
          </Typography>
        </motion.div>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div custom={2} variants={fadeUp}>
              <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                <FormattedMessage
                  id="aboutBody"
                  values={{
                    b: (chunks: React.ReactNode) => (
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 600,
                          color:
                            theme.palette.mode === "dark"
                              ? darkColors.accent
                              : lightColors.accent,
                        }}
                      >
                        {chunks}
                      </Box>
                    ),
                  }}
                />
              </Typography>
            </motion.div>
            <motion.div custom={4} variants={fadeUp}>
              <List>
                {META_ITEMS.map(({ id, icon }) => (
                  <ListItem key={id} disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          <FormattedMessage id={id} />
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div custom={3} variants={fadeUp}>
              <LinkThumbnail
                id="linkThumbnailTitleGabor"
                descriptionId="linkThumbnailDescriptionGabor"
                image="/gaborulenius/profile2-small.webp"
                urlEN="https://www.tietoevry.com/en/meet-our-people/2024/06/gabor-horvath-ulenius-far-from-the-a4-way-into-a-programming-career"
                urlFI="https://www.tietoevry.com/fi/blogi/2024/06/gabor-horvath-ulenius-kauas-a4-urasta-ohjelmointiin/"
                readingMinutes={3}
                isArticle={true}
                date="06.2024"
                height={isMobile ? 140 : 210}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default AboutSection;
