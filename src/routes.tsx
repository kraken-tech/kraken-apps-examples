import { Routes, Route, Link } from "react-router";

import { Page as Home } from "./pages";
import { Page as Awards } from "./pages/accounts/accountNumber/loyalty-scheme/awards";
import { Page as SpecialOffers } from "./pages/accounts/accountNumber/special-offers";
import { Page as AccountsLinkPage } from "./pages/accounts/accountNumber";
import { Page as LoggingPage } from "./pages/accounts/accountNumber/logging";

const LinkToApp = () => {
  return (
    <div>
      <Link to="client-app/example-backend-app">Go to app root</Link>
      <br />
      <Link to="accounts/A-FAKE">Go to pretend account tab</Link>
    </div>
  );
};

export const BaseRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="accounts">
      <Route path=":accountNumber">
        <Route index element={<AccountsLinkPage />} />
        <Route path="loyalty-scheme">
          <Route path="awards" element={<Awards />} />
        </Route>
        <Route path="special-offers" element={<SpecialOffers />}></Route>
        <Route path="logging" element={<LoggingPage />}></Route>
      </Route>
    </Route>
  </Routes>
);

export const AppRoutes = () => (
  <Routes>
    <Route index element={<LinkToApp />} />
    <Route path="client-app">
      <Route path="example-backend-app">
        <Route index element={<Home />} />
        <Route path="accounts">
          <Route path=":accountNumber">
            <Route index element={<AccountsLinkPage />} />
            <Route path="loyalty-scheme">
              <Route path="awards" element={<Awards />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
    <Route path="accounts">
      <Route path=":accountNumber">
        <Route index element={<AccountsLinkPage />} />
      </Route>
    </Route>
  </Routes>
);
