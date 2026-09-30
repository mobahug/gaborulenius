import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EMAIL } from "../seo";
import "./copyEmail.css";

/**
 * The address itself, and a way to copy it: "Email Me" does nothing on a
 * computer without a mail app.
 */
const CopyEmail = ({ className = "" }: { className?: string }) => {
  const intl = useIntl();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const reset = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(reset);
  }, [copied]);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => setCopied(true),
      // No clipboard here: the address stays there to select.
      () => undefined,
    );
  };
  const label = intl.formatMessage({
    id: copied ? "contactEmailCopied" : "contactCopyEmail",
  });

  return (
    <p className={`copy-email ${className}`.trim()}>
      <span>{EMAIL}</span>
      <IconButton size="small" onClick={copy} aria-label={label} title={label}>
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
      <span className="sr-only" aria-live="polite">
        {copied ? label : ""}
      </span>
    </p>
  );
};

export default CopyEmail;
