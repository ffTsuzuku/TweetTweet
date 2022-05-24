import { Temporal } from '@js-temporal/polyfill'
import Filter from '../Filter'
import Tweet from '../Tweet'
import Timespan from '../Timespan'

const d1 = Temporal.Instant.from('2016-02-17T10:00:00Z')
const d2 = Temporal.Instant.from('2016-02-17T11:00:00Z')

const tweet1 = new Tweet(
    1,
    'alyssa',
    'is it reasonable to talk about rivest so much?',
    d1
)
const tweet2 = new Tweet(2, 'bbitdiddle', 'rivest talk in 30 minutes #hype', d2)

test('testWrittenByMultipleSingleResult', () => {
    const writtenBy = Filter.writtenBy([tweet1, tweet2], 'alyssa')
    // expected singleton list
    expect(writtenBy.length).toBe(1)
    expect(writtenBy[0]).toEqual(tweet1)
})

test('testTimespanMultipleTweetsMultipleResults', () => {
    const testStart = Temporal.Instant.from('2016-02-17T09:00:00Z')
    const testEnd = Temporal.Instant.from('2016-02-17T12:00:00Z')

    const inTimespan = Filter.inTimespan(
        [tweet1, tweet2],
        new Timespan(testStart, testEnd)
    )

    expect(inTimespan.length).toBeGreaterThan(0)
    expect(inTimespan.indexOf(tweet1)).toBe(0)
    expect(inTimespan.indexOf(tweet2)).toBe(1)
})

test('testContaining', () => {
    const containing = Filter.containing([tweet1, tweet2], ['talk'])

    expect(containing.length).toBeGreaterThan(0)
    expect(containing.indexOf(tweet1)).toBe(0)
    expect(containing.indexOf(tweet2)).toBe(1)
})
