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