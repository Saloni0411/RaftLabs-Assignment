var emptyTable=true;
var knightChess = "url('knight_chess.png')"
var piece = "";
var validOption = [];
var score = 0;
var gameOver=2; // 0 for game lost, 1 for game won, 2 for init.
function SquareClicked(x)
{
	var square = document.getElementById(x);
	if(emptyTable)
	{
		emptyTable = false;
		square.style.backgroundImage = knightChess;
		piece = x[4] + x[5];
	}
	else if(x[4] + x[5] == piece)
	{
		SearchOption();
		if(validOption.length == 0)
		{
			getGameOverStatus();
		}
	}
	else 
	{
		for(var i=0;i<validOption.length;i++)
		{
			if(x==validOption[i])
			{
				square = document.getElementById(x);
				square.style.backgroundImage = knightChess;
				score++;
				document.getElementById("score").innerHTML = "Score: " + score + " out of 64.";
				if(square.style.backgroundColor == "red") 
				{
					square.style.backgroundColor = "black";
				}
				else
				{
					square.style.backgroundColor = "white";
				}
				document.getElementById("elem"+piece).style.backgroundImage="";
				if(document.getElementById("elem"+piece).style.backgroundColor == "white")
				{
					document.getElementById("elem"+piece).style.backgroundColor="yellow";
				}
				else if(document.getElementById("elem"+piece).style.backgroundColor == "black")
				{
					document.getElementById("elem"+piece).style.backgroundColor="blue";
				}
				piece = x[4] + x[5];

			}
			else
			{
				if(document.getElementById(validOption[i]).style.backgroundColor == "pink")
				{
					document.getElementById(validOption[i]).style.backgroundColor="white";
				}
				else if(document.getElementById(validOption[i]).style.backgroundColor == "red")
				{
					document.getElementById(validOption[i]).style.backgroundColor="black";
				}
			}
		}
		validOption = [];
	}
}

function SearchOption()
{
	var tdRow = parseInt(piece[0]);
	var tdCol = parseInt(piece[1]);
	if(tdRow+2 < 8 && tdCol+1 < 8) //hard coded option 1
	{
		var elem="elem"+(tdRow+2)+(tdCol+1);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow+2 < 8 && tdCol-1 >=0) //hard coded option 2
	{
		var elem="elem"+(tdRow+2)+(tdCol-1);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow+1 < 8 && tdCol+2 < 8) //hard coded option 3
	{
		var elem="elem"+(tdRow+1)+(tdCol+2);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow-1 >= 0 && tdCol+2 < 8) //hard coded option 4
	{
		var elem="elem"+(tdRow-1)+(tdCol+2);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{

			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow+1 < 8 && tdCol-2 >=0) //hard coded option 5
	{
		var elem="elem"+(tdRow+1)+(tdCol-2);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow-1 >= 0 && tdCol-2 >=0) //hard coded option 6
	{
		var elem="elem"+(tdRow-1)+(tdCol-2);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow-2 >= 0 && tdCol+1 < 8) //hard coded option 7
	{
		var elem="elem"+(tdRow-2)+(tdCol+1);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
				document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
	if(tdRow-2 >= 0 && tdCol-1 >= 0) //hard coded option 8
	{
		var elem="elem"+(tdRow-2)+(tdCol-1);
		if(document.getElementById(elem).style.backgroundColor!="yellow" &&
			document.getElementById(elem).style.backgroundColor!="blue")
		{
			validOption.push(elem);
			if(document.getElementById(elem).style.backgroundColor=="white")
			{
				document.getElementById(elem).style.backgroundColor="pink";
			}
			else if(document.getElementById(elem).style.backgroundColor=="black")
			{		
				document.getElementById(elem).style.backgroundColor="red";
			}
		}
	}
}
function getGameOverStatus()
{
	for(var i =0; i<8; i++)
	{
		for(var j=0;j<8;j++)
		{
			if(document.getElementById("elem"+i+j).style.backgroundColor == "white" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "black")
			{
				document.getElementById("result").innerHTML = "Game Over. You failed to conquer the checkerboard.";
				document.getElementById("result").color = "red";
				gameOver=0;
				break;
			}
		}
	}
	if(gameOver!=0)
	{
		document.getElementById("result").innerHTML = "Congratulations. You have conquered the checkerboard.";
		document.getElementById("result").color = "green";
	}
}

function gameRestart()
{
	emptyTable=true;
	piece=""
	validOption = [];
	score = 0;
	gameOver=2; // 0 for game lost, 1 for game won, 2 for init.
	document.getElementById("score").innerHTML = "Score: ";
	document.getElementById("result").color = "black";
	document.getElementById("result").innerHTML = "";
	for(var i =0; i<8; i++)
	{
		for(var j=0;j<8;j++)
		{
			if(document.getElementById("elem"+i+j).style.backgroundColor == "yellow" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "pink")
			{
				document.getElementById("elem"+i+j).style.backgroundColor = "white";
			}
			else if(document.getElementById("elem"+i+j).style.backgroundColor == "blue" ||
				document.getElementById("elem"+i+j).style.backgroundColor == "red")
			{
				document.getElementById("elem"+i+j).style.backgroundColor = "black";
			}
			document.getElementById("elem"+i+j).style.backgroundImage = "";		
		}
	}
}