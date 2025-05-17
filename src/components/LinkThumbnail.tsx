import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAtomValue } from "jotai";
import { localeAtom } from "../hooks/localeAtom";
import { FormattedMessage } from "react-intl";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type LinkThumbnailProps = {
  id: string;
  descriptionId: string;
  image: string;
  urlEN: string;
  urlFI: string;
  readingMinutes?: number;
  isArticle?: boolean;
  date?: string;
  height?: number;
};

const LinkThumbnail: React.FC<LinkThumbnailProps> = ({
  id,
  descriptionId,
  image,
  urlEN,
  urlFI,
  readingMinutes,
  isArticle = false,
  date,
  height = 140,
}) => {
  const locale = useAtomValue(localeAtom);
  const displayUrl = locale === "fi" ? urlFI : urlEN;
  const formattedDate = date
    ? new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
      }).format(new Date(`${date.split(".")[1]}-${date.split(".")[0]}-01`))
    : null;

  return (
    <Card sx={{ p: 0, boxShadow: 0 }}>
      <CardActionArea
        component="a"
        href={displayUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia component="img" height={height} image={image} alt="" />
        <CardContent sx={{ pb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            <FormattedMessage id={id} />
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <FormattedMessage id={descriptionId} />
          </Typography>
          {isArticle ? (
            <Stack
              direction="row"
              justifyContent="flex-end"
              pt={2}
              spacing={1}
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" color="text.secondary">
                  <FormattedMessage
                    id="linkThumbnailReadingTime"
                    values={{ minutes: readingMinutes }}
                  />
                </Typography>

                <CalendarMonthIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Stack>
            </Stack>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LinkThumbnail;
