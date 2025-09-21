//logic
//0. create a 2D array to store previous node, and a counter to trace the level of trasversal
//1. start from a node
//2. add this staring node into a queue
//3. explore the first node in the queue
//4. add neighbouring nodes to the queue
//5. for each of these neighbouring nodes, store the value of its previous node in the 2D array
//6.
export default Graph

function Graph() {
    const xAxisLen = 8
    const yAxisLen = 8

    function traverseGraph(startNode, endNode) {
        let prevGrid = Array.from({ length: yAxisLen }, () =>
            Array.from({ length: xAxisLen })
        )

        prevGrid[startNode[1]][startNode[0]] = null
        let queue = []

        queue.push(startNode)

        while (queue.length !== 0) {
            let nextMoves = exploreNextMoves(queue[0])
            for (let i = 0; i < nextMoves.length; i++) {
                let node = nextMoves[i]
                if (node[0] === endNode[0] && node[1] === endNode[1]) {
                    prevGrid[node[1]][node[0]] = queue[0]
                    return prevGrid
                }
                if (prevGrid[node[1]][node[0]] === undefined) {
                    prevGrid[node[1]][node[0]] = queue[0]
                    queue.push(node)
                }
            }
            queue.shift()
        }
    }

    function constructPath(startNode, endNode) {
        let prev = traverseGraph(startNode, endNode)

        let reversedPath = []
        let currentNode = endNode
        while (currentNode !== null) {
            reversedPath.push(currentNode)
            currentNode = prev[currentNode[1]][currentNode[0]]
        }
        let shortestPath = reversedPath.reverse()
        return shortestPath
    }

    function exploreNextMoves(node) {
        const rowVector = [1, -1, 2, -2, 1, -1, 2, -2]
        const colVector = [2, -2, 1, -1, -2, 2, -1, 1]
        let nextMoves = []

        for (let i = 0; i < rowVector.length; i++) {
            let xCoor = node[0] + rowVector[i]
            let yCoor = node[1] + colVector[i]

            if (
                xCoor >= 0 &&
                xCoor < xAxisLen &&
                yCoor >= 0 &&
                yCoor < yAxisLen
            ) {
                nextMoves.push([xCoor, yCoor])
            }
        }
        return nextMoves
    }

    function knightMoves(startNode, endNode) {
        let path = constructPath(startNode, endNode)
        let num = path.length
        console.log(`You made it in ${num - 1} moves! Here's your path:`)
        for (let i = 0; i < num; i++) {
            console.log(`[${path[i][0]},${path[i][1]}]`)
        }
    }

    return {
        knightMoves,
    }
}
