export const getScore: any = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
    'A': 11,
}

export const generateDeck = (): string[] => {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    const suits = ['H', 'S', 'D', 'C']
    const _deck = []
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            _deck.push(values[j].concat(suits[i]))
        }
    }
    return _deck
}

export const calculateScore = (cards: string[]): number => {
    let _score: number = 0;
    let _aceCount: number = 0;


    for (let i = 0; i < cards.length; i++) {
        if (cards[i][0] === 'A') {
            _aceCount++;
        }
        _score += getScore[cards[i][0]]
        while (_score > 21 && _aceCount > 0) {
            _score -= 10;
            _aceCount--;
        }
    }
    return _score
}
