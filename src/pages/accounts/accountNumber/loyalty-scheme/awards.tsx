import { useParams } from "react-router";
import { useConfig } from "../../../../components/Providers/Config";
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

import { format } from "date-fns";
import { Layout } from "../../../../components";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

type AwardsData =
  | {
      type: "LOYALTY_POINTS" | null;
      awardedAt: string | null;
      reference: string | null;
      value: {
        display: string | null;
        amount: number | null;
      } | null;
    }
  | null
  | undefined;

const MAX_NUMBER_OF_SPIN_RECORDS = 10;

const AwardsTable = ({ data }: { data: AwardsData[] }) => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>
            {t("account-app.loyalty-scheme.labels.submitted-at")}
          </TableHeaderCell>
          <TableHeaderCell>
            {t("account-app.loyalty-scheme.labels.prize-type")}
          </TableHeaderCell>
          <TableHeaderCell>
            {t("account-app.loyalty-scheme.labels.prize-value")}
          </TableHeaderCell>
          <TableHeaderCell>
            {t("account-app.loyalty-scheme.labels.prize-amount")}
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          (item, index) =>
            item && (
              <TableRow key={`spin-${index}`}>
                <TableCell>
                  {item.awardedAt
                    ? format(new Date(item.awardedAt), "MM/dd/yyyy")
                    : ""}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.value?.display}</TableCell>
                <TableCell>{item.value?.amount}</TableCell>
              </TableRow>
            )
        )}
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
      <TakoBreadcrumbs.Text text={t("account-links.loyalty-scheme.title")} />
    </TakoBreadcrumbs>
  );
};

export const Page = () => {
  const { accountNumber: aNumber } = useParams();
  const { t } = useTranslation();
  const accountNumber = aNumber as string;
  const { APIProxyURL, appProxyJwt } = useConfig();

  const [awardsData, setAwardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAwardsData([
      {
        type: "LOYALTY_POINTS",
        awardedAt: "2025-01-01T00:00:00Z",
        reference: "REFERRAL",
        value: {
          display: "Referral reward",
          amount: 1000,
        },
      },
      {
        type: "LOYALTY_POINTS",
        awardedAt: "2024-12-11T00:00:00Z",
        reference: "REFERRAL",
        value: {
          display: "Referral reward",
          amount: 1000,
        },
      },
      {
        type: "LOYALTY_POINTS",
        awardedAt: "2024-12-01T00:00:00Z",
        reference: "JOINING_BONUS",
        value: {
          display: "Joining bonus",
          amount: 2500,
        },
      },
    ]);
    setLoading(false);

    // Example fetch via the proxy
    // --------------------------
    // const fetchData = async () => {
    //   try {
    //      // @ts-ignore
    //     const VITE_API_URL_ROOT = import.meta.env.VITE_API_URL_ROOT;
    //
    //     let fetchParams = {
    //       route: `${VITE_API_URL_ROOT}/api/loyalty`,
    //       options: {},
    //     };
    //     if (APIProxyURL) {
    //       // @ts-ignore
    //       const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
    //       fetchParams = {
    //         route: `${APIProxyURL}/api/loyalty`,
    //         options: {
    //           headers: {
    //             "X-Kraken-App-Proxy-Destination":VITE_API_DOMAIN,
    //             "X-Kraken-App-Proxy-Authorization": appProxyJwt,
    //             "Authorization": appProxyJwt
    //           },
    //         },
    //       };
    //     }
    //     const response = await fetch(fetchParams.route, fetchParams.options);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const result = await response.json();
    //     setAwardsData(result.awards);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    //
    // fetchData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("awardsData", awardsData);

  return (
    <Layout
      title={`${t("account-links.loyalty-scheme.page-title")} ${accountNumber}`}
      breadcrumbs={<Breadcrumbs accountNumber={accountNumber} />}
    >
      <Card padding="none">
        {awardsData && awardsData.length > 0 ? (
          <AwardsTable data={awardsData} />
        ) : (
          <p>{t("account-app.loyalty-scheme.no-awards-found")} </p>
        )}
      </Card>
    </Layout>
  );
};
