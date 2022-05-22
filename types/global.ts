import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
interface Date {
    toTemporalInstant: (date: Date) => Temporal.Instant
}
