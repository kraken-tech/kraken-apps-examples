import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AccountApp, DeviceInfo } from "./components";
import { DebugApp } from "./components/DebugApp.tsx";

import { CoreProvider } from "./components/Providers";
import "./i18n";

import { BaseRoutes } from "./routes";

window.krakensupport = window.krakensupport || {};

// here we attach different functions to the krakensupport object - one for each kind of app placement
// This means we have a consistent interface for people to integrate with, with predictable arguments they can use
(function (o) {
  o.initSinglePageApp = (props) => {
    const {
      defaultLanguage,
      rootID,
      appSlug,
      basename,
      APIProxyURL,
      isLoginRequired,
      linkBaseRoute,
      appProxyJwt,
    } = props;
    const root = document.getElementById(rootID);

    if (appSlug === "debug-app") {
      ReactDOM.createRoot(root).render(
        <CoreProvider
          config={{
            defaultLanguage,
            basename,
            APIProxyURL,
            appProxyJwt,
            linkBaseRoute,
          }}
        >
          <BrowserRouter basename={basename}>
            <Routes>
              <Route index element={<DebugApp props={props} />} />
            </Routes>
          </BrowserRouter>
        </CoreProvider>
      );
      return;
    }

    // Example single page app
    // -----------------------
    ReactDOM.createRoot(root).render(
      <CoreProvider
        config={{
          defaultLanguage,
          basename,
          APIProxyURL,
          isLoginRequired,
          linkBaseRoute,
          appProxyJwt,
        }}
      >
        <BrowserRouter basename={basename}>
          <BaseRoutes />
          <DebugApp props={props} />
        </BrowserRouter>
      </CoreProvider>
    );
  };

  o.initAccountDeviceApp = ({
    defaultLanguage,
    rootID,
    basename,
    APIProxyURL,
    appProxyJwt,
    accountNumber,
    deviceID,
  }) => {
    const root = document.getElementById(rootID);

    // Example account device app
    // --------------------------
    ReactDOM.createRoot(root).render(
      <CoreProvider
        config={{
          defaultLanguage,
          basename,
          APIProxyURL,
          appProxyJwt,
        }}
      >
        <DeviceInfo accountNumber={accountNumber} deviceId={deviceID} />
      </CoreProvider>
    );
  };

  o.initAccountApp = (props) => {
    const {
      defaultLanguage,
      rootID,
      basename,
      APIProxyURL,
      appProxyJwt,
      accountNumber,
    } = props;
    const root = document.getElementById(rootID);

    // Example account app
    // -------------------
    ReactDOM.createRoot(root).render(
      <CoreProvider
        config={{
          defaultLanguage,
          basename,
          APIProxyURL,
          appProxyJwt,
        }}
      >
        <BrowserRouter basename={basename}>
          <AccountApp accountNumber={accountNumber} />
          <DebugApp props={props} />
        </BrowserRouter>
      </CoreProvider>
    );
  };
})(window.krakensupport);
