import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useRouter } from 'src/routes/hooks';

import { OverviewAnalyticsView } from 'src/sections/overview/view';



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
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
        />
        <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />
      </Helmet>

      <OverviewAnalyticsView />
    </>
  );
}
