import markdown from 'markdown-in-js'
import asset from 'next/asset'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { InlineCode } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Global Scaling',
  date: '01 Apr 2018',
  authors: [leo],
  editUrl: 'pages/docs/features/scaling.js',
})(markdown(components)`

In this feature guide, you will learn how to globally distribute
your deployment in order to minimize the latency your visitors
are experiencing when accessing your content from around the globe.

## Preparation

First of all, it is very important to understand that – if you
decide to scale your deployment to a certain region – you need to ensure
that all other parts of your system are optimized for this
region as well.

If you are using a database service, for example, **make sure that your data
is available in the region that you would like to enable on ${<Now color="#000" />}**. The
same goes for all the APIs your deployment is consuming.

Once you have ensured all of these services are running in your
desired region, you can expect the maximum out of performance when
scaling your deployment to this region.

### Understanding the Terminology

When scaling deployments on ${<Now color="#000" />}, it is necessary
that you understand the meaning of the
following terms (sorted by least granular to most granular):

${
  <Image
    src={asset(`${IMAGE_ASSETS_URL}/docs/scaling/region-graph.png`)}
    width={600}
    height={267}
  />
}

#### Regions

After you have decided to enable your deployment in
a certain part of the world, regions are the best way to
tell ${<Now color="#000" />} where exactly it should scale
your deployment to.

${<Now color="#000" />} provides a number of regions, each of which
consists of one or more [data centers](#data-centers):

Currently, these regions are generally available:

- [BRU](https://bru.now.sh) (Brussels, Belgium, Europe)
- [SFO](https://sfo.now.sh) (San Francisco, California, USA)

#### Data Centers

As the previous section describes it, data centers are the next level of
granularity when talking about
deployments: **Every [region](#regions) consists
of multiple data centers**.

If you choose to enable your deployment in a specific region, it will
be enabled in **one data center within that region**. In most cases,
this will be the best choice, because it fulfills the promise of
providing visitors in that region with the most minimal
latency possible.

In some cases, you might want to enable your deployment in
multiple data centers within the same region (if you are experiencing
significant load or require even higher availability, for example).

When making this decision, however, it is essential to keep
in mind that you can also scale your deployment to
multiple [instances](#instances) within the same data center:

#### Instances

Once your deployment is enabled in a specific [data center](#data-centers), multiple
copies ("Instances") of that deployment might be automatically
created if the following statements are true:

- The personal account or team you have created the deployment with
is currently on a paid plan and not [restricted](/docs/other/restrictions) in
any way.
- Your deployment is receiving a lot of traffic from the outside
or you have
configured [scaling rules](#pre-defining-scaling-rules) for the [datacenter](#datacenters).

Within each [data center](#datacenter), your deployment can consist
of up to 10 instances. If you want to increase this limit,
you can [contact us](mailto:support@zeit.co) for a special offer.

## Scaling While Deploying

By default, your deployment will only be enabled in the region
that is the closest to your current location.

For example: If you are currently somewhere in the USA, your deployment
will be enabled in the [SFO region](https://sfo.now.sh) by default.

In order to enable a new deployment in a different region, however, you can
pass the ${<InlineCode>--regions</InlineCode>} option to
Now CLI:

${<TerminalInput prefix>now --regions bru</TerminalInput>}

Running the above command will result in your new deployment
getting enabled **only** in the [BRU region](https://bru.now.sh). To
enable it in both, pass both regions to the command:

${<TerminalInput prefix>now --regions bru,sfo</TerminalInput>}

If you want to scale to all regions, you can do it like this:

${<TerminalInput prefix>now --regions all</TerminalInput>}

### Pre-Defining Scaling Rules

In cases where you want to enable every new deployment of a specific
project in multiple regions, you can pre-define scaling rules in
your local configuration file [like this](/docs/features/configuration#scale-(object)).

Once that has been done, these rules will be automatically
applied when ${<InlineCode>now</InlineCode>} is run. In turn,
passing ${<InlineCode>--regions</InlineCode>} to the command
while ${<InlineCode>scale</InlineCode>} is defined in your
configuration file will lead to an error.

You only need one of the two.

## Scaling after Deploying

If you want to manually set scaling rules for your deployment
after it has been created, you can do so by using
the ${<InlineCode>now scale</InlineCode>} command.

By default, every deployment receives the following scaling
rules from our system:

- **Minimum:** 0 ([freezes](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling) if no requests come in)
- **Maximum:** 10 (if created on a paid plan, the deployment may be
automatically
scaled to up to 10 [instances](#instances) if a significant amount
of requests come in)

In order to lock the number of [instances](#instances) of a specific
deployment, you can run this command:

${<TerminalInput prefix>{`now scale <deployment> 4`}</TerminalInput>}

The above example will result in your deployment always
having 4 [instances](#instances) running in
the [data center](#datacenter) it was originally deployed to.

In order to let ${<Now color="#000" />} scale the deployment
within a range, pass another argument with the maximum
number of instances:

${<TerminalInput prefix>{`now scale <deployment> 4 7`}</TerminalInput>}

After running this command, the deployment you passed will
always have **at least 4 instances** running,
but **never exceed 7 instances**.

To revert back to the default scaling rules and
let ${<Now color="#000" />} scale your deployment automatically
as requests come in, pass ${<InlineCode>auto</InlineCode>}:

${<TerminalInput prefix>{`now scale <deployment> auto`}</TerminalInput>}

This also works for just one of the two scaling rules. As an example, this
command will ensure your deployment always has **at least
1 instance** running (therefore never freezes), but allows
it to **scale indefinitely**:

${<TerminalInput prefix>{`now scale <deployment> 1 auto`}</TerminalInput>}

### Enabling Additional Locations after Deploying

Using ${<InlineCode>now scale</InlineCode>}, you can
also scale your deployment to additional regions
or data centers after it has been created.

As an example, this command will scale your deployment to
the [SFO region](https://sfo.now.sh):

${<TerminalInput prefix>{`now scale <deployment> sfo`}</TerminalInput>}

Alternatively, you can also scale to all available [regions](#regions)...

${<TerminalInput prefix>{`now scale <deployment> all`}</TerminalInput>}

...or specify multiple:

${<TerminalInput prefix>{`now scale <deployment> sfo,bru`}</TerminalInput>}

You can also use this command to enable your deployment in
a specific [data center](#datacenter) of your choice, by passing
the data center name instead of the region name.

No matter if you pass a [region](#regions) or a [data center](#datacenter) directly,
the result will always be that your deployment gets the following
scaling rules set in the target location:

- **Minimum:** 0 ([freezes](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling) if no requests come in)
- **Maximum:** 10 (if created on a paid plan, the deployment may be
automatically
scaled to up to 10 [instances](#instances) if a lot
of requests come in)

In order to lock a region or data center to specific scaling rules, you
can still append them as you would do
without passing a location:

${<TerminalInput prefix>{`now scale <deployment> <regions|datacenters> 1 5`}</TerminalInput>}

As an example, the above command would set the following rules:

- **Minimum:** 1 (never [freezes](/docs/guides/app-lifecycle-and-scalability#instances-&-scaling), even if no requests come in)
- **Maximum:** 5 (no more than 5 [instances](#instances) can be running)

Once you have executed such a command, the copy of your
deployment running in the location of your choice can only
scale automatically in between those boundaries.
`)
