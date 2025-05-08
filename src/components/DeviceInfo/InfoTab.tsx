import { Card, IconContainer, Stack, Typography } from "@krakentech/tako";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCar,
  faGauge,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export const InfoTab = ({
  accountNumber,
  deviceId,
}: {
  accountNumber: string;
  deviceId: string;
}) => {
  const { t } = useTranslation();
  return (
    <Stack direction="column">
      <Stack direction="column">
        <Typography variant="h3">Tesla model 3 ({deviceId})</Typography>
        <Typography>
          {t("device-info.tabs.details.labels.registered-to")} {accountNumber}
        </Typography>
      </Stack>
      <Stack>
        <Card style={{ minWidth: "30rem" }}>
          <Stack alignItems="center">
            <IconContainer size="sm">
              <FontAwesomeIcon icon={faCar} />
            </IconContainer>
            <Typography variant="h4">
              {t("device-info.tabs.details.labels.vehicle")}
            </Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.integration")}
            </Typography>
            <Typography fontWeight="semibold">Tesla</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.make")}
            </Typography>
            <Typography fontWeight="semibold">Tesla</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.model")}
            </Typography>
            <Typography fontWeight="semibold">Model 3</Typography>
          </Stack>
        </Card>
        <Card style={{ minWidth: "30rem" }}>
          <Stack alignItems="center">
            <IconContainer size="sm">
              <FontAwesomeIcon icon={faGauge} />
            </IconContainer>
            <Typography variant="h4">
              {t("device-info.tabs.details.labels.capacity")}
            </Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.battery-size")}
            </Typography>
            <Typography fontWeight="semibold">74.00</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.max-charge-import")}
            </Typography>
            <Typography fontWeight="semibold">11.00</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.charger-power")}
            </Typography>
            <Typography fontWeight="semibold">7.400</Typography>
          </Stack>
        </Card>
      </Stack>
      <Stack>
        <Card style={{ minWidth: "30rem" }}>
          <Stack alignItems="center">
            <IconContainer size="sm">
              <FontAwesomeIcon icon={faBolt} />
            </IconContainer>
            <Typography variant="h4">
              {t("device-info.tabs.details.labels.charger")}
            </Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.integration")}
            </Typography>
            <Typography fontWeight="semibold">Tesla</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.make")}
            </Typography>
            <Typography fontWeight="semibold">Tesla</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.model")}
            </Typography>
            <Typography fontWeight="semibold">Model 3</Typography>
          </Stack>
        </Card>
        <Card style={{ minWidth: "30rem" }}>
          <Stack alignItems="center">
            <IconContainer size="sm">
              <FontAwesomeIcon icon={faSliders} />
            </IconContainer>
            <Typography variant="h4">
              {t("device-info.tabs.details.labels.charging-preferences")}
            </Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.target-time")}
            </Typography>
            <Typography fontWeight="semibold">5:00 AM</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.max-charge-import")}
            </Typography>
            <Typography fontWeight="semibold">11.00</Typography>
          </Stack>
          <Stack direction="column" gap="none">
            <Typography component="span">
              {t("device-info.tabs.details.labels.target-soc")}
            </Typography>
            <Typography fontWeight="semibold">32%</Typography>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};
