import { useTranslation } from "react-i18next";
import { Typography, Stack } from "@krakentech/tako";
import { Logging } from "../Logging";

export const AccountApp = ({ accountNumber }: { accountNumber: string }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="column">
      <Typography variant="h2">{t("account-app.title")}</Typography>
      <Typography>
        {t("account-app.title")} {accountNumber}
      </Typography>
      <Logging />
    </Stack>
  );
};
