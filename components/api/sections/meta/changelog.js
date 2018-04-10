import React from 'react'
import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { GenericLink } from '../../../text/link'
import Deprecated from '../../deprecated'
import pure from '../../../../lib/pure-component'

const H2 = components.h2

function Changelog() {
  return (
    <Section
      title="Changelog"
      hash="#changelog"
      contents={// prettier-ignore
      [
  [
      <Container key="container1">{
      markdown(components)`
${<Heading>Improved Certificates API</Heading>}
${<ReleaseDate>RELEASED 10, APRIL 2018</ReleaseDate>}
${<Deprecated hash="#endpoints/deployments/certificates/list-all-the-certificates">List all the certificates</Deprecated>}
    `}</Container>
  ],
  [
      <Container key="container2">{
      markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/certificates/list-all-the-certificates">v3 endpoint</GenericLink>} instead.

Each certificate in the ${<InlineCode>certs</InlineCode>} list now contains
a ${<InlineCode>cns</InlineCode>} list inside, with Common Names strings as children.

Previously, there was a ${<InlineCode>cn</InlineCode>} field with a
unique common name string inside.
    `}</Container>
  ],
  [
      <Container key="container1">{
      markdown(components)`
${<Deprecated hash="#endpoints/certificates/get-a-single-certificate">Get a single certificate</Deprecated>}
    `}</Container>
  ],
  [
      <Container key="container2">{
      markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/certificates/get-a-single-certificate">v3 endpoint</GenericLink>} instead.

Like the certificates list endpoint, it now returns a ${<InlineCode>cns</InlineCode>} array
instead of the ${<InlineCode>cn</InlineCode>} string.

    `}</Container>
  ],
  [
      <Container key="container1">{
      markdown(components)`
${<Deprecated hash="#endpoints/certificates/submit-a-certificate">Replace a certificate</Deprecated>}
    `}</Container>
  ],
  [
      <Container key="container2">{
      markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/certificates/submit-a-certificate">v3 endpoint</GenericLink>} instead. It's now labeled **Submit a Certificate**.

Certificates can no longer be replaced. You can use this ${<InlineCode>PUT</InlineCode>} endpointto upload your own new certificate.

The ${<InlineCode>domains</InlineCode>} field is no longer accpeted. The Common Names
are extracted from the certificate itself automatically.

    `}</Container>
  ],
  [
      <Container key="container1">{
      markdown(components)`
${<Deprecated hash="#endpoints/certificates/delete-a-certificate">Delete a certificate</Deprecated>}
    `}</Container>
  ],
  [
      <Container key="container2">{
      markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/certificates/delete-a-certificate">v3 endpoint</GenericLink>} instead.

In order to delete a certificate, the only allowed way is to pass
its unique identifier.

Previously, it was possible pass a domain name. This was error-prone
and imprecise as a domain name can be present in multiple
certificates, as a Common Name (CN).
    `}</Container>
  ],
  [
      <Container key="container1">{
      markdown(components)`
${<Deprecated hash="#endpoints/certificates/create-a-new-certificate">Create a certificate</Deprecated>}
    `}</Container>
  ],
  [
      <Container key="container2">{
      markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/certificates/create-a-new-certificate">v3 endpoint</GenericLink>} instead.

We removed the ${<InlineCode>renew</InlineCode>} option. Renewals now
happen by issuing new certificates, instead of replacing them.

Certificates are now effectively immutable. Our load balancers will
pick a non-expired suitable certificate to serve your requests
automatically.
    `}</Container>
  ],
  [
    <Container key="container1">{
    markdown(components)`
${<Heading>Better Public Deployments</Heading>}
${<ReleaseDate>RELEASED 14, FEBRUARY 2018</ReleaseDate>}
${<Deprecated hash="#endpoints/create-a-new-deployment">Create a new deployment</Deprecated>}
  `}</Container>
  ],
  [
    <Container key="container2">{
    markdown(components)`
The v2 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/deployments/create-a-new-deployment">v3 endpoint</GenericLink>} instead.

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

${<Code>POST /v3/now/deployments</Code>}

Example request **(user is on the OSS plan)**:

${<Code syntax="shell">{`curl -X POST https://api.zeit.co/v3/now/deployments \
-H 'Authorization: Bearer $TOKEN' \
-d '{
  "name": "my-instant-deployment",
  "deploymentType": "NPM",
  "public": true,
  "files": [
    {
      "file": "index.js",
      "data": "const { Server } = require(\"http\")\\nconst bunny = require(\"sign-bunny\")\\n\\nconst server = Server((req, res) => {\\n  res.setHeader(\"Content-Type\", \"text/plain; charset=utf-8\")\\n  res.end(bunny(\"Hi there!\"))\\n})\\n\\nserver.listen()"
    },
    {
      "file": "package.json",
      "data": "{\\n  \"name\": \"my-instant-deployment\",\\n  \"dependencies\": {\\n    \"sign-bunny\": \"1.0.0\"\\n  },\\n  \"scripts\": {\\n    \"start\": \"node index\"\\n  }\\n}"
    }
  ]
}'`}</Code>}

Error response (because  ${<InlineCode>public</InlineCode>} is not set):

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
${<Heading>Better Deployments API</Heading>}
${<ReleaseDate>RELEASED 31, OCTOBER 2017</ReleaseDate>}
${<Deprecated hash="#endpoints/deployments/create-a-new-deployment">Create a new deployment</Deprecated>}
  `}</Container>
  ],
  [
    <Container key="container2">{
    markdown(components)`
The v1 endpoint has been deprecated. Use the ${<GenericLink href="/api#endpoints/deployments/create-a-new-deployment">v2 endpoint</GenericLink>} instead.

Create a new deployment on the fly by supplying an **:id** in the URL and the necessary file data in the body.

The body contains a special key \`package\` that has the \`package.json\` JSON structure. Other keys will represent a file path, with their respective values containing the file contents.

> **NOTE:** The code and logs under the OSS plan will be public.

    `}</Container>
  ]
]}
    />
  )
}

export default pure(Changelog)

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
