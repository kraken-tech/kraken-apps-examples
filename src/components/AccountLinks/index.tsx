import { Card, CardHeader, Stack } from "@krakentech/tako";
import { useTranslation } from "react-i18next";

export const AccountLinks = ({
  accountNumber,
  linkRoute = "/",
}: {
  accountNumber: string;
  linkRoute: string;
}) => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Card>
        <CardHeader cardTitle={t("account-links.loyalty-scheme.title")} />
        <a
          href={`${linkRoute}accounts/${accountNumber}/loyalty-scheme/awards/`}
        >
          {t("account-links.loyalty-scheme.cta")}
        </a>
      </Card>
      <Card>
        <CardHeader cardTitle={t("account-links.special-offers.title")} />
        <a href={`${linkRoute}accounts/${accountNumber}/special-offers/`}>
          {t("account-links.special-offers.cta")}
        </a>
      </Card>
      <Card>
        <CardHeader cardTitle="Logging" />
        <a href={`${linkRoute}accounts/${accountNumber}/logging/`}>Logging</a>
      </Card>
    </Stack>
  );
};
