import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Frequently Asked Questions',
  date: '30 Jan 2018',
  authors: [sergio],
  editUrl: 'pages/docs/other/faq.js',
})(markdown(components)`

## Where Can I See the Current Status of the Platform?

Check our [status page](https://zeit-status.co) and [Twitter status account](https://twitter.com/zeit_status) to find current and real time updates.

## What Is the Difference between Deployments and Instances?

Whenever you upload files using Now CLI or Now Desktop, a new deployment is
created. This deployment will only have one instance by default. However, every deployment
can be [scaled](/docs/getting-started/scaling) to multiple instances.

Therefore, each "deployment" can consist of multiple "instances".

Both personal and team accounts may own unlimited deployments. However, the
number of running instances is limited your personal or team account's [current plan](/pricing).

If you exceed your paid plan's limit for running instances, you will
be charged the **On Demand price** (check the [On Demand plan](/pricing)) for
the additional instances.

## How Do I Deploy and Alias in a Single Command?

Create a [configuration file](/docs/features/configuration) with the keys [alias](/docs/features/configuration#alias-(string|array)) and [name](/docs/features/configuration#name-(string)) similar to this one:

${<Code>{`{
  "name": "my-app",
  "alias": "my-app.now.sh"
}`}</Code>}

Then run the following command:

${<TerminalInput>now && now alias</TerminalInput>}

It will deploy your application under the configured name and then alias the latest deployment with the configured alias.

## How Do I Remove an Old Deployment?

Note that you do not need to remove an old deployment since it will eventually [freeze](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling). If you keep it, you can easily rollback by just changing the alias.

But if you still want to remove it, it is possible using the following command:

${<TerminalInput>now rm my-app --safe --yes</TerminalInput>}

This command will remove all your non-aliased deployments with the name \`my-app\`. This can be run after the \`now alias\` command to remove the previous deployment of the project.

${<TerminalInput>now && now alias && now rm my-app --safe --yes</TerminalInput>}

## How Do I Pick the Deployment Region(S) for My Application?

At the moment, ${<Now color="#000" />} only has support for one region; [SFO](https://sfo.now.sh).

Soon we will be enabling another region in Europe; [BRU](https://bru.now.sh). In the future, we will try and extend beyond them both.

## How Do I Change My Account's Email Address?

Send us an email at [support@zeit.co](mailto:support@zeit.co?subject=Email%20change) with your desired email address. We will reply with validation codes similar to \`Sparkling Red-handed Tamarin\` to both your old and new email addresses. Upon receiving a response with the codes, we will then proceed with the change.

## What Are the Hardware Specifications of the Deployment Instances?

Each instance has up to 1GB of RAM and 1 CPU in [any paid plan](/pricing).

Deployments belonging to the OSS plan have half the resources of a paid plan.

The storage limit of any plan is shown under the plan on [the pricing page](/pricing).

## How Do I Allocate More Resources for My Application?

At the moment there is no way to change this. We do have this on the roadmap though!

For [enterprise customers](mailto:enterprise@zeit.co?subject=Custom%20Hardware%20Resources) we can offer customizations which include more resources for deployments.

## How Do I Update My Deployment's Files or Code?

Deployments are immutable. This means they cannot be be modified after being created. To update your application, you need to deploy the new version using the command \`now\`, after that you will get a new unique deployment URL similar to \`my-app-hjrehxuuih.now.sh\`.

This model enables a few interesting benefits:

- **Easy rollback**${<br />}
You can just move your alias to an older deployment to have immediate rollbacks.
- **Staging and Production deployments**${<br />}
  A new deployment gives you a unique URL you can use as staging, share it with co-workers or clients and then after it is confirmed it works you can upgrade it to production with a single command, \`now alias\`.
- **Zero-Downtime deployment**${<br />}
  Most services will require you to restart your server (eg. Node.js). Thanks to ${<Now color="#000" />}, you get a new deployment. You can wait until the deployment is ready to change the alias and avoid any downtime in the deployment process.

## Can I Run a Database on the Now Platform?

Now deployments **must** expose a [single](/docs/deployment-types/node#port-selection) [port](/docs/deployment-types/docker#port-selection) running an HTTP or WebSocket server. However, using Docker it is possible to run a database in the same container of the HTTP API consuming it.

Note that due the immutability of deployments there are many cases where you will lose the data of your database.

- A new deployment will have a newly created, fresh database.
- Each [instance of the same deployment](docs/getting-started/scaling) will have it's own data.
- If the deployment freezes (has zero running instances), when it unfreezes the database will be cleared.

We recommend that you run your database on a database hosting service. You can [ask our community for recommendations](/chat).

## Can I Transfer Domains into/out of ZEIT Domains?

We are working on a domain transfer tool to make this process easy. In the meantime you can contact us at [support@zeit.co](mailto:support@zeit.co?subject=Domain%20Transfer) with the domain you would like to transfer.

If you would like to move a domain from one ZEIT account to another, you could do so by running the following commands:

1. From the current owner of the domain: \`now domain rm domain.com\`
2. From the desired owner of the domain: \`now domain add domain.com\`

After you have done this, the desired owner will be in possession of the domain and be able to utilize it with ZEIT and Now.

## Can I Use docker-compose with Now?

At the moment ${<Now color="#000" />} does not support docker-compose. Keep an eye on the [open issue on GitHub](https://github.com/zeit/now-cli/issues/294) to know when it will be supported.

## How Do I Disable HTTPS and Just Use HTTP Instead?

There is no way to disable SSL. All the ${<Now color="#000" />} deployments are HTTPS by default.

## How Do I Specify an Environment Variable with a Value That Starts with \`@\`?

We will always try to replace any environment variable where the value starts with an \`@\` with a [secret](/docs/features/env-and-secrets). We have [an active issue for this on GitHub](https://github.com/zeit/now-cli/issues/1061).

As a workaround you can setup a secret with a value starting with \`@\`.

## Why Does My Deployment Occasionally Have Long Response Times?

Deployments have a [default scale configuration](/docs/getting-started/scaling#default-scaling) which sets each deployment to freeze after a while from inactivity.

This lets you have any amount of deployments without worrying about your currently running instances. They will be unfrozen when a new request comes and keeps the instance running for a while (eventually freezing from inactivity with no requests again).

This behaviour can be completely avoided using the \`now scale\` command as described in [previous link](/docs/getting-started/scaling#default-scaling).

## Can I Remove or Delete a Team?

It is not currently possible to delete a team. If you keep it on the [OSS plan](/pricing), it can be safely ignored and you will not be charged.

## How Do I Create a Redirect from www.mysite.com to mysite.com?

Check our guide on how to setup a redirect:

> [Setting up a Redirect with Now](/docs/guides/redirect)

## Can I Run a Bot on Now?

Yes, you can! Remember to expose a single port running an HTTP server.

If your bot is working in the background; before removing it, it is recommended that you manually scale your current bot deployment down to zero instances then deploy a new version. This avoids having your bot running multiple times.

${<TerminalInput>now scale my-bot-hjnfyyugps.now.sh 0</TerminalInput>}

This will ensure the bot is no longer running before you remove it or deploy a new version.

## How Do I Change the Nameservers of a Domain Purchased with ZEIT Domains?

This is not currently possible to do via the [Now CLI](/docs/features/now-cli), but you can contact us at [support@zeit.co](mailto:support@zeit.co?subject=Change%20Purchased%20Domain%20Nameserver) with your desired nameservers and, after a security verification of the ownership, we can change them for you.

## How Can I Avoid the Prompt about the Deployment Being Public under the OSS Plan?

If you add the \`--public\` option when deploying, you will not be asked to confirm if you are aware the deployment's contents will be made public.

${<TerminalInput>now --public</TerminalInput>}

## How Do I Prevent My Deployment from Freezing?

Check ["Why does my deployment occasionally have long response times?"](/docs/other/faq#why-does-my-deployment-occasionally-have-long-response-times)

## If I Need a Special Invoice How Do I Get It?

We send a receipt to your email address for every card transaction. For special invoicing requests, please contact us at [support@zeit.co](support@zeit.co?subject=Invoice) with the following information:

- Company name
- Billing contact (full name)
- Address
- Contact phone number
- VAT number (if applicable)
- Any additional information you may require

Please note that we can only honor special invoicing requests that come from the personal account's email address or, in the event the request pertains to a team, the team owner's email address.

## How Do I Remove or Delete My Account?

Contact us at [support@zeit.co](support@zeit.co?subject=Remove%20account) from the account's email address.

## How Many Levels of Subdomain Can I Use?

You can define up to 10 levels of subdomains for a custom domain you own. For \`.now.sh\` domains you can only use one level.

## How Do I Make My Deployments Private?

All the deployments made with a paid account or team are private by default.

## Why Do I Still See the Source Code of My Deployment If It Is Private?

If you are logged in to [zeit.co](/login), you can still access the source when going to \`_src\`.

## Is It Possible to Host WordPress to Now Platform?

Check our WordPress example repository.

> [https://github.com/now-examples/wordpress](https://github.com/now-examples/wordpress)

## Is It Possible to Host Ghost to Now Platform?

Check our Ghost example repository.

> [https://github.com/now-examples/ghost](https://github.com/now-examples/ghost)

## How Do I Add My Deployments to a List of Whitelisted Ip Addresses?

The IP addresses of ${<Now color="#000" />} deployments are too dynamic and for that reason we don't provide a list of them.

Our recommendation when connecting to external services (eg. a database) is to use a strong password and SSL.

## How Do I Setup an Email for My Domain Purchased with Now Domains?

${<Now color="#000" />} doesn't provide you with an email server for your custom domains. You can use [\`now dns\`](/docs/features/dns) to setup MX records pointing to any external service.

## How Can I Setup Basic HTTP Authentication for My Deployment?

Any HTTP authentication should be implemented inside the deployment code

For static sites you can use [zeit/serve](https://github.com/zeit/serve) with the \`--auth\` flag.

## How Do I Use Private Npm Modules or Github Repositories?

You can read how to use private npm modules on our guide:

> [Using Private npm Dependencies](/docs/features/private-npm)

For private GitHub repositories you can follow the GitHub guide:

> [Easier builds and deployments using Git over HTTPS and OAuth](https://github.com/blog/1270-easier-builds-and-deployments-using-git-over-https-and-oauth)

## Is It Possible to Reuse an Existing Alias?

Yes, you can use \`now alias\` to move an existing alias from a deployment to another the same way you use it to assign it the first time.

Note that you can not use an alias already used by another user until they remove it.

## Why Does My Deployment Keep Running after I Have Removed It?

The actual deletion of a deployment could take around a minute, but sometimes this could take longer. If your deployment is showing side-effects without a request (eg. a process running every N minutes), we recommend that you first scale it to zero instances and then remove it.

## Does Now Supports Wildcard Subdomains?

We do not currently support wildcard subdomains

## Can I Have a Refund for a Domain Purchase?

No, there is no way to release a domain after it was purchased until the next renewal date, because of that we can not give you a refund.

If you do not want to renew a domain purchased with Now Domains; remove it with the following command:

${<TerminalInput>now domain rm mysite.com</TerminalInput>}

## Do You Offer Custom Support or Help with Next.js?

Yes, we do. Let us know if you'd like our help at [enterprise@zeit.co](enterprise@zeit.co?subject=Next.js%20Custom%20Support).

## Is It Possible to Remove the Logs of a Deployment?

At the moment this is not possible

## Is It Possible to Download the Files or Code of My Deployments?

It is not possible to download files of a deployment from the CLI nor the web, contact us at [support@zeit.co](support@zeit.co?subject=Download%20Deployment%20Code) from the personal account's email address or, in the event the request pertains to a team, the team owner's email address and we can help you.

## How Do I Run Scheduled Tasks on the Now Platform?

While we do not have a built-in way to run scheduled tasks it is possible.

Create a deployment with a basic HTTP service running and initialize a \`setInterval\` and a second deployment with the code of your tasks running behind an HTTP server.

Every time you need to run the task the first deployment must send an HTTP request to the second deployment. Using two different deployments will let you change the code of your task without restarting the interval.

Remember to [scale](/docs/getting-started/scaling) the first deployment to [always have one running instance](/docs/getting-started/scaling#fixed-scaling).

## How Can I Test How Much Request per Second I Can Handle with One Instance?

It depends on your code. Each instance belonging to a paid account or team has [1GB of RAM and 1 CPU (OSS accounts have half of each)](/docs/other/faq#what-are-the-hardware-specifications-of-the-deployment-instances).

The amount of HTTP requests you can have per instance is based on the previous information and your code.

## Why Would I Require Autoscale and Not Just Use All My 10 Instances at the Same Time?

Your instance limit [(based on your plan)](/pricing) is per account not per deployment. For example; if you want to have more than one running deployment you need to share those instances. Using autoscale will let you have N amount of deployments and scale as required.

## Where Do I See My Current Bandwidth and Logs Consumption?

You can see those metrics on [your account](/dashboard) or team [dashboard](/blog/zeit-dashboard).

## Is It Possible to Upload Files to a Running Now Instance?

Yes, it is possible under the \`/tmp\` folder. Note that each instance has it's own temporary directory, this mean you can lose those files under following conditions:

- A new deployment will have a newly created temporary folder
- Each [instance of the same deployment](docs/getting-started/scaling) will have it's own temporary folder.
- If the deployment freeze (has zero running instances) when it unfreeze the temporary folder will be also cleared.

We recommend that you only do this for temporary files and use [now-storage](https://github.com/sergiodxa/now-storage) or another storage service for hosting those files indefinitely.

## How Do You Protect Deployments against DDoS Attacks?

Both our DNS and HTTP(s) load balancing services have sophisticated DDoS protections in place.

Attacks come in very different forms and sizes. Therefore, we offer more advanced protection in the [enterprise](mailto:enterprise@zeit.co?subject=Advanced%20DDoS%20Protection) tiers.

## How Do I Setup a Password for My ZEIT Account?

ZEIT's login is serverless. You just need your email address and don't need to remember yet another password.

For custom requirements you can contact us at [enterprise@zeit.co](mailto:enterprise@zeit.co?subject=Advanced%20Authentication).

`)
