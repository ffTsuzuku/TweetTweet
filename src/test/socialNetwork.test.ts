import { Temporal, toTemporalInstant } from '@js-temporal/polyfill'
import SocialNetwork from '../SocialNetwork'
import Tweet from '../Tweet'

const d1 = Temporal.Instant.from('2016-02-17T10:00:00Z')
const tweet1 = new Tweet(
    1,
    'alyssa',
    'is it reasonable to talk about rivest so much @mark?',
    d1
)

test('testGuessFollowsGraphEmpty', () => {
    const followsGraph = SocialNetwork.guessFollowsGraph([])

    expect(followsGraph.size).toBe(0)
})

test('multipleMentionsMultipleTweets', () => {
    const followsGraph = SocialNetwork.guessFollowsGraph([tweet1, tweet1])
    expect(followsGraph.get(tweet1.author)?.size).toBe(1)
})

test('testInfluencersEmpty', () => {
    const followsGraph = new Map<string, Set<string>>()
    const influencers = SocialNetwork.influencers(followsGraph)

    expect(influencers.length).toBe(0)
})
