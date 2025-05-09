import {
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/Launch";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { projects } from "../../contexts";
import { fadeUp } from "../Sections";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";
import { useAtomValue } from "jotai";
import { localeAtom } from "../../hooks/localeAtom";

export const ProjectsSection = ({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) => {
  const theme = useTheme();
  const locale = useAtomValue(localeAtom);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper
        id="projects"
        ref={innerRef}
        sx={{ width: { xs: "100%", md: "80%" }, mx: "auto" }}
      >
        <motion.div custom={1} variants={fadeUp}>
          <Typography variant="h4" gutterBottom>
            <FormattedMessage id="projectHeading" />
          </Typography>
        </motion.div>
        <List disablePadding>
          {projects.map(({ id, hrefEN, hrefFI }, i) => {
            const href = locale === "fi" ? hrefFI : hrefEN;
            return (
              <motion.div key={id} custom={i + 2} variants={fadeUp}>
                <ListItemButton
                  component={href ? "a" : "div"}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  alignItems="flex-start"
                  sx={{
                    borderRadius: 1,
                    transition: "background .25s, box-shadow .25s",
                    "&:hover": {
                      backgroundColor: href
                        ? "rgba(255,255,255,.04)"
                        : undefined,
                      boxShadow: href ? "0 2px 8px rgba(0,0,0,.25)" : undefined,
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <FormattedMessage id={id} />
                      </Typography>
                    }
                    secondary={
                      !href && (
                        <Typography variant="body2" color="text.secondary">
                          <FormattedMessage id="noLinkAvailable" />
                        </Typography>
                      )
                    }
                  />
                  {href && (
                    <OpenInNewIcon
                      sx={{
                        ml: 1,
                        fontSize: 20,
                        color:
                          theme.palette.mode === "dark"
                            ? darkColors.accent
                            : lightColors.accent,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </ListItemButton>
              </motion.div>
            );
          })}
        </List>
      </Paper>
    </motion.div>
  );
};
