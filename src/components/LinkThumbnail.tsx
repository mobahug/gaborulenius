import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { localeAtom } from "../hooks/localeAtom";
import { FormattedMessage } from "react-intl";

type LinkThumbnailProps = {
  id: string;
  descriptionId: string;
  image: string;
  urlEN: string;
  urlFI: string;
};

const LinkThumbnail: React.FC<LinkThumbnailProps> = ({
  id,
  descriptionId,
  image,
  urlEN,
  urlFI,
}) => {
  const locale = useAtomValue(localeAtom);
  const displayUrl = locale === "fi" ? urlFI : urlEN;

  return (
    <Card sx={{ p: 0, boxShadow: 0 }}>
      <CardActionArea
        component="a"
        href={displayUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          height="140"
          component="img"
          image={image}
          alt="Placeholder"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2">
            <FormattedMessage id={id} />
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <FormattedMessage id={descriptionId} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LinkThumbnail;
