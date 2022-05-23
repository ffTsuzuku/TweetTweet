/**
 * Represents a Tweet
 * @param id: Unique id of a tweet
 * @param author: The author of the tweet
 * @param text: The contents of the tweet
 * @param timestamp: When the tweet was published.
 * @method toString: represents the tweets data in a string
 * @method equals: checks to see if two tweets are the same
 * @method hasCode:
 */
declare interface TweetInterface {
    readonly id: number
    readonly author: string
    readonly text: string
    readonly timestamp: Instant

    get id(): number
    get author(): string
    get text(): string
    get timestamp(): Date

    public toString(): string
    public equals(tweet: TweetData): boolean
    public hashCode(): number
}

declare interface Date {
    toTemporalInstant(date: Date): Instant
}
