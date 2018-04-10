import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { devisscher, sergio } from '../../../lib/data/team'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import { InlineCode } from '../../../components/text/code'

// prettier-ignore
export default withDoc({
  title: 'Continuous Integration with Travis CI',
  date: '13 Mar 2018',
  authors: [devisscher, sergio],
  editUrl: 'pages/docs/continuous-integration/travis.js'
})(markdown(components)`

Continuous Integration lets you automate the build and deployment of your project after a new commit is pushed to a GitHub repository.

In this guide we will setup our CI pipeline to:

- Build an application inside Travis
- Create a new deployment after each commit to any branch
- [Alias](/docs/features/aliases) your deployment made on the master branch with your [custom domain](/docs/getting-started/assign-a-domain-name)

## Get a Now Token

The first thing you'll need is a token for your account. You can get this in the [Tokens section](/account/tokens) of your Account Settings.

Go to the tokens page of your dashboard, underr Account Settings, Tokens.

By entering a name into the input mentioning "Create a new token..." and pressing Enter, a new token will be created which you can copy to your clipboard by clicking ${<InlineCode>Copy</InlineCode>}.

With this token you can use Now with your account anywhere with the following command:

${<TerminalInput>now --token $TOKEN</TerminalInput>}

Or the short version:

${<TerminalInput>now -t $TOKEN</TerminalInput>}

Where ${<InlineCode>$TOKEN</InlineCode>} is the token you copied from your Account Settings.

## Integrate Travis in your project

Now that you have your token, you need to integrate Travis into your project. Create a ${<InlineCode>.travis.yml</InlineCode>} file in the root of your repository.

Go to the Travis CI site and [add your repository](https://docs.travis-ci.com/user/getting-started/). If it's public you can use [travis-ci.org](https://travis-ci.org), if the repository is private you need to use the paid version under [travis-ci.com](https://travis-ci.com).

After you added your repository go to its settings (e.g. ${<InlineCode>https://travis-ci.org/:username/:repositroy/settings</InlineCode>}) and add a new environment variables whose value is your Now token. If you call it ${<InlineCode>TOKEN</InlineCode>} you can then use it inside Travis CI as:

${<TerminalInput>now --token $TOKEN</TerminalInput>}

> *Note*: You can use any name for your environment, just chagen ${<InlineCode>$TOKEN</InlineCode>} with your variable name and the ${<InlineCode>$</InlineCode>} at the beginning.

## Configure Travis

Now you need to configure your Travis pipeline. In order to do that you need to change your ${<InlineCode>.travis.yml</InlineCode>} file and add the following content:

${<Code>{`
language: node_js
node_js:
  - "node"
cache:
  directories:
    - "node_modules" # will tell Travis CI to cache the dependencies
script: npm test # here you could also run the build step of your application
before_deploy: npm install now --no-save # install Now CLI on Travis
deploy:
  - provider: script # Let's run a custom deployment script
    script: now --token $TOKEN
    skip_cleanup: true
    on:
      all_branches: true
      master: false
  - provider: script
    script: now --token $TOKEN && now alias --token $TOKEN
    skip_cleanup: true
    on:
      master: true
`}</Code>}

> *Note*: If you are deploying using an OSS account you need to add the ${<InlineCode>--public</InlineCode>} option while deploying to avoid being asked if you are sure you want your deployment to be public.

As you may notice above the command on master is only ${<InlineCode>now alias</InlineCode>} without the deployment URL and the alias, this can be achieved [using a configuration file](/docs/features/configuration). You can read more about it on ["How Do I Deploy and Alias in a Single Command?" in our FAQ](/docs/other/faq#how-do-i-deploy-and-alias-in-a-single-command).

That's it, everytime you push a new commit to any branch it will create a new deployment and if the branch is master it will also move the project aliases to it.

## Avoid building on Now

In some cases you may prefer to build on Travis CI instead of directly on Now. If that's the case it can be achieved modifying a little bit your ${<InlineCode>.travis.yml</InlineCode>} and ${<InlineCode>now.json</InlineCode>} files.

### Define what to deploy

If you decide to built your application on Travis CI you will not need to deploy your source code, if that's the case you can use a [configuration file with the ${<InlineCode>files</InlineCode>} key](/docs/features/configuration#files-(array)) to specify what to deploy.

If you are building a [Next.js](https://github.com/zeit/next.js) application with a [custom server](https://github.com/zeit/next.js#custom-server-and-routing) you can add the following to your configuration file.

${<Code>{`
{
  ...
  "files": [
    ".next",
    "server",
    "static,
    "package.json",
    "yarn.lock"
  ],
  ...
}
`}</Code>}

With this Now will only deploy the files under the directories ${<InlineCode>.next</InlineCode>}, ${<InlineCode>server</InlineCode>}, ${<InlineCode>static</InlineCode>}, and the files ${<InlineCode>package.json</InlineCode>} and ${<InlineCode>yarn.lock</InlineCode>}. You can customize this to add any files which will be required by your application after the build step.

### Run build on Travis

Now you just need to change your ${<InlineCode>.travis.yml</InlineCode>} file to run the build script. To do this, change the ${<InlineCode>script</InlineCode>} part of your file as follows:

${<Code>{`
...
script: npm run build
...
`}</Code>}

> *Note*: This will make Travis CI run the build script instead of test, you can add a prebuild or postbuild step to run tests

And since you are building your application on Travis, you don't want Now to try to build it. To avoid this you can add a simple script to the ${<InlineCode>package.json</InlineCode>}.

${<Code>{`
{
  ...
  "scripts": {
    ...
    "now-build": "echo 'Built on Travis CI'",
    ...
  }
  ...
}
`}</Code>}

If that script is defined, Now will use it instead of ${<InlineCode>build</InlineCode>}. This lets you define it in order to customize the build step on Now or just avoid it.
`)
