let runningTotal = 0
let buffer = '0'
let previousOperator = null

const screen = document.querySelector('#show-result')

function buttonClick(clickedButton) {

    if (isNaN(clickedButton)) {

        handleSymbol(clickedButton)

    } else {

        handleNumber(clickedButton)

    }

    screen.innerText = buffer

}

function handleSymbol(clickedSymbol) {

    switch (clickedSymbol) {

        case 'C':
            buffer = '0'
            runningTotal = 0
            break;
        case '=':
            if(previousOperator === null) return
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = runningTotal
            runningTotal = 0
        break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(clickedSymbol)
            break;

    }

}

function handleMath(mathSymbol) {

    if (buffer === '0') return

    const intBuffer = +buffer //parseInt(buffer) Same as this

    if (runningTotal === 0) {

        runningTotal = intBuffer

    } else {

        flushOperation(intBuffer)

    }

    previousOperator = mathSymbol

    buffer = '0'

}

function flushOperation(intBuffer) {

    if (previousOperator === '+') {

        runningTotal += intBuffer

    } else if (previousOperator === '-') {

        runningTotal -= intBuffer

    } else if (previousOperator === '*') {

        runningTotal *= intBuffer

    } else if (previousOperator === '/') {

        runningTotal /= intBuffer

    }

}

function handleNumber(clickedNumber) {

    if (buffer === '0') {

        buffer = clickedNumber

    } else {

        buffer += clickedNumber

    }

}

function init() {

    document.querySelectorAll('.pad-button')
        .forEach(button => {
            button.addEventListener('click', function (event) {
                buttonClick(event.target.innerText)
            })
        })
}

init()