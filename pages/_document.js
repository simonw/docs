import Document_, { Head, Main, NextScript } from 'next/document'
import isIE11_ from '../lib/is-ie-11'
import htmlescape from 'htmlescape'

const { API_URL, NOW_API_URL } = process.env
const env = { API_URL, NOW_API_URL }

export default class Document extends Document_ {
  static async getInitialProps(ctx) {
    const props = await Document_.getInitialProps(ctx)
    const ua = String(ctx.req.headers && ctx.req.headers['user-agent'])
    return {
      ...props,
      isIE11: isIE11_(ua)
    }
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }}
          />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            var _paq = _paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//zeit.co/api/_/";
              _paq.push(['setTrackerUrl', u+'p']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'p.js'; s.parentNode.insertBefore(g,s);
            })();`
            }}
          />
        </body>
      </html>
    )
  }
}
