import {
  Paper,
  Typography,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { projects } from "../../contexts";
import { fadeUp } from "../Sections";
import colors from "../../colors";

export const ProjectsSection = ({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="projects" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="projectHeading" />
          </Typography>
        </motion.div>
        {projects.map(({ id, href }, i) => (
          <motion.div key={id} custom={i + 2} variants={fadeUp}>
            <ListItem disableGutters sx={{ mb: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <FormattedMessage id={id} />
                  </Typography>
                }
                secondary={
                  href ? (
                    <Button
                      variant="contained"
                      component="a"
                      href={href}
                      target="_blank"
                    >
                      <FormattedMessage id="buttonReadMore" />
                    </Button>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ opacity: 0.7 }}
                    >
                      <FormattedMessage id="noLinkAvailable" />
                    </Typography>
                  )
                }
              />
            </ListItem>
          </motion.div>
        ))}
      </Paper>
    </motion.div>
  );
};
