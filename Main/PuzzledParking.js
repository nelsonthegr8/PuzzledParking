var lvl = [
    [0,1,0,1],
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

    function refreshScreen(){
// for loop sifts through array and makes the car lots that are == to 0 empty by hiding the car img
        for(var i = 0; i<lvl.length; i++){
            for(var j = 0; j<lvl[i].length; j++){
                if(lvl[i][j] === 0){
                    document.getElementById(compareArr[i][j]).style.visibility = "hidden";
                }else if(lvl[i][j]){
                    document.getElementById(compareArr[0][0]).style.visibility = "visible";
                }
            }   
        }

        //usrpts

        //lvl determined pts
    }

    function addCar(){


    }

    function removeCar(){
        
    }

    function Timer(){

    }

    function Start(){
refreshScreen();

    }
