import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useRouter } from 'src/routes/hooks';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/sign-in")
    }
  }, [router])
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
