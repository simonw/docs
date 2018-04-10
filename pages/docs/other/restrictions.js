// Packages
import markdown from 'markdown-in-js'

// Components
import { InlineCode } from '../../../components/text/code'

// Utilities
import withDoc, { components } from '../../../lib/with-doc'
import { leo } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Restrictions',
  date: '20 Mar 2018',
  authors: [leo],
  editUrl: 'pages/docs/other/billing.js',
})(markdown(components)`
  The purpose of this page is to guide you through
  all the potential restrictions that might be
  enforced upon the content you have uploaded to Now.

  ## Blocked Deployments

  There are two scenarios in which one or multiple
  of your deployments might be blocked automatically. If
  you have encountered one of them, please take immediate
  action to avoid losing your data.

  Once your deployment has been blocked, all
  of its underlying data and resources 
  will still be safely stored. However, if you do not
  take any action within 3 months, your deployment
  and any associated metadata will be removed from our platform.

  ### Failed Payments

  In the cases in which our system isn't able to charge
  your given payment method in the specified cycle (see
  our [Pricing](/pricing) page), we 
  will notify you about why the payment
  failed and how you can fix it. 

  This means that you'll receive a few emails containing
  details about how to update your billing information
  and why you couldn't be charged. The last email
  will be especially outstanding in terms of attracting
  your attention.

  In the case that you don't react to any of those
  emails, your subscription and
  associated resources will be suspended and you'll
  receive another email containing exactly that information
  and what you can do to activate
  your subscription again.

  At this point, if you haven't taken any action, you
  won't be able to access any of Now's features
  anymore ([more details](#how-deployments-are-blocked)).

  To prevent this from happening, please ensure
  that your specified payment method is always ready to be
  charged.

  In addition to that, it would also be beneficial
  to ensure that emails from our platform
  don't end up in your spam folder or get filtered out
  as junk (they're being sent by an address
  ending with ${<InlineCode>@zeit.co</InlineCode>}).

  ### Deployed under a Higher Plan

  If you **downgraded** the plan of your personal account or
  team, the deployments that were created under the previous
  plan will be blocked.
  
  This also works vice-versa: If you **upgraded** the plan of
  your personal account or team, our system will ensure
  that deployments created on any of the lower plans will
  be unblocked accordingly.
  
  In turn, you can **unblock your deployment** by either upgrading
  to a plan that is equal or higher than the one under which
  the deployment was created, or re-deploying it. 

  ### How Deployments Are Blocked

  In both cases, these restrictions will be enforced upon
  your deployment:

  - Deployments will return the status code ${<InlineCode>402</InlineCode>} and
  a page letting you know about the failed payment. This message
  can be seen by anyone trying to access the deloyment.

  - In addition to returning the error message, deployments
  will be scaled to 0 running instances. No code will
  be executed anymore.
  
  In the case that your account or team was suspended because of
  failed payments, the following will apply as well:

  - API requests with the ${<InlineCode>Accept header</InlineCode>} header
  set to ${<InlineCode>application/json</InlineCode>} will result
  in a JSON response
  with the ${<InlineCode>error.code</InlineCode>} property
  set to ${<InlineCode>payment_required</InlineCode>}.

  If you need additional advice on how to unblock your
  deployments or prevent them from initially getting
  blocked, please contact us
  at [support@zeit.co](mailto:support@zeit.co).
`)
