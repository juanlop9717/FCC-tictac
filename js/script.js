$(document).ready(function(){

	// Pertinent Variables

	var symbols = [$("#cube1"),$("#cube2"),$("#cube3"),$("#cube4"),$("#cube5"),$("#cube6"),$("#cube7"),$("#cube8"),$("#cube9")];
	var tableChange = [0,1,2,3,4,5,6,7,8];
	var cpuMode = false;
	var playersMode = false;
	var fullTie = true;
	var mode;
	var playerOne = 'J1';
	var playerTwo = 'J2';
	var actualPlayer = 'J2';
	var ele2;
	var actualValue;
	var gameCheck;
	var randomBol;
	var count;




	// reset the game

	$(".again").click(function(){
		clearVar();
		$("#modal4").modal('hide');
		$("#modal4 h3").empty();
		$("#modal1").modal('show');
	});

	// Intro

	// Variable that contains if is a circle or a cross
	var actualTurn = "circle";
	// Begins the modals answers 

	$("#modal1").modal('show');

	$('#newGame').click(function(){
		$("#modal1").modal('hide');
		$("#modal2").modal('show');
	})

	// VS CPU or 2 players

	function cpuGame(){
		cpuMode = true;
		$("#modal2").modal('hide');
		$("#modal3").modal('show');
	}

	function playergame(){
		playersMode = true;
		$("#modal2").modal('hide');
		$("#modal3").modal('show');
	}

	$("#cpu").click(cpuGame);
	$("#player2").click(playergame);

	// Choose between X or O

	$("#xplayer").click(function(){
		$("#modal3").modal('hide');
		actualTurn = "cross";
	});
	$("#oplayer").click(function(){
		$("#modal3").modal('hide');
		actualTurn = "circle";
	})
	// Function that animate the actual player

	function animPlayer(player,player2){
		player.animate({
						opacity: 1,
						borderWidth: "8px"
						},500);
		player2.animate({
			opacity: .6,
			borderWidth: "1px"
		});
	
	};

	// Animate the initial player

	animPlayer($("#j1"), $("#j2"));


	function emptyIndexies(board){
  		return  board.filter(s => s != "O" && s != "X");
	}
	
	// Function that make the AI Engine of the CPU

	function changeTurn(ele,form){
			if(actualTurn == 'cross'){
					// Check the actual plaer
					if(actualPlayer == 'J1'){
						animPlayer($("#j1"), $("#j2"));
						actualTurn = 'circle';
						ele.append('<div class="'+form+'"></div>');	
						actualPlayer = 'J2';
						return checkCube(playersMode);		
					}
					if(actualPlayer == 'J2'){
						animPlayer($("#j2"), $("#j1"));
						actualTurn = 'circle';
						ele.append('<div class="'+form+'"></div>');	
						actualPlayer = 'J1';
						return checkCube(playersMode);		
					}
					
				}
				if(actualTurn == 'circle'){
					// Check the actual player
					if(actualPlayer == 'J1'){
						animPlayer($("#j1"), $("#j2"));
						actualTurn = 'cross'
						ele.append('<div class="'+form+'"></div>');		
						actualPlayer = 'J2';
						return checkCube(playersMode);

					}
					if(actualPlayer == 'J2'){
						animPlayer($("#j2"), $("#j1"));
						actualTurn = 'cross';
						ele.append('<div class="'+form+'"></div>');					
						actualPlayer = 'J1';
						return checkCube(playersMode);
					}			
				}
	}


	// Minimax Algorithm

	/*function score(){
		if(actualTurn == 'J1'){
			if(gameCheck){
				return 10;
			}
		}
		if(actualTurn == 'J2'){
			if(gameCheck){
				return -10;
			}
		}
		else{
			return 0
		}

	}

	function minimax(){
		return score();

	}*/



	// Append function

	function randomGen(){
		count++;
		randomBol = Math.floor(Math.random() * symbols.length);
		if(tableChange[randomBol] == randomBol){
			return appendForm(symbols[randomBol], actualTurn, randomBol);
			}
		else{
			randomGen();
			console.log(randomBol);
			}
		

	}

	function appendForm(ele, form, index){
		fullTie = false;
		if(tableChange[index] == index){
				tableChange[index] = actualTurn;
				changeTurn(ele,form);
				setTimeout(function(){
				if(cpuMode && count == 0){
					randomGen();
					
					}
				},400)
		}
	}

	// click functions
	symbols[0].click(function(){
		appendForm(symbols[0], actualTurn, 0);
		count = 0;	
	});
	symbols[1].click(function(){
		appendForm(symbols[1], actualTurn,1);
		count = 0;
	});
	symbols[2].click(function(){
		appendForm(symbols[2], actualTurn,2);
		count = 0;
	});
	symbols[3].click(function(){
		appendForm(symbols[3], actualTurn, 3);
		count = 0;
	});
	symbols[4].click(function(){
		appendForm(symbols[4], actualTurn,4);
		count = 0;
	});
	symbols[5].click(function(){
		appendForm(symbols[5], actualTurn,5);
		count = 0;
	});
	symbols[6].click(function(){
		appendForm(symbols[6], actualTurn,6);
		count = 0;
	});
	symbols[7].click(function(){
		appendForm(symbols[7], actualTurn,7);
		count = 0;
	});
	symbols[8].click(function(){
		appendForm(symbols[8], actualTurn,8);
		count = 0;
	});
	symbols[9].click(function(){
		appendForm(symbols[9], actualTurn,9);
		count = 0;
	});

	// Announce the winner of the game 
	function winnerAnnounce(){
		if(playersMode){
				animPlayer($("#j1"), $("#j2"));
				$("#modal4 h3").append(actualPlayer + " Wins!");
				actualPlayer = '';
				$("#modal4").modal('show');
	
		}
		if(cpuMode){

				if(actualPlayer == 'J1'){
					$("#modal4 h3").append("You Win!");
				}
				else{
					$("#modal4 h3").append("You Lose!");
				}
			    actualPlayer = '';
				$("#modal4").modal('show');
		}

	}

	// Function that look all the position and assert if a row or column or diagonal of the symbols has been completed
	function checkCube(){

		// Horizontals
		if(tableChange[0] == tableChange[1] && tableChange[1] == tableChange[2]){		
			winnerAnnounce();	
		}
		else if(tableChange[3] == tableChange[4] && tableChange[4] == tableChange[5]){
			winnerAnnounce();
		}
		else if(tableChange[6] == tableChange[7] && tableChange[7] == tableChange[8]) {
			winnerAnnounce();	
		}
		//Diagonals
		else if(tableChange[0] == tableChange[4] && tableChange[4] == tableChange[8]){
			winnerAnnounce();
		}
		else if(tableChange[2] == tableChange[4] && tableChange[4] == tableChange[6]){
			winnerAnnounce();
		}
		// Verticals
		else if(tableChange[0] == tableChange[3] && tableChange[3] == tableChange[6]){
			winnerAnnounce();
		}
		else if(tableChange[1] == tableChange[4] && tableChange[4] == tableChange[7]){
			winnerAnnounce();
		}
		else if(tableChange[2] == tableChange[5] && tableChange[5] == tableChange[8]){
			winnerAnnounce();
		}
		else{
			let boleta = tableChange.every(function(element){
				return element == 'circle' ||  element == 'cross'
			})
			if(boleta){
				$("#modal4 h3").append("It's a tie");
				$("#modal4").modal('show');			
			}

		}
	};


	// Reset functions
	function clearVar(){
		tableChange = [0,1,2,3,4,5,6,7,8];
		cpuMode = false;
		playersMode = false;
		$(".circle").remove();
		$(".cross").remove();
		actualPlayer = 'J2';
	}

		
	

});