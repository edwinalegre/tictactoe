angular
    .module('ticApp')
    .controller('TicController', TicController);

    TicController.$inject = ['$firebase'];

    function TicController($firebase) {

        // Inject Functions
        theController = this;
        this.boxes = getTic();
        this.start = start;
        this.onclick = onclick;

        function getTic() {
            var ref = new Firebase('https://haon.firebaseio.com/tic');
            var tic = $firebase(ref).$asObject();
            return tic;
        };

        // Sets initial variables
        var turn = 'O';
        var game = '';
        var p1scoreWin = 0;
        var p1scoreLose = 0;
        var p1scoreTie = 0;
        this.startButton = 'Start';

        // Start and Restart game
        function start(){
            game = '';
            this.boxes = [
                    {box: ''},{box: ''},{box: ''},
                    {box: ''},{box: ''},{box: ''},
                    {box: ''},{box: ''},{box: ''}
                ]; 
            if(turn == 'X'){
                turn = 'O';
                this.status = 'Player O Starts';
            }else{
                turn = 'X';
                this.status = 'Player X Starts';
            };
        };

        // Players choices
        function onclick(i){
            console.log(i);
            if(this.boxes[i].box == '' && game == ''){
                if(turn == 'X'){
                    this.boxes[i].box = 'X';
                    turn = 'O';
                }else{
                    this.boxes[i].box = 'O';
                    turn = 'X';
                };

                // Stops current game and displays game status
                function score(i){
                    if (i == 'X'){
                        p1scoreWin++;
                        theController.p1scoreWin = p1scoreWin;
                    }else{
                        p1scoreLose++;
                        theController.p1scoreLose = p1scoreLose;
                    }
                    theController.startButton = 'Play Again';
                    theController.status = i + ' is the winner!!!';
                    game = 'stop';
                    turn = i;
                };

                // Game comparison of X's and O's on the board to determine the winner and losers
                if ( theController.boxes[0].box == 'X' && theController.boxes[1].box == 'X' && theController.boxes[2].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[3].box == 'X' && theController.boxes[4].box == 'X' && theController.boxes[5].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[6].box == 'X' && theController.boxes[7].box == 'X' && theController.boxes[8].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[0].box == 'X' && theController.boxes[3].box == 'X' && theController.boxes[6].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[1].box == 'X' && theController.boxes[4].box == 'X' && theController.boxes[7].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[2].box == 'X' && theController.boxes[5].box == 'X' && theController.boxes[8].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[0].box == 'X' && theController.boxes[4].box == 'X' && theController.boxes[8].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[2].box == 'X' && theController.boxes[4].box == 'X' && theController.boxes[6].box == 'X' ){
                    score('X');
                };
                if ( theController.boxes[0].box == 'O' && theController.boxes[1].box == 'O' && theController.boxes[2].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[3].box == 'O' && theController.boxes[4].box == 'O' && theController.boxes[5].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[6].box == 'O' && theController.boxes[7].box == 'O' && theController.boxes[8].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[0].box == 'O' && theController.boxes[3].box == 'O' && theController.boxes[6].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[1].box == 'O' && theController.boxes[4].box == 'O' && theController.boxes[7].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[2].box == 'O' && theController.boxes[5].box == 'O' && theController.boxes[8].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[0].box == 'O' && theController.boxes[4].box == 'O' && theController.boxes[8].box == 'O' ){
                    score('O');
                };
                if ( theController.boxes[2].box == 'O' && theController.boxes[4].box == 'O' && theController.boxes[6].box == 'O' ){
                    score('O');
                };

                // Tie game
                if ( theController.boxes[0].box != '' && theController.boxes[1].box != '' && theController.boxes[2].box != '' &&
                     theController.boxes[3].box != '' && theController.boxes[4].box != '' && theController.boxes[5].box != '' &&
                     theController.boxes[6].box != '' && theController.boxes[7].box != '' && theController.boxes[8].box != '' && game != 'stop'){
                    
                    theController.startButton = 'Play Again';
                    theController.status = 'TIE!!!';
                    p1scoreTie++;
                    theController.p1scoreTie = p1scoreTie;
                    game = 'stop';
                    turn == 'X' ? turn = 'O' : turn = 'X';
                };

            };
        };

    };