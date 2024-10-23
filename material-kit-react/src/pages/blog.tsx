import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useRouter } from 'src/routes/hooks';

import { BlogView } from 'src/sections/blog/view';

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
        <title> {`Blog - ${CONFIG.appName}`}</title>
      </Helmet>

      <BlogView />
    </>
  );
}
