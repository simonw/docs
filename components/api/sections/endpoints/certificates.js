import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import {
  InputTable,
  OutputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  BooleanCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Endpoint from '../../endpoint'
import Request from '../../request'

function Certificates(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### List all the certificates
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v3/now/certs" />}

Retrieves a list of certificates issued for the authenticating user or
information about the certificate issued for the common name specified in the URL.

#### Output

${<OutputTable>
  <Row>
    <BoldCell>certs</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of issued certificates.</Cell>
  </Row>
</OutputTable>}

#### Certificate
This is the format of each item in the ${<InlineCode>certs</InlineCode>} list.

${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>cns</BoldCell>
    <TypeCell>List&lt;String&gt;</TypeCell>
    <Cell>The common names for which domain the certificate was issued.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
  <Row>
    <BoldCell>expiration</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate is going to expire.</Cell>
  </Row>
  <Row>
    <BoldCell>autoRenew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the certificate is going to be automatically renewed.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v3/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "certs": [
    {
      "cns": ["testing.zeit.co", "*.zeit.co"],
      "uid": "oAjf6y9pxZgCJyQfrclN",
      "created": "2016-08-23T18:13:09.773Z",
      "expiration": "2016-12-16T16:00:00.000Z",
      "autoRenew": true
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get a single certificate
`
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v3/now/certs/:id"/>}

Retrieves the information about the certificate issued for
certificate id specified in the URL.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>cns</BoldCell>
    <TypeCell>List&lt;String&gt;</TypeCell>
    <Cell>The common names for which domain the certificate was issued.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
  <Row>
    <BoldCell>expiration</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate is going to expire.</Cell>
  </Row>
  <Row>
    <BoldCell>autoRenew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the certificate is going to be automatically renewed.</Cell>
  </Row>
</OutputTable>}
`,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v3/now/certs/oAjf6y9pxZgCJyQfrclN"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (200) response:

${<Code>{`{
  "cns": ["wow.zeit.co"],
  "uid": "oAjf6y9pxZgCJyQfrclN",
  "created": "2016-08-23T18:13:09.773Z",
  "expiration": "2016-12-16T16:00:00.000Z",
  "autoRenew": true
}`}</Code>}`
  ],
  [
    markdown(components)`
### Create a new certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v3/now/certs"/>}

Issues and stores a new certificate for the common names given in 
the body using **Let's Encrypt**.

The body should contain \`domains\` array and it may contain \`renew\` field to renew an existing certificate.

#### Input
${<InputTable>
  <Row>
    <BoldCell>domains</BoldCell>
    <TypeCell>List&lt;String&gt;</TypeCell>
    <BooleanCell status={true} />
    <Cell>A list of Common Names for which the certificate is being provisioned.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the issued certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>created_at</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v3/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "domains": ["testing.zeit.co"],
    "renew": true
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "zWsFytQUFlkUWaR7nWdwS7xR"
  "created_at": 2016-06-01T21:03:10.420Z"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Submit a certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="PUT" url="/v3/now/certs" />}

Create a new certificate entry with a user-supplied certificate.

The body should contain \`cert\`, private \`key\`, and \`ca\` chain fields in PEM format.

#### Input
${<InputTable>
  <Row>
    <BoldCell>ca</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted CA chain</Cell>
  </Row>
  <Row>
    <BoldCell>cert</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted certificate</Cell>
  </Row>
  <Row>
    <BoldCell>key</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted private key</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>created_at</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="PUT"
  url="https://api.zeit.co/v3/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "ca": "PEM formatted CA chain",
    "cert": "PEM formatted certificate",
    "key": "PEM formatted private key"
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "created_at": 2016-06-01T21:03:10.420Z"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Delete a certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v3/now/certs/:id" />}

Delete an existing certificate entry. If the certificate entry was
removed successfully the endpoint will return with code **200** and
an empty body; Otherwise an error object is returned.
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v3/now/certs/zWsFytQUFlkUWaR7nWdwS7xR"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}
    `
  ]
]}
    />
  )
}

export default pure(Certificates)
