/**
 * Filter consists of methods that filter a list of tweets for those matching a
 * condition.
 *
 * DO NOT change the method signatures and specifications of these methods, but
 * you should implement their method bodies, and you may add new public or
 * private methods or classes if you like.
 */
export default class Filter {
    static writtenBy(
        tweets: TweetInterface[],
        username: string
    ): TweetInterface[] {
        throw Error('Implement me!')
    }

    static inTimespan(
        tweets: TweetInterface[],
        timespan: TimespanInterface
    ): TweetInterface[] {
        throw Error('Implement me!')
    }
}
