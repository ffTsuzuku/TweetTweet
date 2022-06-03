import axios from 'axios'
import Tweet from './Tweet'
import Extractor from './Extract'
import SocialNetwork from './SocialNetwork'

import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill'
Date.prototype.toTemporalInstant = toTemporalInstant

interface apiResponse {
    created_at: string
    id: number
    text: string
    'user.screen_name': string
}
class Main {
    /**
     * URL of a server that produces a list of tweets sampled from Twitter
     * within the last hour. This server may take up to a minute to respond, if
     * it has to refresh its cached sample of tweets.
     */
    public static tweetAPI =
        'http://courses.csail.mit.edu/6.005/ps1_tweets/tweetPoll.py'

    public static async main(): Promise<void> {
        const tweets: Tweet[] = []
        // this logic replaces the entire TweetReader class to reduce bloat.
        try {
            const response = await axios(this.tweetAPI)
            const responseJSON = response.data as apiResponse[]
            const data: Tweet[] = responseJSON.map((tweet): Tweet => {
                const {
                    id,
                    text,
                    'user.screen_name': author,
                    created_at: timestamp
                } = tweet

                const [_, month, day, time, offset, year] = timestamp.split(' ')
                const [hour, minute, second] = time.split(':')

                const instant = Temporal.ZonedDateTime.from({
                    year: Number(year),
                    day: Number(day),
                    month: Number(month),
                    hour: Number(hour),
                    minute: Number(minute),
                    second: Number(second),
                    timeZone: offset
                }).toInstant()
                return new Tweet(id, text, author, instant)
            })
            for (const tweet of data) {
                tweets.push(tweet)
            }
        } catch (e) {
            console.error(e)
        }

        console.log('Tweet example', tweets[0].toString())
        console.log(`Fetched ${tweets.length} tweets`)

        const span = Extractor.getTimespan(tweets)
        console.log(`Ranging from ${span.start} to ${span.end}`)

        const mentionedUsers: Set<string> = Extractor.getMentionedUsers(tweets)
        console.log(`Covers ${mentionedUsers.size} Twitter users`)

        const followsGraph = SocialNetwork.guessFollowsGraph(tweets)
        console.log(`Follows graph has ${followsGraph.size} nodes`)

        const count = 10
        const influencers = SocialNetwork.influencers(followsGraph)
        for (const username of influencers.slice(
            0,
            Math.min(count, influencers.length)
        )) {
            console.log(username)
        }
    }
}

Main.main([])
