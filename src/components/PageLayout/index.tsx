import { ReactNode, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@krakentech/tako";
import { getCookie } from "../../utils/cookies";
import { useConfig } from "../Providers/Config";

export const Layout = ({
  title,
  children,
  breadcrumbs,
}: {
  title: string;
  children: ReactNode;
  breadcrumbs?: ReactElement;
}) => {
  const { t } = useTranslation();
  const { isLoginRequired } = useConfig();
  // @ts-ignore
  const shouldEnforceTokenCheck = import.meta.env.VITE_ENFORCE_TOKEN_CHECK;
  if (isLoginRequired && shouldEnforceTokenCheck) {
    const sessionToken = getCookie("localTestingSessionCookie");
    const isMissingToken = !sessionToken;
    // This just hides the pages when the app is deployed to the internet, since
    // it's open to the public
    if (isMissingToken) {
      return <Typography>{t("token-missing")}</Typography>;
    }
  }

  return (
    <Stack direction="column" gap="spaceMD">
      {breadcrumbs}
      <Typography variant="h1">{title}</Typography>
      {children}
    </Stack>
  );
};
