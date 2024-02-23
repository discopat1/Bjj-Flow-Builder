const dataSet = {
    positions: [
        'Side control 1',
        'Side control 2',
        'Side control 3',
        'Crucifix',
        'Knee on belly',
        'Mount 1',
        'Mount 2',
        'S-Mount',
        'Rear mount',
        'Turtle',
        'X-guard',
        'Single leg x',
        'Closed guard',
        'Butterfly guard',
        'De la riva',
        'Half-guard',
        'Arm Saddle',
        '50/50',
        'DOA',
        '411',
        'Butterfly Ashi',
        'Backside 50/50',
        'Reverse Ashi'
    ],
    positionalSituations: [
        'scramble',
        'escape',
        'transition'
    ],
    technicalSituations: [
        'attacking',
        'defending',
    ],
    techniques: [
        'Arm bar',
        [
            'Arm triangle',
            'Darce',
            'Anaconda'
        ],
        'Americana',
        'Rear Naked Choke',
        'Lapel Choke',
        'Guillotine',
        'Kimura',
        'Leg Lock',
        'Twister',
        [
            'front triangle',
            'rear triangle',
            'wrong side triangle',
            'reverse triangle',
            'side triangle'
        ],
    ],
    bodyMovements: {
        standing: [
            'sprawl',
            'toreando',
            'shot',
            'swing single',
            'down block',
            'duck under'
        ],
        supine: [
            'leg pummel',
            'bridge',
            'bridge and roll',
            'shrimp',
            'forward shrimp',
            'leg scissor',
            'back heist',
            'sit up',
            'pendulum',
            'pancake roll',
            'hip up triangle'
        ],
        seated: [
            'forward scoot',
            'backwards scoot',
            'granby roll',
            'hip heist',
            'leg pummel',
            'backward roll'
        ],
        turtle: [
            'forward roll',
            'sitout',
            'inside leg standup',
            'sit back'
        ]
    }
        
    
}

const randomPick = (arr) => {
    const pick = arr[Math.floor(Math.random()*arr.length)]
    return Array.isArray(pick) ? pick[Math.floor(Math.random()*pick.length)] : pick 
}

const combinations = {
    positionalCombos: () => {
        const positionalSituation1 = randomPick(dataSet.positionalSituations)
        const position1 = randomPick(dataSet.positions)
        const position2 = randomPick(dataSet.positions)
        const postitonalSituations = {
            'scramble': `${positionalSituation1} to ${position1}`,
            'escape': `${positionalSituation1} from ${position1} to ${position2}`,
            'transition': `${positionalSituation1} from ${position1} to ${position2}`
        }
        return postitonalSituations[positionalSituation1]
    },
    techniqueCombos: () => {
        const technicalSituation = randomPick(dataSet.technicalSituations)
        const technique = randomPick(dataSet.techniques)
        return `${technicalSituation} ${technique}` 
    },
    bodyCombos: () => {
        const standing = randomPick(dataSet.bodyMovements.standing)
        const supine = randomPick(dataSet.bodyMovements.supine)
        const seated = randomPick(dataSet.bodyMovements.seated)
        const turtle = randomPick(dataSet.bodyMovements.turtle)
        return {
            standing,
            supine,
            seated,
            turtle
        }
    }
}


export default combinations