
var GameBoard = function(gameBoardId, itemClickListener){
	
	var gameBoardDivId = gameBoardId;
	
	var clickedListener = itemClickListener;
	
	this.silverCount=0;
	
	this.goldCount=0;
	
	this.diamondCount=0;
	
	this.platinumCount =0;
	
	this.platinumCollectedSession = 0;
	
	this.highestScore = 0;
	
	this.currentScore =0;
		
	this.hasNoItemCreated = function(classNameTo) {
		return document.getElementsByClassName(classNameTo).length == 0;
	};
	
	this.hasNoSilverCreated = function(){		
		return document.getElementsByClassName("silver").length == 0;
	};
	
	this.hasNoGoldCreated = function(){		
		return document.getElementsByClassName("gold").length == 0;
	};
	
	this.hasNoDiamondCreated = function() {
		return document.getElementsByClassName("diamond").length == 0;
	};
	
	this.hasNoPlatinumCreated = function() {
		return document.getElementsByClassName("platinum").length == 0;
	};
	
	this.addElement = function(classToAdd, xPos, yPos){
		var div = document.createElement("div");
		div.className=classToAdd;
		div.style.top = yPos;
		div.style.left = xPos;
		div.onclick=clickedListener;
		//console.log(div.getEventListener("click"));
		document.getElementById(gameBoardDivId).appendChild(div);
		//console.log("add element");
	};
	
	this.clearBoard = function() {
		this.removeAllItemsWithClass("silver");
		this.removeAllItemsWithClass("gold");
		this.removeAllItemsWithClass("diamond");
		this.removeAllItemsWithClass("platinum");
		this.silverCount =0;
		this.goldCount = 0;
		this.diamondCount = 0;
		this.platinumCollectedSession =0;
		this.platinumCount = 0;
		this.currentScore=0;
	};
	
	this.removeAllItemsWithClass = function(className){
		if(className && className != "" && className!= "undefined"){
			var domElements = document.getElementsByClassName(className);
			if(domElements && domElements.length > 0){
				while(domElements.length > 0){
					domElements[0].parentNode.removeChild(domElements[0]);
				}				
			}
		}
	}
	
};