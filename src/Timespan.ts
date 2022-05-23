import { Temporal } from '@js-temporal/polyfill'

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
export default class Timespan {
    private _start: Temporal.Instant
    private _end: Temporal.Instant

    constructor(start: Temporal.Instant, end: Temporal.Instant) {
        if (start.until(end).seconds < 0) {
            throw Error('Start should be < = end')
        }
        this._start = start
        this._end = end
    }

    get start(): Temporal.Instant {
        return this._start
    }

    get end(): Temporal.Instant {
        return this._end
    }

    toString(): string {
        return `[${this.start}...${this.end}]`
    }

    equals(timespan: Timespan): boolean {
        return (
            this._start.equals(timespan._start) &&
            this._end.equals(timespan._end)
        )
    }

    hashCode(): number {
        const bitsInInt = 32
        const prime = 31
        let result = 1
        result = (prime * result + this._start.epochMilliseconds) >> bitsInInt
        result = (prime * result + this._end.epochMilliseconds) >> bitsInInt
        return result
    }
}
