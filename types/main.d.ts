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
    readonly timestamp: Date

    get id(): number
    get author(): string
    get text(): string
    get timestamp(): Date

    public toString(): string
    public equals(tweet: TweetData): boolean
    public hashCode(): number
}
/**
 * Immutable datatype representing an internal starting from one datra/time and
 * ending at a no earlier date/time. The interval includes the endpoints.
 * @param start: Starting date/time
 * @param end: Ending date/time
 * @method getStart: Returns a copy of start
 * @method getEnd: Returns a copy of end
 * @method toString: Returns a string representation of the timespan.
 * @method equals: Determines if two timespans are equals to each other.
 * @method hashCode:
 */
declare interface TimespanInterface {
    readonly start: Instant
    readonly end: Instant

    get start(): string
    get end(): string
    toString(): string
    equals(): boolean
    hashCode(): number
}

interface Date {
    toTemporalInstant(date: Date): Instant
}

declare interface Instant extends number {}
