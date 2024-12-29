var canvas2 = document.getElementById('calcCanvas');
var context2 = canvas2.getContext('2d');
var text = document.getElementById('resultCalc');
var numGrid = document.getElementById('numGrid');
var calcStart = document.getElementById('calcStart');

document.getElementById('numGrid').style.display = 'none';

calcStart.addEventListener('click', startUp);

function startUp() {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    document.getElementById('calcStart').style.display = 'none';
    showCalculatorButtons();
}

function showCalculatorButtons() {
    numGrid.style.display = 'block';
}

function attachNumberEvents() {
    const numberMenu = document.querySelectorAll('.num');
    var num1 = 0;
    var num2 = 0;
    var operand = '';
    
        numberMenu.forEach(function(menu) {
            menu.addEventListener('click', function() {
                if(menu.textContent === "AC")
                {
                    text.textContent = '';
                    operand = '';
                    num1 = 0;
                    num2 = 0;
                }else if(menu.textContent === "+" || menu.textContent === "-" || menu.textContent === "*" || menu.textContent === "/")
                {
                    if(operand === '')
                    {
                        num1 = parseInt(text.textContent);
                    }
                    text.textContent = '';
                    operand = menu.textContent;
                }else if(menu.textContent === "="){
                    num2 = parseInt(text.textContent);
                    switch(operand)
                    {
                        case '+':
                            num1 += num2;
                            break;
                        case '-':
                            num1 -= num2;
                            break;
                        case '*':
                            num1 *= num2;
                            break;
                        case '/':
                            num1 /= num2;
                            break;
                    }
                    text.textContent = num1;
                    operand = '';
                }else{
                    text.textContent += menu.textContent; 
                }
            });
        });
}
attachNumberEvents();


