import Extractor from './Extract'
import Tweet from './Tweet'
/**
 * SocialNetwork provides methods that operate on a social network.
 * A social network is represented by a Map, where map[A] is the set of people
 * that person A follows on Twitter, and all people are represented by their
 * Twitter usernames. Users can't follow themselves. If A doesn't follow anybody
 * then map[A] may be an empty set, or A might not even exist as a key in the map;
 * this is true even if A is followed by other people in the network. Twitter
 * usernames are not case sensitive. A username should appear at most once as a
 * key in the map or in any given map[A] set.
 */
export default class SocialNetwork {
    /**
     * Guess who might follow whom, from evidence found in tweets
     * @param tweets: A list of tweets not modified by this method.
     * @return a social network (defined above) in which Ernie follows Bert if
     * and only if there is evidence for it in the given list of tweets. One
     * kind of evidence that Ernie follows bert is if Ernie @-mentions  Bert
     * in a tweet. This must be implemented. Other kinds of evidence may be used
     * at the implementors discretion.
     * All the Twitter usernames in the returned social network must be either
     * authors or @-mentions in the list of tweets.
     */
    static guessFollowsGraph(tweets: Tweet[]): Map<string, Set<string>> {
        const graph = new Map<string, Set<string>>()
        for (const tweet of tweets) {
            const { author } = tweet
            const following = graph.get(author) ?? []
            const mentions = Extractor.getMentionedUsers([tweet])

            graph.set(author, new Set<string>([...mentions, ...following]))
        }
        return graph
    }

    /**
     * Find the people in a social network who have the greatest influence, in
     * the sense that they have the most followers.
     * @param followsGraph a social network (as defined above)
     * @return a list of all distinct Twitter usernames in followsGraph, in
     * descending order of follower count.
     */
    static influencers(followsGraph: Map<string, Set<string>>): string[] {
        const rankings: { name: string; followers: number }[] = []
        const followCount = new Map<string, number>()

        followsGraph.forEach((followList) => {
            for (const user of followList) {
                const name = user.replace('@', '')
                if (followCount.has(name)) {
                    followCount.set(name, (followCount.get(name) ?? 0) + 1)
                    continue
                }
                followCount.set(name, 1)
            }
        })

        const usernameList = followCount.keys()
        let username = usernameList.next()
        while (!username.done) {
            const userFollowerCount = followCount.get(username.value) ?? 0
            for (let i = 0; i < rankings.length; i++) {
                const ranking = rankings[i]
                if (ranking.followers < userFollowerCount) {
                    rankings.splice(i, 0, {
                        name: username.value,
                        followers: userFollowerCount
                    })

                    break
                } else if (i === rankings.length - 1) {
                    rankings.push({
                        name: username.value,
                        followers: userFollowerCount
                    })

                    break
                }
            }

            if (!rankings.length) {
                rankings.push({
                    name: username.value,
                    followers: userFollowerCount
                })
            }
            username = usernameList.next()
        }

        return rankings.map((ranking) => ranking.name)
    }
}
