import {
  Card,
  CardHeader,
  Stack,
  CardContent,
  Typography,
} from "@krakentech/tako";
import { useTranslation } from "react-i18next";

export const Logging = ({ accountNumber }: { accountNumber?: string }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Card>
        <CardHeader cardTitle={t("logging-app.title")} />
        {accountNumber && (
          <Typography>
            {t("logging-app.account-subtitle")} {accountNumber}
          </Typography>
        )}
        <CardContent>
          <Stack direction="column">
            <Typography>{t("logging-app.subtitle")}</Typography>

            <ul>
              <li>
                <Typography>
                  <pre>@event:api.rate-limited env:example-env</pre>
                </Typography>
              </li>
              <li>
                <Typography component="pre">
                  <pre>
                    @interface.interface_name:apisite @dd.env:example-env
                    @interface.viewer:"kraken|account-user:12345"
                  </pre>
                </Typography>
              </li>

              <li>
                <Typography component="pre">
                  <pre>
                    @interface.interface_name:apisite @dd.env:example-env
                    @params.account_number:"
                    {accountNumber ? accountNumber : "A-12345678"}"
                  </pre>
                </Typography>
              </li>
            </ul>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
