import axios from 'axios'
import Tweet from './Tweet'
import Extractor from './Extract'

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

    public static async main(args: String[]): Promise<void> {
        const tweets: Tweet[] = []
        try {
            const response = await axios(this.tweetAPI)
            const responseJSON = response.data as apiResponse[]
            const data: Tweet[] = responseJSON.map((tweet): Tweet => {
                const {
                    id,
                    text,
                    'user.screen_name': author,
                    created_at: timestamp,
                } = tweet

                return new Tweet(id, text, author, timestamp)
            })
            for (const tweet of data) {
                tweets.push(tweet)
            }
        } catch (e) {
            console.error(e)
        }

        console.log(`Fetched ${tweets.length} tweets`)
        const span = Extractor.getTimespan(tweets)
        console.log(`ranging from ${span.start} to ${span.end}`)
    }
}

Main.main([])
