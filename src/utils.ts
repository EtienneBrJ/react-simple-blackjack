// Les fichiers .tsx sont réservés aux components (ceux qui contiennent des JSX.Element). Ce fichiers doit avoir une extension .ts

// Les noms qui commencent par "get" sont résesrvés au getters (function qui retourne une valeur). Du coup CardPoints est peut être plus adapté.
export const CardPoints: any = {
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

const MAX_POINT_NUMBER = 21;

export const generateDeck = (): string[] => {
    // J'ai supprimé la variable values et je me suis basé sur les clés de CardPoints. Comme ça, si jamais tu ajoutes une entrées dans CardPoints, ca va se retrouver direct dans le deck
    const suits = ['H', 'S', 'D', 'C'];
    
    // il est généralement plus simple d'utiliser des methodes comme reduce ou map. Les boucles `for` nuisent à la lisibilité
    return Object.keys(CardPoints).reduce((acc, value) => {
        return [
            ...acc,
            ...suits.map((suit) => `${value}${suit}`),
        ]
    }, [] as string[]);
}

export const calculateScore = (cards: string[]): number => {
    const totalAces = cards.filter((card) => card.startsWith('A'));
    // On évite généralement le let, car on ne sait pas ou exactement il sera modifié
    const aceUsed = [];

    return cards.reduce((acc, card) => {
        const score = acc + CardPoints[card[0]];

        // J'ai ajouté une variable MAX_POINT_NUMBER pour éviter les `magical numbers`
        if(score > MAX_POINT_NUMBER && aceUsed.length < totalAces.length) {
            aceUsed.push(card);
            return score - 10;
        }

        return score;

    }, 0);
}
 