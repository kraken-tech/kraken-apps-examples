import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

import { CoreProvider } from "./components/Providers";
import "./i18n";

import { AppRoutes, BaseRoutes } from "./routes";
import { AccountApp, DeviceInfo, Logging } from "./components";

window.krakensupport = window.krakensupport || {};

// here we attach different functions to the krakensupport object - one for each kind of app placement
// This means we have a consistent interface for people to integrate with, with predictable arguments they can use
(function (o) {
  o.initSinglePageApp = ({
    defaultLanguage,
    rootID,
    appSlug,
    basename,
    APIProxyURL,
    isLoginRequired,
    linkBaseRoute,
    appProxyJwt,
    user: { id, email, firstName, lastName },
  }) => {
    const root = document.getElementById(rootID);

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
        </BrowserRouter>
      </CoreProvider>
    );
  };

  o.initAccountDeviceApp = ({
    defaultLanguage,
    rootID,
    appSlug,
    basename,
    APIProxyURL,
    appProxyJwt,
    user: { id, email, firstName, lastName },
    accountNumber,
    deviceID,
  }) => {
    const root = document.getElementById(rootID);

    // Example account device app
    // --------------------------
    // ReactDOM.createRoot(root).render(
    //   <CoreProvider
    //     config={{
    //       defaultLanguage,
    //       basename,
    //       APIProxyURL,
    //       appProxyJwt
    //     }}
    //   >
    //     <DeviceInfo accountNumber={accountNumber} deviceId={deviceID} />
    //   </CoreProvider>
    // );
  };

  o.initAccountApp = ({
    defaultLanguage,
    rootID,
    basename,
    appSlug,
    APIProxyURL,
    appProxyJwt,
    user: { id, email, firstName, lastName },
    accountNumber,
  }) => {
    const root = document.getElementById(rootID);

    // Example account app
    // -------------------
    // ReactDOM.createRoot(root).render(
    //   <CoreProvider
    //     config={{
    //       defaultLanguage,
    //       basename,
    //       APIProxyURL,
    //       appProxyJwt
    //   }}
    //   >
    //     <BrowserRouter basename={basename}>
    //       <AccountApp accountNumber={accountNumber} />
    //     </BrowserRouter>
    //   </CoreProvider>
    // );
  };
})(window.krakensupport);
