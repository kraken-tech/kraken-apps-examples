import { useMemo, useState } from "react";
import {
  Typography,
  TextInput,
  Breadcrumbs as TakoBreadcrumbs,
} from "@krakentech/tako";
import { useLocation } from "react-router";
import { Layout, AccountLinks } from "../components";
import { useConfig } from "../components/Providers/Config";
import { useTranslation } from "react-i18next";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Breadcrumbs = () => {
  const { t } = useTranslation();

  return (
    <TakoBreadcrumbs>
      <TakoBreadcrumbs.Link href="/" text="Kraken" />
      <TakoBreadcrumbs.Text text={t("account-app.title")} />
    </TakoBreadcrumbs>
  );
};

export const Page = () => {
  const query = useQuery();
  const [accountNumber, setAccountNumber] = useState(
    query.get("accountNumber")
  );
  const { linkBaseRoute } = useConfig();
  const { t } = useTranslation();

  return (
    <Layout title={t("account-app.title")} breadcrumbs={<Breadcrumbs />}>
      <Typography component="p">{t("account-app.subtitle")}</Typography>
      <TextInput
        label={t("account-app.inputs.account-number.label")}
        placeholder={t("account-app.inputs.account-number.placeholder")}
        defaultValue={accountNumber || ""}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      {accountNumber && (
        <AccountLinks accountNumber={accountNumber} linkRoute={linkBaseRoute} />
      )}
    </Layout>
  );
};
