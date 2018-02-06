import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { arunoda } from '../../../lib/data/team'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'What\'s Next',
  date: '10 August 2017',
  authors: [arunoda],
  editUrl: 'pages/docs/getting-started/whats-next.js',
})(markdown(components)`

As you've gone through the getting started guide, you are ready to do production deployments with ${<Now color="#000"/>}.

For additional information, follow these links:

* [Discover more with guides](/docs/deployment-types/lifecycle)
* [Try example apps](/docs/examples/json-api)
* [Connect with our support channels](/docs/other/support-channels)
* [Check the most frequently asked questions](/docs/other/faq)
`)
