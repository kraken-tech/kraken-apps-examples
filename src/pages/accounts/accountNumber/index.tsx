import { Breadcrumbs as TakoBreadcrumbs } from "@krakentech/tako";
import { useParams } from "react-router";
import { Layout, AccountLinks } from "../../../components";
import { useConfig } from "./../../../components/Providers/Config";
import { useTranslation } from "react-i18next";

const Breadcrumbs = ({ accountNumber }: { accountNumber: string }) => {
  return (
    <TakoBreadcrumbs>
      <TakoBreadcrumbs.Link href="/" text="Kraken" />
      <TakoBreadcrumbs.Text text={accountNumber} />
    </TakoBreadcrumbs>
  );
};

export const Page = () => {
  const { accountNumber: aNumber } = useParams();
  const accountNumber = aNumber as string;
  const { linkBaseRoute } = useConfig();
  const { t } = useTranslation();
  return (
    <Layout
      title={t("account-app.title")}
      breadcrumbs={<Breadcrumbs accountNumber={accountNumber} />}
    >
      {accountNumber && (
        <AccountLinks accountNumber={accountNumber} linkRoute={linkBaseRoute} />
      )}
    </Layout>
  );
};
