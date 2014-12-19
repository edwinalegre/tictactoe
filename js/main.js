
// Sets initial variables
var turn = 'O';
var game = '';
var p1scoreWin = 0;
var p1scoreLose = 0;
var p1scoreTie = 0;
$scope.startButton = 'Start';

// Start and Restart game
$scope.start = function(){
        game = '';
        $scope.boxes = [
                {box: ''},{box: ''},{box: ''},
                {box: ''},{box: ''},{box: ''},
                {box: ''},{box: ''},{box: ''}
            ]; 
        if(turn == 'X'){
            turn = 'O';
            $scope.status = 'Player O Starts';
        }else{
            turn = 'X';
            $scope.status = 'Player X Starts';
        };
    };

// Players choices
$scope.onclick = function(){
    if(this.row.box == '' && game == ''){
        if(turn == 'X'){
            this.row.box = 'X';
            turn = 'O';
        }else{
            this.row.box = 'O';
            turn = 'X';
        };

        // Stops current game and displays game status
        $scope.score = function(i){
            if (i == 'X'){
                p1scoreWin++;
                $scope.p1scoreWin = p1scoreWin;
            }else{
                p1scoreLose++;
                $scope.p1scoreLose = p1scoreLose;
            }
            $scope.startButton = 'Play Again';
            $scope.status = i + ' is the winner!!!';
            game = 'stop';
            turn = i;
        };

        // Game comparison of X's and O's on the board to determine the winner and losers
        if ( $scope.boxes[0].box == 'X' && $scope.boxes[1].box == 'X' && $scope.boxes[2].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[3].box == 'X' && $scope.boxes[4].box == 'X' && $scope.boxes[5].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[6].box == 'X' && $scope.boxes[7].box == 'X' && $scope.boxes[8].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[0].box == 'X' && $scope.boxes[3].box == 'X' && $scope.boxes[6].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[1].box == 'X' && $scope.boxes[4].box == 'X' && $scope.boxes[7].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[2].box == 'X' && $scope.boxes[5].box == 'X' && $scope.boxes[8].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[0].box == 'X' && $scope.boxes[4].box == 'X' && $scope.boxes[8].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[2].box == 'X' && $scope.boxes[4].box == 'X' && $scope.boxes[6].box == 'X' ){
            $scope.score('X');
        };
        if ( $scope.boxes[0].box == 'O' && $scope.boxes[1].box == 'O' && $scope.boxes[2].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[3].box == 'O' && $scope.boxes[4].box == 'O' && $scope.boxes[5].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[6].box == 'O' && $scope.boxes[7].box == 'O' && $scope.boxes[8].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[0].box == 'O' && $scope.boxes[3].box == 'O' && $scope.boxes[6].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[1].box == 'O' && $scope.boxes[4].box == 'O' && $scope.boxes[7].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[2].box == 'O' && $scope.boxes[5].box == 'O' && $scope.boxes[8].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[0].box == 'O' && $scope.boxes[4].box == 'O' && $scope.boxes[8].box == 'O' ){
            $scope.score('O');
        };
        if ( $scope.boxes[2].box == 'O' && $scope.boxes[4].box == 'O' && $scope.boxes[6].box == 'O' ){
            $scope.score('O');
        };

        // Tie game
        if ( $scope.boxes[0].box != '' && $scope.boxes[1].box != '' && $scope.boxes[2].box != '' &&
             $scope.boxes[3].box != '' && $scope.boxes[4].box != '' && $scope.boxes[5].box != '' &&
             $scope.boxes[6].box != '' && $scope.boxes[7].box != '' && $scope.boxes[8].box != '' && game != 'stop'){
            
            $scope.startButton = 'Play Again';
            $scope.status = 'TIE!!!';
            p1scoreTie++;
            $scope.p1scoreTie = p1scoreTie;
            game = 'stop';
            turn == 'X' ? turn = 'O' : turn = 'X';
        };
    };
};