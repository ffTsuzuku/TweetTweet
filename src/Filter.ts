import Timespan from './Timespan'
import Tweet from './Tweet'
/**
 * Filter consists of methods that filter a list of tweets for those matching a
 * condition.
 *
 * DO NOT change the method signatures and specifications of these methods, but
 * you should implement their method bodies, and you may add new public or
 * private methods or classes if you like.
 */
export default class Filter {
    /**
     * Find tweets written by a particular user.
     * @param tweets a list of tweets with distinct ids, not modified by this method.
     * @param username Twitter username, required to be a valid Twitter username as
     * defined by Tweet.getAuthor()'s spec.
     * @return all and only the tweets in the list whose author is username,
     * in the same order as in the input list.
     */
    static writtenBy(
        tweets: TweetInterface[],
        username: string
    ): TweetInterface[] {
        throw Error('Implement me!')
    }

    /**
     * Find tweets that were sent during a particular timespan.
     * @param tweets a list of tweets with distinct ids, not modified by this method.
     * @param timespan timespan
     * @return all and only the tweets in the list that were sent during the timespan,
     * in the same order as in the input list.
     */
    static inTimespan(
        tweets: TweetInterface[],
        timespan: Timespan
    ): TweetInterface[] {
        throw Error('Implement me!')
    }

    static containing(tweets: Tweet[], words: string[]): TweetInterface[] {
        throw Error('Implement me!')
    }
}
