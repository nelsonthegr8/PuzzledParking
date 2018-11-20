/*below are the variables used for this game. 
i decided to make two identical arrays FirstArr and Second Arr so that i can reset the 
FirstArr after the user finishes a Round whether they pass of not it resets the users input in the 
array to default settings and in the future i can just add a new array and use it to creat new levels*/
var FirstArr = [
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [1,0,0,1],
    [0,0,0,1]];
var SecondArr =[
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [1,0,0,1],
    [0,0,0,1]];
    /*i put the names of the id's in my document into the array in order to kind of "store them" into the array and then call them later
    so i can hide them if the same corresponding array[i][j] value == 0 if not use a for loop to sift through and unhide all
    the cars that are == to the corresponding array that is == to 1. make sense? if lvl[i][j] == 1 --> 
    then document.getelementbyid(compare[][]).style.visibility = "hidden"<--Key Factor(used the array to fill in the string call)*/
var compareArr = [
    ["car1","car2","car3","car4"],
    ["car5","car6","car7","car8"],
    ["car9","car10","car11","car12"],
    ["car13","car14","car15","car16"],
    ["car17","car18","car19","car20"]];
//this check loop array is used to Moderate how many times someone can add and remove a car from a spot
//for exaxmple when they add a car to a spot the spot on the check loop gets decremented. once it goes to 0 the user cannot
//remove the car from that spot again. This stops spammers and is apart of my rules.
var CheckLoop = [
    [1,2,1,1],
    [1,2,2,1],
    [1,1,2,1],
    [2,1,1,2],
    [1,1,1,2]];
var CheckLoop2 = [
    [1,2,1,1],
    [1,2,2,1],
    [1,1,2,1],
    [2,1,1,2],
    [1,1,1,2]];
var Time = [60,50,35,30];
//I initialized the column and row as NaN so that they would not go through if the user does not press one of them and 
//also helps me give the user dynamic feedback by letting them know which button they did not press when the click either add or delete.
var Column = NaN;
var Row = NaN;
var lvl = 0;
var usrpts = 0;
var lvlDeterminedPts = [18,7,25,-3];
var active = false;
function ColNum(number){
    Column = number;
}
function RowNum(number){
    Row = number;
}
var audio;
//End of Variables for Game
/* This is the start function this fuction is where i chose to just be used to initialize the boolean active set the user points and hide the start button and NxtLvl button within the
html document. i then call the timer function, refreshScreen function and Checkloop function so that when i add levels and anything else there is no need to touch this function it does
its purpose of calling the right functions at the start of the game*/
function Start(){
    active = true;
    usrpts = 0;
    document.getElementById("Start").hidden = true;
    document.getElementById("NextLvl").hidden = true;
    document.getElementById("AddCar").hidden = false;
    document.getElementById("DeleteCar").hidden = false;
    Timer();
    refreshScreen();
    }
/** The Timer function puts itself in a loop delay of one second and decrements the time i set for the specific lvl.
 * it also checks to see if the time hits 0 so that it can stop the loop. the way i controll the loop is with the boolean active.
 * i then check to see if the user passed the lvl within the allotted time if not i tell them and restart the lvl.
 * if they pass they move on
*/
    function Timer(){

        if(active && Time[lvl] > 0){
            Time[lvl]--;
            document.getElementById("TimeLbl").innerHTML = " "+Time[lvl];
            setTimeout(Timer,1000);
            }

        if(Time[lvl] == 0){
            active = false;
        }

        if(active && usrpts == lvlDeterminedPts[lvl] && Time[lvl] > 0 && lvl < 3){
            active = false;
            ResetForNewLvl();
            lvl++;
            alert("Great Job! You Beat The Level! Get ready for LEVEl "+(lvl+1)+
            "! Press The Next Lvl button to continue!");
        } 
        
        if(active && usrpts == lvlDeterminedPts[lvl] && Time[lvl] > 0 && lvl == 3){
            alert("You Beat The GAME!! more levels coming soon! Thanks For Playing");
            document.getElementById("NextLvl").hidden = true;
            document.getElementById("AddCar").hidden = true;
            document.getElementById("DeleteCar").hidden = true;
            document.getElementById("Start").hidden = true;
            for(var i = 0; i < FirstArr.length; i++){
                for(var j = 0; j < FirstArr[i].length; j++){
                    FirstArr[i][j] = 1;
                }
            }
            for(var i = 0; i<FirstArr.length; i++){
                for(var j = 0; j<FirstArr[i].length; j++){
                    if(FirstArr[i][j] == 0){
                        document.getElementById(compareArr[i][j]).style.visibility = "hidden";
                    }else if(FirstArr[i][j] == 1){
                        document.getElementById(compareArr[i][j]).style.visibility = "visible";
                    }
                }   
            }
            document.getElementById("ScoreLbl").innerHTML = " Thanks ";
            document.getElementById("TimeLbl").innerHTML = " For ";
            document.getElementById("ScoreToGetLbl").innerHTML = " Playing! ";
//Below is what loops back through every one second the key is the setTimeout function
        } 
        
        if(Time[lvl] == 0 && usrpts != lvlDeterminedPts[lvl]){
            ResetForNewLvl();
            Hide();
            alert("Sorry You Ran out of time! Press Start and Try Again!");
            document.getElementById("Start").hidden = false;
        }
    }
    /**
     * The add car function is used to add a car to the users selected spot
     * it also alerts the user if they have not clicked a number in the row or column sections by checking to see if the number is NaN
     * if the number is not NaN then it adds 2 to the users points and it refreshes the screen
     */
    function addCar(){
     if(active){
        if(isNaN(Row) && isNaN(Column)){
            alert("Please Click a Row number and Column number");
        }else if(isNaN(Row)){
            alert("Please Click a Row number");
        }else if(isNaN(Column)){
            alert("Please Click a Column number");
        }else if(FirstArr[Row][Column] == 0 && CheckLoop[Row][Column] > 0){
            FirstArr[Row][Column] = 1;
            CheckLoop[Row][Column] -= 1;
            usrpts += 2;
        }else if(FirstArr[Row][Column] == 1){
            alert("Spot filled -2 points");
            usrpts -= 2;
        }
        refreshScreen();
    }
}
/**
 * The remove Car function is activated when the user presses the remove button during the game and it removes a car from the selected spot
 * this function does the same as add but removes cars instead and removes one point from the usrs points
 */
    function removeCar(){
        if(active){
            if(isNaN(Row) && isNaN(Column)){
                alert("Please Click a Row number and Column number");
            }else if(isNaN(Row)){
                alert("Please Click a Row number");
            }else if(isNaN(Column)){
                alert("Please Click a Column number");
            }else if(FirstArr[Row][Column] == 1 && CheckLoop[Row][Column] > 0){
                FirstArr[Row][Column] = 0;
                CheckLoop[Row][Column]-= 1;
                usrpts -= 1;
            }else if(FirstArr[Row][Column] == 0){
                alert("Spot is already empty!");
            }else if(FirstArr[Row][Column] == 1 && CheckLoop[Row][Column] == 0){
                alert("Sorry You Cant Remove That Car From That Spot Anymore")
            }
            refreshScreen();
        }
    }
//this hides the NextLvl button the add and delete buttons aswell at the load of the page and is used in the start function and othe places its faster to just type hide() then everything
//the hide function
    function Hide(){
        document.getElementById("NextLvl").hidden = true;
        document.getElementById("AddCar").hidden = true;
        document.getElementById("DeleteCar").hidden = true;
    }
/**The refreshscreen function is used to sift through the FirstArr array or any new levels i make and displays the changes the user makes in real time
 * from the adding of points to the time they have left. and it changes the row and col buttons to NaN everytime so the user doesnt have a misinput after they press add or delete
 */
    function refreshScreen(){
        // for loop sifts through array and makes the car lots that are == to 0 empty by hiding the car img
                for(var i = 0; i<FirstArr.length; i++){
                    for(var j = 0; j<FirstArr[i].length; j++){
                        if(FirstArr[i][j] == 0){
                            document.getElementById(compareArr[i][j]).style.visibility = "hidden";
                        }else if(FirstArr[i][j] == 1){
                            document.getElementById(compareArr[i][j]).style.visibility = "visible";
                        }
                    }   
                }
                Row = NaN;
                Column = NaN;
                document.getElementById("ScoreLbl").innerHTML = "Points " + usrpts;
                document.getElementById("TimeLbl").innerHTML = " "+Time[lvl];
                document.getElementById("ScoreToGetLbl").innerHTML = " Points to get: "+lvlDeterminedPts[lvl];
            }
//this sifts through and changes the check loop array to match first array in the sense of catching people who try and add delete one area by checking first array.
//for every slot in Firstarr that is full the check loop spot == 2 for every spot that == 0 the check loop gets 1. this is so once the spot hits zero the user cant delete from that spot anymore
   
/**This is the function that does all the dirty work
 * this is so that i dont have a whole bunch of code in my time function but it also covers all three bases. so in the time loop if you pass the level or fail the user gets thrown into this 
 * function they either have passed the level and therefore this function gets everything ready for the next lvl visually wise. by changing the array to all ones so all spots are filled when
 * the user looks at it untill they hit the nxtlvl button.
 */
    function ResetForNewLvl(){
         if (Time[lvl] > 0){
            usrpts = 0;
            for(var i = 0; i < FirstArr.length; i++){
                for(var j = 0; j < FirstArr[i].length; j++){
                    FirstArr[i][j] = 1;
                }
            }
            refreshScreen();
            for(var i = 0; i < FirstArr.length; i++){
                for(var j = 0; j < FirstArr[i].length; j++){
                    FirstArr[i][j] = SecondArr[i][j];
                }
            }
            for(var i = 0; i<FirstArr.length; i++){
                for(var j = 0; j<FirstArr[i].length; j++){
                    CheckLoop[i][j] = CheckLoop2[i][j];
                }
            }
    document.getElementById("Start").hidden = true;
    document.getElementById("AddCar").hidden = true;
    document.getElementById("DeleteCar").hidden = true;
    document.getElementById("NextLvl").hidden = false;
        }else {
            usrpts = 0;
            Time[0] = 60;
            Time[1] = 50;
            Time[2] = 35;
            Time[3] = 30;
            for(var i = 0; i < FirstArr.length; i++){
                for(var j = 0; j < FirstArr[i].length; j++){
                    FirstArr[i][j] = 1;
                }
            }
            refreshScreen();
            for(var i = 0; i < FirstArr.length; i++){
                for(var j = 0; j < FirstArr[i].length; j++){
                    FirstArr[i][j] = SecondArr[i][j];
                }
            }
            for(var i = 0; i<FirstArr.length; i++){
                for(var j = 0; j<FirstArr[i].length; j++){
                    CheckLoop[i][j] = CheckLoop2[i][j];
                }
            }
            Hide();
        }
    }