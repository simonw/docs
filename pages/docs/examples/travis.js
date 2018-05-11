import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { devisscher } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code, InlineCode } from '../../../components/text/code'

// prettier-ignore
export default withDoc({
  title: 'Automate Deployment with Travis CI',
  description: 'Using Travis CI to automate your Now deployments',
  date: '04 November 2017',
  authors: [devisscher],
  editUrl: 'pages/docs/examples/travis.js',
})(markdown(components)`

You might want to automate your Now deployments. Here is how you can achieve this by using Git and Travis. Every time you push or merge to the master branch a new build and deployment is initiated in Travis CI.

1. You need to get a [token](https://zeit.co/account/tokens). Go to the tokens page of your dashboard, under Account Settings, Tokens. Enter the name of the Token (e.g. Travis CI) and hit enter. A new token will be created which you can copy to your clipboard by clicking Copy.
2. Create a .travis.yml file in the root of your project.
3. Generate a secure variable for your ZEIT token by running the following command with the token you obtained from your ZEIT account. (You need to install [The Travis Client](https://github.com/travis-ci/travis.rb#installation)):

${<TerminalInput>travis encrypt -r username/repo NOW_TOKEN=xxxxxxxxxxxxxxxxxxxxxxx --add</TerminalInput>}

4. Now open your .travis.yml file and add the following:

${
<Code>{
`language: node_js
node_js:
- "node"
cache: npm
script: npm run deploy
after_script: npm run alias
env:
global:
    secure: <this is your encrypted NOW token. It was added when you ran travis encrypt>
`}
</Code>}

5. Open your package.json file and add the following
information, adapted for your own deployment. This is used to run the alias command and point your
domain to the correct deployment (you could also put
this in a [now.json](https://zeit.co/blog/now-json) file):

${
<Code>{`{
    ...
    "now": {
        "name": "example",
        "alias": "example.com"
        }
    ...
}`}</Code>}

6. Also add the following 2 scripts to the ${<InlineCode>script</InlineCode>} property in your package.json file. These are used by your Travis config. The first is to deploy and the second is used to alias your latest deploy:

${
<Code>{`{
    ...
    "scripts": {
    ...
        "deploy": "now -e NODE_ENV=production --token $NOW_TOKEN --npm",
        "alias": "now alias --token=$NOW_TOKEN"
        }
    }
}`}
</Code>
}

7. Test it out by committing your code to Github. Check out your [travis-ci.org](https://travis-ci.org) build feed.

`)
