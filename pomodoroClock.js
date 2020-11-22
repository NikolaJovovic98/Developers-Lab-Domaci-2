const title = document.title

const timeButtonsPanel = document.getElementById('time-options')

const pomodoroClassicButton = document.getElementById('pomodoroClassic')
const pomodoroShortButton = document.getElementById('pomodoroShort')
const pomodoroLongButton = document.getElementById('pomodoroLong')

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')

const lastPomodoroButton = { name: 'none' }

const audio = new Audio('https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3')

let intervalId
let timeLeft
let counter
const timeDisplay = document.getElementById('display-time')

function checkOneDigitNum(num) {
    return num.toString().length;
}

function setClassic() {
    timeLeft = 1500
    counter = 0
    timeDisplay.innerHTML = (convertSeconds(timeLeft - counter))
}

function setShort() {
    timeLeft = 300
    counter = 0
    timeDisplay.innerHTML = (convertSeconds(timeLeft - counter))
}

function setLong() {
    timeLeft = 600
    counter = 0
    timeDisplay.innerHTML = (convertSeconds(timeLeft - counter))
}

function reset() {
    switch (lastPomodoroButton.name) {
        case 'classic':
            timeLeft = 1500
            break;
        case 'short':
            timeLeft = 300
            break;
        case 'long':
            timeLeft = 600
            break;
    }
    counter = 0
    timeDisplay.innerHTML = (convertSeconds(timeLeft - counter))
    document.title = '(' + timeDisplay.innerHTML + ')' + ' ' + title
    clearInterval(intervalId)
}

function stopCountDown() {
    clearInterval(intervalId)
}

function appendZero(number) {
    if (number === 0) {
        return number += '0'
    } else if (checkOneDigitNum(number) === 1) {
        return number = '0' + number
    }
    else return number
}

function convertSeconds(sec) {
    let minutes = Math.floor(sec / 60) // time= 125 minutes = 2(120)
    let seconds = sec % 60 // time = 125 seconds = 5 (120 + 5)
    minutes = appendZero(minutes)
    seconds = appendZero(seconds)
    return minutes + ":" + seconds
}

function timeFunction() {
    timeDisplay.innerHTML = (convertSeconds(timeLeft - counter))
    counter += 1
    document.title = '(' + timeDisplay.innerHTML + ')' + ' ' + title
    if (counter > timeLeft) {
        audio.play()
        clearInterval(intervalId)
    }
}

function setIntervalForTimeFunction() {
    intervalId = setInterval(timeFunction, 1000)
}

function showElement(element) {
    if (element.getAttribute("class") == "hide")
        element.setAttribute("class", "show")
}

function init() {
    startButton.addEventListener('click', setIntervalForTimeFunction)
    resetButton.addEventListener('click', reset)
    stopButton.addEventListener('click', stopCountDown)
    pomodoroClassicButton.addEventListener('click', () => {
        showElement(timeButtonsPanel)
        setClassic()
        lastPomodoroButton.name = 'classic'
    })
    pomodoroShortButton.addEventListener('click', () => {
        showElement(timeButtonsPanel)
        setShort()
        lastPomodoroButton.name = 'short'
    })
    pomodoroLongButton.addEventListener('click', () => {
        showElement(timeButtonsPanel)
        setLong()
        lastPomodoroButton.name = 'long'
    })
}

init();






















