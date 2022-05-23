import { Temporal } from '@js-temporal/polyfill'
export default class Tweet implements TweetInterface {
    readonly id
    readonly author
    readonly text
    readonly timestamp

    constructor(
        id: number,
        author: string,
        text: string,
        timestamp: Temporal.Instant
    ) {
        this.id = id
        this.author = author
        this.text = text
        this.timestamp = timestamp
    }

    public toString(): string {
        const dateTime = this.timestamp.toString()
        return `(${this.id} ${dateTime} ${this.author} ${this.text})`
    }

    public equals(tweet: TweetInterface): boolean {
        return this.id === tweet.id
    }

    public hashCode(): number {
        const bitsInInt = 32
        const lower32bits = this.id
        const upper32bits = this.id >> bitsInInt
        return lower32bits ^ upper32bits
    }
}
