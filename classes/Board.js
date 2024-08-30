export default class Board {
    constructor() {
       
        // A slighly more complex way of generating the board
        // - more flexible since we can change
        // how many rows and columns easily
        this.matrix = [...new Array(6)].map(row =>
            [...new Array(7)].map(column => ' ')
        );
        // currentPlayer, whose turn is it?
        this.currentPlayerColor = 'X';
        // status of game (updated after each move)
        this.winner = false;
        this.isADraw = false;
        this.gameOver = false;
    }

    // render = output/draw something
    render() {
        // A basic way of showing the board
        // console.table(this.matrix);
        // A more customized board with our own 
        // characters for row and column separation
        let line = '\n' + '-'.repeat(29) + '\n';
        console.log(
            line +
            this.matrix.map(row =>
                row.map(column => `| ${column} `).join('')
                + '|').join(line) +
            line
        );
    }

            makeMove(color, column) {
            // Don't make any move if the game is over
            if (this.gameOver) { return false; }
        
            // Check that the color is X or O - otherwise don't make the move
            if (color !== 'X' && color !== 'O') { return false; }
        
            // Check that the color matches the player's turn - otherwise don't make the move
            if (color !== this.currentPlayerColor) { return false; }
        
            // Check that the column is a number - otherwise don't make the move
            if (isNaN(column)) { return false; }
        
            // Check that the column is within bounds
            if (column < 0 || column >= this.matrix[0].length) { return false; }
        
            // Find the lowest available row in the chosen column
            let row;
            for (row = this.matrix.length - 1; row >= 0; row--) {
                if (this.matrix[row][column] === ' ') {
                    break;
                }
            }
        
            // If the column is full (no available row), return false
            if (row < 0) { return false; }
        
            // Place the piece in the lowest available row
            this.matrix[row][column] = color;
        
            // Change the current player color
            this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
        
            // Check if someone has won or if it's a draw/tie and update properties
            this.winner = this.winCheck();
            this.isADraw = this.drawCheck();
        
            // The game is over if someone has won or if it's a draw
            this.gameOver = this.winner || this.isADraw;
        
            // Return true if the move could be made
            return true;
        }
        

        winCheck() {
            let m = this.matrix;
            let rows = m.length;
            let cols = m[0].length;
        
            // Check horizontal wins
            //Horizontal Wins: Loop through each row and check if there are four consecutive same-colored pieces horizontally.
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c <= cols - 4; c++) {
                    let color = m[r][c];
                    if (color !== ' ' && 
                        color === m[r][c + 1] && 
                        color === m[r][c + 2] && 
                        color === m[r][c + 3]) {
                        return color;
                    }
                }
            }
        
            // Check vertical wins
            for (let r = 0; r <= rows - 4; r++) {
                for (let c = 0; c < cols; c++) {
                    let color = m[r][c];
                    if (color !== ' ' && 
                        color === m[r + 1][c] && 
                        color === m[r + 2][c] && 
                        color === m[r + 3][c]) {
                        return color;
                    }
                }
            }
        
            // Check diagonal (bottom-left to top-right) wins
            //Diagonal Wins (Bottom-Left to Top-Right): Check diagonals that go from the bottom-left to the top-right.
            // This requires the row and column indices to increment together.
            //----
            //To check for a diagonal win from the bottom-left to the top-right, start from each piece near the bottom-left 
            //of the board and see if four consecutive pieces diagonally up and to the right are the same color.
            for (let r = 0; r <= rows - 4; r++) {
                for (let c = 0; c <= cols - 4; c++) {
                    let color = m[r][c];
                    if (color !== ' ' && 
                        color === m[r + 1][c + 1] && 
                        color === m[r + 2][c + 2] && 
                        color === m[r + 3][c + 3]) {
                        return color;
                    }
                }
            }
        
            // Check diagonal (top-left to bottom-right) wins
            for (let r = 3; r < rows; r++) {
                for (let c = 0; c <= cols - 4; c++) {
                    let color = m[r][c];
                    if (color !== ' ' && 
                        color === m[r - 1][c + 1] && 
                        color === m[r - 2][c + 2] && 
                        color === m[r - 3][c + 3]) {
                        return color;
                    }
                }
            }
        
            return false;
        }
        

    // check for a draw/tie
    drawCheck() {
        // if no one has won and no empty positions then it's a draw
        return !this.winCheck() && !this.matrix.flat().includes(' ');
    }

}

