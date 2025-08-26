import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Breadcrumbs as TakoBreadcrumbs,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@krakentech/tako";
import React from "react";

import { useConfig } from "../../../../components/Providers/Config";
import { Layout } from "../../../../components";

const SpecialOffers = () => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            {t("account-links.special-offers.offer-names")}
          </TableHeaderCell>
          <TableHeaderCell>
            {t("account-links.special-offers.offer-details")}
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Bloom and Save!</TableCell>
          <TableCell>Get 25% off all items for first-time customers.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sprout Loyalty Rewards</TableCell>
          <TableCell>
            Earn double points on every purchase this month.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Green Friday Flash Sale</TableCell>
          <TableCell>Up to 50% off select items for 24 hours only.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Weekend Blossom Deal</TableCell>
          <TableCell>
            Free shipping on all orders placed over the weekend.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

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
      title={`${t("account-links.special-offers.page-title")} ${accountNumber}`}
      breadcrumbs={<Breadcrumbs accountNumber={accountNumber} />}
    >
      <Card padding="none">
        <SpecialOffers />
      </Card>
    </Layout>
  );
};
