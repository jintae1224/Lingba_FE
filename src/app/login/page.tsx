import { Suspense } from "react";

import Login from "./_components/Login";
import OAuthErrorHandler from "./_components/OAuthErrorHandler/OAuthErrorHandler";

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <OAuthErrorHandler />
      </Suspense>
      <Login />
    </>
  );
}
