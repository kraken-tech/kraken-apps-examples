import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Breadcrumbs as TakoBreadcrumbs,
  Card,
} from "@krakentech/tako";
import React from "react";

import { useConfig } from "../../../../components/Providers/Config";
import { Layout, Logging } from "../../../../components";

const Breadcrumbs = ({ accountNumber }: { accountNumber: string }) => {
  const config = useConfig();
  const { t } = useTranslation();
  const base = config.linkBaseRoute ? `${config.linkBaseRoute}` : "/";
  return (
    <TakoBreadcrumbs>
      <TakoBreadcrumbs.Link href="/" text="Kraken" />
      <TakoBreadcrumbs.Link
        href={`${base}?accountNumber=${accountNumber}`}
        text={t("account-app.title")}
      />
      <TakoBreadcrumbs.Link
        href={`${base}accounts/${accountNumber}`}
        text={accountNumber}
      />
      <TakoBreadcrumbs.Text text={t("account-links.special-offers.title")} />
    </TakoBreadcrumbs>
  );
};

export const Page = () => {
  const { accountNumber: aNumber } = useParams();
  const { t } = useTranslation();
  const accountNumber = aNumber as string;

  return (
    <Layout
      title={`Logging ${accountNumber}`}
      breadcrumbs={<Breadcrumbs accountNumber={accountNumber} />}
    >
      <Card padding="none">
        <Logging />
      </Card>
    </Layout>
  );
};
