import React from 'react'
import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { GenericLink } from '../../../text/link'
import Deprecated from '../../deprecated'
import pure from '../../../../lib/pure-component'

const H2 = components.h2

function V2(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      title="Changelog"
      hash="#changelog"
      contents={// prettier-ignore
      [
  [
    <Container key="container1">{
    markdown(components)`
${<Heading>Version 3.0</Heading>}
${<ReleaseDate>RELEASED 14, FEBRUARY 2018</ReleaseDate>}
${<Deprecated hash="#endpoints/deployments/create-a-new-deployment">Create a new deployment</Deprecated>}
  `}</Container>
  ],
  [
    <Container key="container2">{
    markdown(components)`
This endpoint has been deprecated. Use ${<GenericLink href="/api#endpoints/deployments/create-a-new-deployment">v3 endpoint</GenericLink>} instead.

Starting with this release, the ${<InlineCode>public</InlineCode>} property in
the POST request for creating the deployment needs to be
set to ${<InlineCode>true</InlineCode>} for all deployments
made on the OSS plan.

For higher plans, the value can be either:

- ${<InlineCode>true</InlineCode>} for making the
deployment's code publicly accessible under the ${<InlineCode>/_src</InlineCode>} path.
- ${<InlineCode>false</InlineCode>} for protecting
the deployment's code from public access (${<InlineCode>/_src</InlineCode>} results in a 403 error).

**If the property is not set and the plan is
OSS, ${<GenericLink href="/api#errors/deployment-errors/wrong-value-for-[object-object]-property">an error</GenericLink>} will be thrown.** This opportunity
can be used for showing a confirmation message to the user (asking
them if they really want to deploy):

As an example, Now CLI and Now Desktop firstly send ${<InlineCode>public: false</InlineCode>} (even
on the OSS plan). Then, once the API responds with the error, the confirmation
prompt gets shown. If the user agrees to the prompt, another request
will be sent with ${<InlineCode>public: true</InlineCode>}.

    `}</Container>,
    markdown(components)`
Endpoint:

${<Code>POST /now/deployments</Code>}

Example request **(user is on the OSS plan)**:

${<Code syntax="shell">{`curl -X POST https://api.zeit.co/now/deployments \\
  -H 'Authorization: Bearer ${TOKEN}' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "package": {
    "name": "my-instant-deployment",
    "dependencies": {
      "sign-bunny": "1.0.0"
    },
    "scripts": {
      "start": "node index"
    }
  },
  "server/index.js": "require(\\"http\\").Server((req, res) => {\nres.setHeader(\\"Content-Type\\", \\"text/plain; charset=utf-8\\");\nres.end(require(\\"sign-bunny\\")(\\"Hi there!\\"));\n}).listen();"
}'
`}</Code>}

Error response (because ${<InlineCode>public</InlineCode>} is not set):

${<Code>{`{
  "error": {
    "code": "plan_requires_public",
    "message": "Your plan (OSS) requires the deployment to be marked as public."
  }
}`}</Code>}
    `
  ],
  [
    <Container key="container1">{
    markdown(components)`
${<Heading>Version 2.0</Heading>}
${<ReleaseDate>RELEASED 31, OCTOBER 2017</ReleaseDate>}
${<Deprecated hash="#endpoints/deployments/create-a-new-deployment">Create a new deployment</Deprecated>}
  `}</Container>
  ],
  [
    <Container key="container2">{
    markdown(components)`
This endpoint has been deprecated. Use ${<GenericLink href="/api#endpoints/deployments/create-a-new-deployment">v2 endpoint</GenericLink>} instead.

Create a new deployment on the fly by supplying an **:id** in the URL and the necessary file data in the body.

The body contains a special key \`package\` that has the \`package.json\` JSON structure. Other keys will represent a file path, with their respective values containing the file contents.

> **NOTE:** The code and logs under the OSS plan will be public.

    `}</Container>,
    markdown(components)`
Endpoint:

${<Code>POST /now/deployments</Code>}

Example request:

${<Code syntax="shell">{`curl -X POST https://api.zeit.co/now/deployments \\
  -H 'Authorization: Bearer ${TOKEN}' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "package": {
    "name": "my-instant-deployment",
    "dependencies": {
      "sign-bunny": "1.0.0"
    },
    "scripts": {
      "start": "node index"
    }
  },
  "server/index.js": "require(\\"http\\").Server((req, res) => {\nres.setHeader(\\"Content-Type\\", \\"text/plain; charset=utf-8\\");\nres.end(require(\\"sign-bunny\\")(\\"Hi there!\\"));\n}).listen();"
}'
`}</Code>}

Example request with a successful (**200**) response:

${<Code>{`{
  "uid": "ChbZiZe84CKtod6rmCIRRvYR",
  "host": "my-instant-deployment-rrucptrbft.now.sh",
  "state": "BOOTED"
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(V2)

class Container extends React.PureComponent {
  render() {
    return (
      <main>
        <div className="line" />
        {this.props.children}
        <style jsx>{`
          main {
            display: flex;
            flex: 1;
          }
          .line {
            border-left: 1px solid #eaeaea;
            padding-left: 30px;
          }
        `}</style>
      </main>
    )
  }
}

class Heading extends React.PureComponent {
  render() {
    return (
      <main>
        <H2>{this.props.children}</H2>
        <style jsx>{`
          main {
            align-items: center;
            display: flex;
            margin-bottom: -20px;
          }
          main::before {
            background: #000;
            border-radius: 100%;
            content: '';
            display: inline-block;
            height: 10px;
            margin-left: -35px;
            margin-right: 25px;
            width: 10px;
          }
        `}</style>
      </main>
    )
  }
}

class ReleaseDate extends React.PureComponent {
  render() {
    return (
      <div className="release-date">
        {this.props.children}
        <style jsx>{`
          .release-date {
            color: #999;
            font-size: 12px;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    )
  }
}
