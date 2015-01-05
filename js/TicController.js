angular
    .module('ticApp')

    .filter('reverse', function() {
      return function(input) {
        input = input || '';
        var out = "";
        for (var i = 0; i < input.length; i++) {
          out = input.charAt(i) + out;
        }
        return out;
      };
    })

    .controller('TicController', TicController);

    TicController.$inject = ['$firebase'];

    function TicController($firebase) {

        // Inject Functions
        theController = this;
        this.boxesList = getTic();
        this.chatsList = getChats();
        this.setList = getSettings();
        this.setTeam1 = getTeam1();
        this.setTeam2 = getTeam2();
        this.start = start;
        this.onclick = onclick;
        this.addChat = addChat;

        // this.text = null;

        function getChats() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/chat');
            var chats = $firebase(ref).$asArray();
            return chats;
        };

        function getTic() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/squares');
            var tic = $firebase(ref).$asObject();
            return tic;
        };

        function getSettings() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/game-settings');
            var set = $firebase(ref).$asObject();
            return set;
        };

        function getTeam1() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/team1');
            var team1 = $firebase(ref).$asObject();
            return team1;
        };

        function getTeam2() {
            var ref = new Firebase('https://haon.firebaseio.com/tic/team2');
            var team2 = $firebase(ref).$asObject();
            return team2;
        };

        // Sets initial variables
        var title = 'title';
        var name1 = 'name1';
        var name2 = 'name2';
        var turn = 'turn';
        var game = 'game';
        var status = 'status';
        var p1scoreWin = 'p1scoreWin';
        var p1scoreLose = 'p1scoreLose';
        var p1scoreTie = 'p1scoreTie';
        var startButton = 'startButton';

        if (team == 'X'){
            this.setTeam1[name1] = name;
            this.setTeam1[team] = team;
            this.setTeam1.$save();
        } else if (team == 'O'){
            this.setTeam2[name2] = name;
            this.setTeam2[team] = team;
            this.setTeam2.$save();
        }

        this.setList[title] = 'tic-tac-toe';
        this.setList[team] = team;
        this.setList[status] = ' ';
        this.setList[turn] = 'X';
        this.setList[game] = 'stop';
        this.setList[p1scoreWin] = 0;
        this.setList[p1scoreLose] = 0;
        this.setList[p1scoreTie] = 0;
        this.setList[startButton] = 'Start';
        this.setList.$save();

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

            this.setList[game] = 'start';
            if(this.setList[turn] == 'X'){
                this.setList[turn] = 'O';
                this.setList[status] = 'Waiting on players to click START';
                this.setList.$save();
            }else{
                this.setList[turn] = 'X';
                this.setList[status] = 'Waiting on players to click START';
                this.setList.$save();
            };
        };

        function addChat() {
            if (this.text){
                this.chatsList.$add(
                    {chatText: this.text, chatName: name, chatTeam: team}
                )
                this.text = null;
            }
        };

        // Stops current game and displays game status
        function score(i){
            if (i == 'X'){
                theController.setList[p1scoreWin]++;
                theController.setList[p1scoreWin] = theController.setList[p1scoreWin];
                theController.setList[game] = 'stop';
                theController.setList[startButton] = 'Play Again';
                theController.setList[status] = team + ' is the winner!!!';
                theController.setList.$save();
            }else if (i == 'O'){
                theController.setList[p1scoreLose]++;
                theController.setList[p1scoreLose] = theController.setList[p1scoreLose];
                theController.setList[game] = 'stop';
                theController.setList[startButton] = 'Play Again';
                theController.setList[status] = team + ' is the winner!!!';
                theController.setList.$save();
            }else if (i == 'T'){
                theController.setList[startButton] = 'Play Again';
                theController.setList[status] = 'IT\'S A TIE!!!';
                theController.setList[p1scoreTie]++;
                theController.setList[p1scoreTie] = theController.setList[p1scoreTie];
                theController.setList[game] = 'stop';
                theController.setList[turn] == 'X' ? theController.setList[turn] = 'O' : theController.setList[turn] = 'X';
                theController.setList.$save();
            }
        };

        // Players choices
        function onclick(i){
            if(this.boxesList[i] == ' ' && this.setList[game] == 'start' && this.setList[turn] == team){
                if(this.setList[turn] == 'X'){
                    this.boxesList[i] = 'X';
                    this.boxesList.$save();
                    this.setList[turn] = 'O';
                     this.setList.$save();
                }else{
                    this.boxesList[i] = 'O';
                    this.boxesList.$save();
                    this.setList[turn] = 'X';
                    this.setList.$save();
                };

                // Game comparison of X's and O's on the board to determine the winner and losers
                if ( this.boxesList[0] == 'X' && this.boxesList[1] == 'X' && this.boxesList[2] == 'X' ){score('X')};
                if ( this.boxesList[3] == 'X' && this.boxesList[4] == 'X' && this.boxesList[5] == 'X' ){score('X')};
                if ( this.boxesList[6] == 'X' && this.boxesList[7] == 'X' && this.boxesList[8] == 'X' ){score('X')};
                if ( this.boxesList[0] == 'X' && this.boxesList[3] == 'X' && this.boxesList[6] == 'X' ){score('X')};
                if ( this.boxesList[1] == 'X' && this.boxesList[4] == 'X' && this.boxesList[7] == 'X' ){score('X')};
                if ( this.boxesList[2] == 'X' && this.boxesList[5] == 'X' && this.boxesList[8] == 'X' ){score('X')};
                if ( this.boxesList[0] == 'X' && this.boxesList[4] == 'X' && this.boxesList[8] == 'X' ){score('X')};
                if ( this.boxesList[2] == 'X' && this.boxesList[4] == 'X' && this.boxesList[6] == 'X' ){score('X')};
                if ( this.boxesList[0] == 'O' && this.boxesList[1] == 'O' && this.boxesList[2] == 'O' ){score('O')};
                if ( this.boxesList[3] == 'O' && this.boxesList[4] == 'O' && this.boxesList[5] == 'O' ){score('O')};
                if ( this.boxesList[6] == 'O' && this.boxesList[7] == 'O' && this.boxesList[8] == 'O' ){score('O')};
                if ( this.boxesList[0] == 'O' && this.boxesList[3] == 'O' && this.boxesList[6] == 'O' ){score('O')};
                if ( this.boxesList[1] == 'O' && this.boxesList[4] == 'O' && this.boxesList[7] == 'O' ){score('O')};
                if ( this.boxesList[2] == 'O' && this.boxesList[5] == 'O' && this.boxesList[8] == 'O' ){score('O')};
                if ( this.boxesList[0] == 'O' && this.boxesList[4] == 'O' && this.boxesList[8] == 'O' ){score('O')};
                if ( this.boxesList[2] == 'O' && this.boxesList[4] == 'O' && this.boxesList[6] == 'O' ){score('O')};

                // Tie game
                if ( this.boxesList[0] != ' ' && this.boxesList[1] != ' ' && this.boxesList[2] != ' ' &&
                     this.boxesList[3] != ' ' && this.boxesList[4] != ' ' && this.boxesList[5] != ' ' &&
                     this.boxesList[6] != ' ' && this.boxesList[7] != ' ' && this.boxesList[8] != ' ' && this.setList[game] != 'stop'){score('T')};
            };
        };
    };



        // var ticObj = $firebase(new Firebase('https://haon.firebaseio.com/tic/squares')).$asObject();
        // var ticObj = $firebase(new Firebase('https://haon.firebaseio.com/tic/game')).$asObject();
        // test();
        // function test(){
        //     //ticObj
        //     theController.boxesList.squares = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        //     theController.boxesList.players = [{name: 'fred', wins: 0, loses: 1},{name: 'ed', wins: 2, loses: 3}];
        //     theController.boxesList.$save();
        // }
