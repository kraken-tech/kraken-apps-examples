import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppConfig } from "../../../types/app";

const ConfigProviderContext = createContext<AppConfig | null>(
  null
);

export const useConfig = () => {
  const context = useContext(ConfigProviderContext);

  if (!context) {
    throw new Error("Cannot access when not inside the ConfigProviderContext.");
  }

  return context;
};

export const ConfigProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: AppConfig;
}) => {
  const { i18n } = useTranslation();
  i18n.changeLanguage(config.defaultLanguage);


  return (
    <ConfigProviderContext.Provider
      value={{
        ...config,
      }}
    >
      {children}
    </ConfigProviderContext.Provider>
  );
};
