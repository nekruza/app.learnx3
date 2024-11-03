"use client";
import Script from "next/script";

const HotJar = () => {
  console.log(process.env.NEXT_PUBLIC_NODE_ENV, process.env.NEXT_PUBLIC_HOTJAR_ID)
  if (
    process.env.NEXT_PUBLIC_NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_HOTJAR_ID
  ) {
    return (
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () {
              (h.hj.q = h.hj.q || []).push(arguments);
            };
            h._hjSettings = { hjid: ${process.env.NEXT_PUBLIC_HOTJAR_ID}, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j;
            a.appendChild(r);
          })(window, document, 'https://static.hotjar.com/c/hotjar-${process.env.NEXT_PUBLIC_HOTJAR_ID}', '.js?sv=');
        `}
      </Script>
    );
  }
  return null;
};

export { HotJar };