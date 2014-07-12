
var gameBoard;
var timeOut = 31;
var countDownExecutor,silverExecuter,goldExecuter,diamondExecuter,platinumExecuter;
/*var silverExecuter;
var goldExecuter;
var diamondExecuter;
var platinumExecuter;*/
var silver,gold,diamond,paltinum;

var dimensionArr = {silver : {height: 20, width: 20, relativHeight: 27, relativWidth: 27},
					gold : {height: 15, width: 15, relativHeight: 36, relativWidth: 36},
					diamond: {height: 10, width: 10, relativHeight: 54, relativWidth: 54},
					platinum: {height: 10, width: 10, relativHeight: 54, relativWidth: 54}};

loadScript('js/GameBoard.js');
var onDocumentLoad =function(){
	
	/*var div = document.createElement("div");
	div.className='silver';
	div.style.top="100px";
	div.style.left="100px";*/
	/*div.style.background="red";
	div.style.top="100px";
	div.style.left="100px";
	div.style.height="10px";
	div.style.width="10px";*/
	//alert(JSON.stringify(div));
	//div.style.position="absolute";
	
	/*div.onclick= function(){
		alert("hurreyy.. it works");
	};
	document.getElementById("gameBoard").appendChild(div);*/
	document.getElementById("startGameBtn").addEventListener("click", onGameStartListener);
	gameBoard = new GameBoard("gameBoard", caughtAnItem);
};

function loadScript(url)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;       
    head.appendChild(script);
}

var onGameStartListener = function(e){
	console.log("inside game start listener");
	timeOut=31;
	gameBoard.clearBoard();
	this.removeEventListener("click", onGameStartListener);
	this.innerHTML="Game In Progress";
	this.style.background="red";
	clearScoreBoard();
	
	//generateItem("silver");
	silverExecuter = setInterval(silverProvider, 2e3);
	silverProvider();
	goldExecuter = setInterval(goldProvider, 4e3);
	diamondExecuter = setInterval(diamondProvider, 4e3);
	platinumExecuter = setInterval(platinumProvider, 6e3);
	countDownExecutor = setInterval(timer, 1e3);
	timer();
};

var timer = function(){
	--timeOut;
	if(timeOut < 1){
		updateCountDown();
		timeOutHandler();
	}
	else
		updateCountDown();
};

var timeOutHandler = function(){
	clearExecuters();
	resetStartGameButton();
	displayScore(true);
	gameBoard.clearBoard();	
};

var caughtAnItem = function() {
	//console.log(this.className);
	this.onclick = null;
	this.style.background="green";
	if(this.className == "silver")
		gotSilver();
	else if(this.className == "gold")
		gotGold();
	else if(this.className == "diamond")
		gotDiamond();
	else if(this.className == "platinum")
		gotPlatinum();
};

var clearExecuters = function(){
	if(countDownExecutor)
		clearInterval(countDownExecutor);
	if(silverExecuter)
		clearInterval(silverExecuter);
	if(goldExecuter)
		clearInterval(goldExecuter);
	if(diamondExecuter)
		clearInterval(diamondExecuter);
	if(platinumExecuter)
		clearInterval(platinumExecuter);
};

var resetStartGameButton = function(){
	var startButton = document.getElementById("startGameBtn");
	startButton.innerHTML = "Click Here To Start Game";
	startButton.style.background=null;
	startButton.className= "startGame";
	startButton.addEventListener("click", onGameStartListener);	
};

var silverProvider = function(){	
	if(silverExecuter){
		//console.log("inside silver provider");
		generateItem("silver");
		setTimeout(function(){
			gameBoard.removeAllItemsWithClass('silver');
		}, 4e3);
	}
};

var goldProvider = function(){
	if(goldExecuter){
		generateItem("gold");
		setTimeout(function(){
			gameBoard.removeAllItemsWithClass('gold');
		}, 3e3);
	}
};

var diamondProvider = function(){
	if(diamondExecuter){
		generateItem("diamond");
		setTimeout(function(){
			gameBoard.removeAllItemsWithClass('diamond');
		}, 2e3);
	}
};

var platinumProvider = function(){
	if(platinumExecuter){
		generateItem("platinum");
		setTimeout(function(){
			gameBoard.removeAllItemsWithClass('platinum');
		}, 1500);
	}
};

var generateItem = function(itemName){
	if(gameBoard.hasNoItemCreated(itemName)){
		
		xpos = Math.floor(Math.random() * dimensionArr[itemName].relativWidth) * dimensionArr[itemName].width;
		ypos = Math.floor(Math.random() * dimensionArr[itemName].relativHeight)* dimensionArr[itemName].height;
		//console.log("x:"+xpos+" y:"+ypos);
		gameBoard.addElement(itemName, xpos, ypos);
		if(itemName=="silver")
			silver = {xPos: xpos, yPos: ypos};
		else if(itemName=="gold")
			gold = {xPos: xpos, yPos: ypos};
		else if(itemName=="diamond")
			diamond = {xPos: xpos, yPos: ypos};
		else if(itemName=="platinum")
			platinum = {xPos: xpos, yPos: ypos};
	}	
};

var gotSilver = function(){	
	document.getElementById("silverCount").innerHTML=++gameBoard.silverCount;
	gameBoard.currentScore++;
	displayScore(false);
};

var gotGold = function() {
	document.getElementById("goldCount").innerHTML=++gameBoard.goldCount;
	gameBoard.currentScore+=2;
	displayScore(false);
};

var gotDiamond = function() {
	document.getElementById("diamondCount").innerHTML=++gameBoard.diamondCount;
	gameBoard.currentScore+=3;
	displayScore(false);
};

var gotPlatinum = function() {
	gameBoard.platinumCollectedSession++;
	document.getElementById("platinumCount").innerHTML=++gameBoard.platinumCount;
	gameBoard.currentScore+=4;
	displayScore(false);
	if(gameBoard.platinumCollectedSession >2){
		gameBoard.platinumCollectedSession=0;
		timeOut+=30;
	}
};

var updateCountDown = function(){
	document.getElementById("startGameBtn").innerHTML="Remaining Time: "+timeOut;
};

var displayScore = function(updateHighest){
	document.getElementById("currentScore").innerHTML=":  "+gameBoard.currentScore;
	if(updateHighest){
		if(gameBoard.currentScore > gameBoard.highestScore)
			gameBoard.highestScore=gameBoard.currentScore;
		document.getElementById("highestScore").innerHTML=":  "+gameBoard.highestScore;
		
	}
};

var clearScoreBoard = function(){
	document.getElementById("currentScore").innerHTML =":  0";
	document.getElementById("silverCount").innerHTML=0;
	document.getElementById("goldCount").innerHTML=0;
	document.getElementById("diamondCount").innerHTML=0;
	document.getElementById("platinumCount").innerHTML=0;
};

