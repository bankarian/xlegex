import React from 'react'

export const useGameInitialize = () => {
    const [nodes, useNodes] = React.useState<CardNode[]>([])

    // TODO: impl
    const initialize = (config: GameConfig): CardNode[] => {
        const {levelCount, nodeCount} = config
        return nodes
    }

    return {
        initialize
    }
}