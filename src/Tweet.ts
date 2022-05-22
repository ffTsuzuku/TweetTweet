export class Tweet implements TweetData {
    readonly id
    readonly author
    readonly text
    readonly timestamp

    constructor(id: number, author: string, text: string, timestamp: string) {
        this.id = id
        this.author = author
        this.text = text
        this.timestamp = new Date(timestamp)
    }

    public toString(): string {
        return `(${this.id} ${this.timestamp.toISOString} ${this.author} ${this.text})`
    }

    public equals(tweet: TweetData): boolean {
        return this.id === tweet.id
    }

    public hashCode(): number {
        const bitsInInt = 32
        const lower32bits = this.id
        const upper32bits = this.id >> bitsInInt
        return lower32bits ^ upper32bits
    }
}
