import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useRouter } from 'src/routes/hooks';

import { ProductsView } from 'src/sections/product/view';

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
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
