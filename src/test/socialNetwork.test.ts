import SocialNetwork from '../SocialNetwork'

test('testGuessFollowsGraphEmpty', () => {
    const followsGraph: Map<
        string,
        Set<string>
    > = SocialNetwork.guessFollowsGraph([])

    expect(followsGraph.size).toBe(0)
})

test('testInfluencersEmpty', () => {
    const followsGraph = new Map<string, Set<string>>()
    const influencers = SocialNetwork.influencers(followsGraph)

    expect(influencers.length).toBe(0)
})
