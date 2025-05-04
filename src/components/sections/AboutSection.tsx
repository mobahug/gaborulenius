import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { fadeUp } from "../Sections";
import colors from "../../colors";

export const AboutSection = ({
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
      <Paper
        id="about"
        ref={innerRef}
        sx={{ width: { xs: "100%", md: "80%" }, mx: "auto" }}
      >
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="aboutHeading" />
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1">
            <FormattedMessage id="aboutBody" />
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <List>
            {["aboutLocation", "aboutEducation", "aboutExperience"].map(
              (id) => (
                <ListItem key={id}>
                  <ListItemText primary={<FormattedMessage id={id} />} />
                </ListItem>
              ),
            )}
          </List>
        </motion.div>
      </Paper>
    </motion.div>
  );
};
