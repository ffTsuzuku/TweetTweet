import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
import Extractor from '../Extract'
import Tweet from '../Tweet'

Date.prototype.toTemporalInstant = toTemporalInstant

const d1 = Temporal.Instant.from('2016-02-17T10:00:00Z')
const d2 = Temporal.Instant.from('2016-02-17T11:00:00Z')

const tweet1 = new Tweet(
    1,
    'alyssa',
    'is it reasonable to talk about rivest so much?',
    d1
)

const tweet2 = new Tweet(2, 'bbitdiddle', 'rivest talk in 30 minutes #hype', d2)

test('getTimespanTwoTweets', () => {
    const timespan = Extractor.getTimespan([tweet1, tweet2])

    expect(d1.equals(timespan.start) && d2.equals(timespan.end)).toBe(true)
})

test('testGetMentionedUsersNoMention', () => {
    let mentionedUsers: Set<string> = Extractor.getMentionedUsers([tweet1])
    expect(mentionedUsers.size).toBe(0)
})
