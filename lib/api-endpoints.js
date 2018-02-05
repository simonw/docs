export const API_DAY_TICKETS = '/api/day/tickets'
export const API_COMMUNITY_EXPERT = '/api/community-expert'

export const API_TEAMS = '/api/teams'
// note: we only include the prefix, which looks the same
// as API_TEAMS, because the actual URL to retrieve members
// is likely to look like `/api/teams/:id/members`
export const API_TEAMS_MEMBERS = '/api/teams'

export const API_CARDS = '/api/cards'
export const API_PLANS = '/api/plan'

export const API_USER = '/api/www/user'
export const API_USER_EVENTS = '/api/www/user/events'
export const API_USER_TOKENS = '/api/user/tokens'
export const API_USER_PLAN = '/api/www/user/plan'
export const API_USER_SUBSCRIPTIONS = '/api/v1/user/subscriptions'

export const API_EVENTS = '/api/events'

// actual URL looks like `/api/events/:id/reactions`
export const API_EVENTS_REACTIONS = '/api/events'

export const API_EVENT_REACTIONS = '/api/event-reactions'
export const API_PRICING_STATE = '/api/pricing/state'

export const API_REGISTRATION = '/api/now/registration'
export const API_HOST = '/api/now/hosts'
export const API_DEPLOYMENTS = '/api/now/deployments'
export const API_FILE_TREE = '/api/now/file-tree'
export const API_ALIASES = '/api/now/aliases'
export const API_DOMAINS = '/api/domains'
export const API_DOMAINS_BUY = '/api/domains/buy'
export const API_LIST = '/api/now/list'
export const API_OAUTH = '/api/oauth'

export const API_FILES_V2 = '/api/v2/now/files'
export const API_FILES_V1 = 'https://api.zeit.co/now/files'

export const API_STATE_IO_URL = 'https://state-io.zeit.co'
export const API_LOG_IO_URL = 'https://log-io.zeit.co'
export const API_EVENT_REACTION_IO = 'https://event-reaction-io.zeit.co'
