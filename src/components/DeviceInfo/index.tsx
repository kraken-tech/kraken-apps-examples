import { useTranslation } from "react-i18next";
import { TabGroup } from "@krakentech/tako";
import { AdminTab } from "./AdminTab";
import { MetricsTab } from "./MetricsTab";
import { InfoTab } from "./InfoTab";

export const DeviceInfo = ({
  accountNumber,
  deviceId,
}: {
  accountNumber: string;
  deviceId: string;
}) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginLeft: "15px" }}>
      <TabGroup
        fluid
        tabsProps={[
          {
            panel: (
              <InfoTab accountNumber={accountNumber} deviceId={deviceId} />
            ),
            text: t("device-info.tabs.details"),
          },
          {
            panel: <MetricsTab />,
            text: t("device-info.tabs.metrics"),
          },
          {
            panel: <AdminTab />,
            text: t("device-info.tabs.admin"),
          },
        ]}
      />
    </div>
  );
};
