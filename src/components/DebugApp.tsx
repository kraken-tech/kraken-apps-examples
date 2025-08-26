import { useLocation } from "react-router";
import { useConfig } from "./Providers/Config";

export const DebugApp = ({ props }: { props: any }) => {
  const config = useConfig();
  console.log(props);

  const { pathname, search } = useLocation();
  return (
    <>
      <p>
        My URL is <code>{window.location.href}</code>
      </p>
      <p>
        It might be different quite from the browser URL, since I'm rendered
        inside an iframe!
      </p>
      <p>
        Inside my Router, my basename is "<code>{config.basename}</code>". I
        will only render content if my URL starts with that.
      </p>
      <p>
        My base link is "<code>{config.linkBaseRoute}</code>". All links inside
        my app should start with that to make sure I'm rendered, and anything
        following that is passed to me.
      </p>
      <p>
        I'm currently at "{pathname}", with query params "{search}".
      </p>
      <p>
        These are your user's details:
        <pre>{JSON.stringify(props.user, null, 2)}</pre>
      </p>
      <p>
        {/* We break up the token every 100 chars to avoid a reeeeeeaally long line */}
        Your JWT is <pre>{props.appProxyJwt.match(/.{1,100}/g).join("\n")}</pre>
      </p>
      <p>
        These are the environment variables passed to the app:
        <pre>{JSON.stringify(props.environmentVariables, null, 2)}</pre>
      </p>
      <p>All props have been logged to the console!</p>
    </>
  );
};
