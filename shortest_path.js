/**
 * Created By: Rativardhan Singh Sengar
 * email: rativardhan@gmail.com
 *
 */


// Variable Declaration;
var allObstacle2DMatrix = []; // All Possible path in 2D Matrix Form
var duplicateVirtualPath = []; // A virtual 2D matrix path to find the shortest path

var allObstacleXY = []; // A coordinates XY path collections  for all possible obstacle Path
var currentObstacleXY = []; // Current obstacle path XY coordinates

var shortestPathLength = '';  // shortest path length
var shortestXY = []; // Shortest path coordinates

/**
 * Function to find the shortest path, All X, Y Coordinates
 * @param x
 * @param y
 * @param inputMatrix
 */
function shortestPathLengthProcess(x,y,inputMatrix)
{
    // Assign 0 for all X, Y coordinates of virtual 2D Matrix
    for(var i in inputMatrix)
    {
        var temp = [];
        for(var j in inputMatrix[i])
        {
            temp.push(0);
        }
        duplicateVirtualPath.push(temp);
    }

    shortestObstaclePath(x,y,inputMatrix)
    shortestPath(allObstacleXY);
}

/**
 * Recursive function using backtracking to find shortest path coordinates and related information.
 * @param x
 * @param y
 * @param inputMatrix
 * @returns {boolean}
 */
function shortestObstaclePath(x,y,inputMatrix)
{
    // Check if Value is not 1 and 0 and it is an obstacle, Store result in all solution array
   if(inputMatrix[x][y] !== 1 && inputMatrix[x][y] !== 0)
    {
        // We found obstacle
        // Because Javascript work as Pass by reference and to a
            // Javascript equal to= operator use pass by reference, so we have deep copy all value of an array
        var temp2D = [];
        for(var i in duplicateVirtualPath)
        {
            var temp = [];
            for(var j in duplicateVirtualPath[i])
            {
                temp.push(duplicateVirtualPath[i][j]);
            }
            temp2D.push(temp);
        }

        temp2D[x][y] = inputMatrix[x][y];
        allObstacle2DMatrix.push(temp2D);

        // Because Javascript work as Pass by reference and to a
            // Javascript equal to= operator use pass by reference, so we have deep copy all value of an array
        var tempXY = [];
        for(var i in currentObstacleXY)
        {
            tempXY.push(currentObstacleXY[i]);
        }

        tempXY.push([x,y]);
        allObstacleXY.push(tempXY);
        return true;
    }

    // If we already traverse through this path, avoid the infinite loop of Matrix
    // example : 00,01,10,11 is infinite loop
    // [
    // [1, 1, 0]
    // [1, 1, 0]
    // ]
    if(duplicateVirtualPath[x][y] == 1)
    {
        return false;
    }

    // Store Path coordinates X, Y, And mark Virtual Path 2D Matrix  with 1
    currentObstacleXY.push([x,y]);
    duplicateVirtualPath[x][y] = 1;

    // We can take 4 path; Top, Right, Bottom, Left
    // If you need Directional Path, Please store TOP, RIGHT, Bottom, Left in array
    // console.log('TOP')
    if(x-1 > 0 && typeof inputMatrix[x-1][y] != 'undefined' && inputMatrix[x-1][y] != 0) // TOP
    {
        shortestObstaclePath(x-1,y,inputMatrix)
    }

    //console.log('RIGHT')
    if(y+1 < inputMatrix[x].length  &&  typeof inputMatrix[x][y+1] != 'undefined' && inputMatrix[x][y+1] != 0) // RIGHT
    {
        shortestObstaclePath(x,y+1,inputMatrix)
    }
    //console.log('BOTTOM')

    if(x+1 < inputMatrix.length &&  typeof inputMatrix[x+1][y] != 'undefined' && inputMatrix[x+1][y] != 0) // BOTTOM
    {
        shortestObstaclePath(x+1,y,inputMatrix)
    }
    //console.log('LEFT')
    if(y-1>0 && inputMatrix[x].length > y-1 &&  typeof inputMatrix[x][y-1] != 'undefined'  && inputMatrix[x][y-1] != 0) // LEFT
    {
        shortestObstaclePath(x,y-1,inputMatrix)
    }

    // Backtracking remove remove and replace last info
    currentObstacleXY.pop();
    duplicateVirtualPath[x][y] = 0;
    return true;
}

function shortestPath(allObstacleXY)
{

    for(var i in allObstacleXY)
    {
        if(shortestPathLength == '')
        {
            shortestXY = allObstacleXY[i];
            shortestPathLength = allObstacleXY[i].length;
        }
        else if(shortestPathLength > allObstacleXY[i].length)
        {
            shortestXY = allObstacleXY[i];
            shortestPathLength = allObstacleXY[i].length;
        }
    }
}


console.log(shortestPathLengthProcess(0,0,[[1,0,0],[1,0,0],[1,9,1]]));
console.log(allObstacle2DMatrix)
console.log(allObstacleXY)
console.log(shortestPathLength-1) // Because we are including obstacle start and end both
console.log(shortestXY)

// Re initialise if you want to use all test case one after one
allObstacle2DMatrix = [];
duplicateVirtualPath = [];
allObstacleXY = [];
currentObstacleXY = [];
shortestPathLength =0;
shortestXY = [];

shortestPathLengthProcess(0,0,
    [
        [1,1,1],
        [0,1,1,1],
        [0,1,0,1],
        [1,1,9,1],
        [0,0,1,1,1]
    ])

console.log(allObstacle2DMatrix)
console.log(allObstacleXY)
console.log(shortestPathLength-1)
console.log(shortestXY)