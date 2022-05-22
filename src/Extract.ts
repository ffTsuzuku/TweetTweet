/**
 * Extract consists of methods that extract information from a list of tweets.
 *
 * DO NOT change the method signatures and specifications of these methods, but
 * you should implement their method bodies, and you may add new public or
 * private methods or classes if you like.
 */
export default class Extractor {
    /**
     * Get the time period spanned by tweets.
     * @param tweets : List of tweets with distinct ids.
     * @return: a minimum-length time interval that contains the timestamp of
     * every tweet in the list.
     */
    static getTimespan(tweets: TweetInterface[]): TimespanInterface {
        throw Error('Implement me!')
    }

    /**
     * Get usernames mentioned in a list of tweets.
     * @param tweets: list of tweets with distinct ids.
     * @return : The set of usernames who are mentioned in the text of tweets.
     * A username-mention is "@" followed by a Twitter username
     * (as defined by Tweet.getAuthor()'s spec)
     * The username-mention cannot be immediately preceded or followed by any
     * character valid in a Twitter username.
     * For this reason an email address like bitdiddle@mit.edu does NOT
     * contain a mention of the username mit.
     * Twitter usernames are case-insensitive, and the returned set may include
     * a username as most once.
     */
    static getMentionedUsers(
        tweets: TweetInterface[]
    ): Set<TweetInterface['author']> {
        throw Error('Implement me!')
    }
}
