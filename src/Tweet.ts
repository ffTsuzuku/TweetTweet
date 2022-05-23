import { Temporal } from '@js-temporal/polyfill'
export default class Tweet implements TweetInterface {
    readonly id
    readonly author
    readonly text
    readonly timestamp

    constructor(id: number, author: string, text: string, timestamp: string) {
        this.id = id
        this.author = author
        this.text = text

        const [_, month, day, time, offset, year] = timestamp.split(' ')
        const [hour, minute, second] = time.split(':')

        this.timestamp = Temporal.ZonedDateTime.from({
            year: Number(year),
            day: Number(day),
            month: Number(month),
            hour: Number(hour),
            minute: Number(minute),
            second: Number(second),
            timeZone: offset,
        }).toInstant()
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
