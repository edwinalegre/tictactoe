angular
    .module('ticApp')
    .controller('TicController', TicController);

    TicController.$inject = ['$firebase'];

    function TicController($firebase) {

        // Inject Functions
        theController = this;
        this.boxesList = getTic();
        this.start = start;
        this.onclick = onclick;
        // var ticObj = $firebase(new Firebase('https://haon.firebaseio.com/tic/squares')).$asObject();
        var ticObj = $firebase(new Firebase('https://haon.firebaseio.com/tic/game')).$asObject();

        console.log(ticObj.$id[0]);

        function getTic() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/squares');
            var tic = $firebase(ref).$asObject();
            return tic;
        };

        // test();
        // function test(){
        //     //ticObj
        //     theController.boxesList.squares = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        //     theController.boxesList.players = [{name: 'fred', wins: 0, loses: 1},{name: 'ed', wins: 2, loses: 3}];
        //     theController.boxesList.$save();
        // }

        // Sets initial variables
        var turn = 'O';
        var game = 'stop';
        var p1scoreWin = 0;
        var p1scoreLose = 0;
        var p1scoreTie = 0;
        this.startButton = 'Start';

        // Start and Restart game
        function start(i){

            this.boxesList[0] = ' ';
            this.boxesList[1] = ' ';
            this.boxesList[2] = ' ';
            this.boxesList[3] = ' ';
            this.boxesList[4] = ' ';
            this.boxesList[5] = ' ';
            this.boxesList[6] = ' ';
            this.boxesList[7] = ' ';
            this.boxesList[8] = ' ';
            this.boxesList.$save();

            game = 'start';
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

            if(this.boxesList[i] == ' ' && game == 'start'){
                console.log('hi')
                if(turn == 'X'){
                    this.boxesList[i] = 'X';
                    this.boxesList.$save();
                    turn = 'O';
                }else{
                    this.boxesList[i] = 'O';
                    this.boxesList.$save();
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
                if ( this.boxesList[0] == 'X' && this.boxesList[1] == 'X' && this.boxesList[2] == 'X' ){
                    score('X');
                    console.log('hi')
                };
                if ( this.boxesList[3] == 'X' && this.boxesList[4] == 'X' && this.boxesList[5] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[6] == 'X' && this.boxesList[7] == 'X' && this.boxesList[8] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[0] == 'X' && this.boxesList[3] == 'X' && this.boxesList[6] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[1] == 'X' && this.boxesList[4] == 'X' && this.boxesList[7] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[2] == 'X' && this.boxesList[5] == 'X' && this.boxesList[8] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[0] == 'X' && this.boxesList[4] == 'X' && this.boxesList[8] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[2] == 'X' && this.boxesList[4] == 'X' && this.boxesList[6] == 'X' ){
                    score('X');
                };
                if ( this.boxesList[0] == 'O' && this.boxesList[1] == 'O' && this.boxesList[2] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[3] == 'O' && this.boxesList[4] == 'O' && this.boxesList[5] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[6] == 'O' && this.boxesList[7] == 'O' && this.boxesList[8] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[0] == 'O' && this.boxesList[3] == 'O' && this.boxesList[6] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[1] == 'O' && this.boxesList[4] == 'O' && this.boxesList[7] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[2] == 'O' && this.boxesList[5] == 'O' && this.boxesList[8] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[0] == 'O' && this.boxesList[4] == 'O' && this.boxesList[8] == 'O' ){
                    score('O');
                };
                if ( this.boxesList[2] == 'O' && this.boxesList[4] == 'O' && this.boxesList[6] == 'O' ){
                    score('O');
                };

                // Tie game
                if ( this.boxesList[0] != ' ' && this.boxesList[1] != ' ' && this.boxesList[2] != ' ' &&
                     this.boxesList[3] != ' ' && this.boxesList[4] != ' ' && this.boxesList[5] != ' ' &&
                     this.boxesList[6] != ' ' && this.boxesList[7] != ' ' && this.boxesList[8] != ' ' && game != 'stop'){
                    
                    this.startButton = 'Play Again';
                    this.status = 'TIE!!!';
                    p1scoreTie++;
                    this.p1scoreTie = p1scoreTie;
                    game = 'stop';
                    turn == 'X' ? turn = 'O' : turn = 'X';
                };
            };
        };
    };