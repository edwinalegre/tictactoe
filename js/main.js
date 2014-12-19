var turn = 'O';
var game = '';
$scope.startButton = 'Start';

$scope.start = function(){
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

};