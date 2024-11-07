"use client";
import Script from "next/script";

const HotJar = () => {
  if (
    process.env.NEXT_PUBLIC_NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_HOTJAR_ID
  ) {
    return (
      <Script id="hotjar" strategy="afterInteractive">
        {`
    (function (c, s, q, u, a, r, e) {
        c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};
        c._hjSettings = { hjid: a };
        r = s.getElementsByTagName('head')[0];
        e = s.createElement('script');
        e.async = true;
        e.src = q + c._hjSettings.hjid + u;
        r.appendChild(e);
      })(window, document, 'https://static.hj.contentsquare.net/c/csq-', '.js', ${process.env.NEXT_PUBLIC_HOTJAR_ID});
        `}
      </Script>
    );
  }
  return null;
};

export { HotJar };