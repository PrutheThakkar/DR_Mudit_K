const React = require("react");

const GA_MEASUREMENT_ID = process.env.GATSBY_GA_MEASUREMENT_ID;

exports.onRenderBody = ({ setHeadComponents }) => {
  if (!GA_MEASUREMENT_ID) return;

  setHeadComponents([
    <script key="google-analytics-src" async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />,
    <script
      key="google-analytics-config"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:false,anonymize_ip:true});`,
      }}
    />,
  ]);
};
