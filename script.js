// annoucing all variables before using them
let display,
numbers,
equalBtn,
zero,
dotBtn,
check_dot,
operators,
sumOfFisrtNum = "",
sumOfSecondNum = "",
resultNum,
clean,
plus,
replaceOprators,
allOperators;

window.onload = function calculator() {
    // getting elements from HTML file so as to use in this file
    display  = document.getElementById("outcome");
    numbers  = document.querySelectorAll(".number");
    equalBtn = document.getElementById("equal");
    zero     = document.getElementById("zero");
    dotBtn   = document.getElementById("dot");
    clean    = document.getElementById("clear");
    allOperators =  document.querySelectorAll(".allOperators");
    plus = document.getElementById("plus");
    
    // the function stands for buttons such as 1-9 to display numbers
    function getNumberValue(){
        if(resultNum && sumOfFisrtNum == "0."){
            sumOfFisrtNum = "0."+ this.value;
            resultNum="";
            display.innerHTML = sumOfFisrtNum
        }
        else if(resultNum){
            sumOfFisrtNum = this.value;
            resultNum="";
            display.innerHTML = sumOfFisrtNum
        }
        else{
            sumOfFisrtNum += this.value;
            display.innerHTML = sumOfFisrtNum
        }
    }
    // the function stands for zero button
    function getZero(){
        if (sumOfFisrtNum != "0"){
            sumOfFisrtNum += this.value;
            display.innerHTML = sumOfFisrtNum;
        }                
    }
    // the function represent dot and it is also match dot in display if dot  already exists or not 
    function getDot(){
        check_dot =  /^\d+$/;
        if (sumOfFisrtNum == ""){
            sumOfFisrtNum = "0"+ this.value;
            display.innerHTML = sumOfFisrtNum;
        }
        else if(display.innerHTML.match(check_dot)){
            sumOfFisrtNum += this.value;
            display.innerHTML = sumOfFisrtNum;
        }
    }
    // the function stands for when one of the operators is clicked  firstly check both operands and if one of them is false , just get the value of the operator  else both operands are true, then call calculation() next get the value of the operator which is pressed.
    function passingNum(){
        if (sumOfSecondNum == "" && sumOfFisrtNum != ""){
            sumOfSecondNum = sumOfFisrtNum;
            sumOfFisrtNum = "";
            operators= this.value;
            
        }
        else if (sumOfFisrtNum != "" && sumOfSecondNum != ""){
            calculation();
            sumOfSecondNum = sumOfFisrtNum;
            sumOfFisrtNum = "";
            operators =this.value;
        }
        else{
            replaceOprators = operators.replace(operators, operators = this.value);
        }
    }
    // this function previously converts string to number then begin to calculate both operands. 
    function calculation(){
        sumOfFisrtNum = parseFloat(sumOfFisrtNum);
        sumOfSecondNum = parseFloat(sumOfSecondNum);
        if (operators == "+" || replaceOprators == "+"){
            resultNum = sumOfFisrtNum + sumOfSecondNum;
        }
        else if(operators == "-" || replaceOprators == "-"){
            resultNum = sumOfSecondNum - sumOfFisrtNum;
        }
        else if (operators == "*" || replaceOprators == "*"){
            resultNum = sumOfSecondNum * sumOfFisrtNum;
        }
        else if (operators == "/" || replaceOprators == "/"){
            resultNum = sumOfSecondNum / sumOfFisrtNum;
        }
        else if (operators == "%" || replaceOprators == "%"){
            resultNum = sumOfSecondNum % sumOfFisrtNum;
        }
        display.innerHTML = resultNum;
        sumOfSecondNum = "";
        sumOfFisrtNum = resultNum;
    }
    // this function stands for cleaning Display and helps to start everything from zero 
    function cleanAll(){
        sumOfSecondNum ="";
        sumOfFisrtNum ="";
        display.innerHTML = 0;
    }
    // when number for button click get value of the buttons. 
    for (let i = 0; i < numbers.length; i++){
        numbers[i].onclick = getNumberValue
        }
    // when operators click get value of the buttons. 
    for (let i = 0; i < allOperators.length; i++){
        allOperators[i].onclick = passingNum
    }
    // this function firstly check both operands, if both operands have their own values then pass calculation function , else break the function
    function checkingEqualBtn(){
        if(sumOfSecondNum != "" && sumOfFisrtNum != ""){
            calculation();
        }
        else{
            return;
        }    
    }
    // run functions when some of the buttons are clicked   
    zero.    onclick = getZero;
    dotBtn.  onclick = getDot;
    clean.   onclick = cleanAll;
    equalBtn.onclick = checkingEqualBtn;


    //  the below helps to control the calcualtor with keyboards
    window.addEventListener("keydown",checkPress);
    function checkPress(key){
        //  these stand for numbers and numberpad
        if (((key.keyCode > 48 && key.keyCode <= 57) && key.shiftKey == false)  || (key.keyCode > 96 && key.keyCode <= 105)){ 
            if(resultNum && sumOfFisrtNum == "0."){
                sumOfFisrtNum = "0."+key.key;
                resultNum="";
                display.innerHTML = sumOfFisrtNum
            }
            else if(resultNum){
                sumOfFisrtNum = key.key;
                resultNum="";
                display.innerHTML = sumOfFisrtNum
            }
            else{
                sumOfFisrtNum += key.key;
                display.innerHTML = sumOfFisrtNum
            }      
        }
        // these represent operators and also check shift key in some cases
        else if (key.keyCode == 107 || key.keyCode == 109 || key.keyCode == 106 || key.keyCode == 111 || key.keyCode == 189 || (key.shiftKey == true && (key.keyCode == 187 || key.keyCode == 53 || key.keyCode == 56))){
            if (sumOfSecondNum == "" && sumOfFisrtNum != ""){
                sumOfSecondNum = sumOfFisrtNum;
                sumOfFisrtNum = "";
                operators= key.key;   
            }
            else if (sumOfFisrtNum != "" && sumOfSecondNum != ""){
                calculation();
                sumOfSecondNum = sumOfFisrtNum;
                sumOfFisrtNum = "";
                operators =key.key;
            }
            else{
                replaceOprators = operators.replace(operators, operators = key.key);
            }
        }
        // this represents zero to the display 
        else if (key.keyCode == 48 || key.keyCode == 96){
            if (sumOfFisrtNum != "0"){
                sumOfFisrtNum += key.key;
                display.innerHTML = sumOfFisrtNum;
            }                
        }
        // this represents dot to the display
        else if (key.keyCode == 190 || key.keyCode == 110 ){
            check_dot =  /^\d+$/;
            if (sumOfFisrtNum == ""){
                sumOfFisrtNum ="0" + key.key;
                display.innerHTML = sumOfFisrtNum;
            }
            else if(display.innerHTML.match(check_dot)){
                sumOfFisrtNum += key.key;
                display.innerHTML = sumOfFisrtNum;
            }
        }
        // when equal button in keyboards is pressed call checkingEqualBtn()
        else if(key.keyCode == 187 && key.shiftKey == false ){
            checkingEqualBtn();
        }
        // when delete and Esc buttons in keyboards are pressed call cleanAll()
        else if (key.keyCode == 46  || key.keyCode == 27 ){
            cleanAll();
        }
        
    }
}
