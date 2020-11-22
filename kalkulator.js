



const calculatorApp = document.querySelector('#calculator')

const deleteButton = document.getElementById('delete-button')

const numbers = document.querySelectorAll('.calc-button-number')

const operations = document.querySelectorAll('.calc-button-math')

const equal = document.querySelector('#equal')

const result = document.getElementById('show-result')

const calc = document.querySelector('#pad-numbers')

const littleDisplay = document.getElementById('show-result-little')

const reset = '0'




calculatorApp.addEventListener('click', event => {

  if (!event.target.classList.contains('pad-button') ) return //Ukoliko smo kliknuli na neki elemenat koji nema klasu pad-button ne uraditi nista

  const operatorKeys = calculatorApp.querySelectorAll('.calc-button-math')


  const { previousKeyType } = calculatorApp.dataset   // Isto kao i previousKeyType = calculatorApp.dataset.previousKeyType


  const key = event.target //Button koji smo klinuli moze biti i operacija i broj 


  const keyValue = key.textContent // Vrijednost buttona koji smo kliknuli znaci 1,2,3 ili *,-,/

  const displayValue = result.textContent // Vrijednost displeja (pocetna je 0)

  const { type } = key.dataset // Vrsta dataseta koji je zakacen na kliknuti Button moze biti number operator i equal 
  //sa ovim govorimo da je type jednako key.dataset.type 

  let firstNumber = 0 

  let secondNumber = 0

  let operator = ''

  const {equasionDone} = calculatorApp.dataset

  let dot = false


  //Provjeriti da li je kljuc broj ?

  if (type === 'number') {

    if (displayValue === '0' || previousKeyType === 'operator' || equasionDone === 'true') {

     
      result.textContent = keyValue

      littleDisplay.innerText += keyValue

      calculatorApp.dataset.equasionDone = 'false'


    }

    else {

        result.textContent += keyValue

    
        littleDisplay.innerText += keyValue

      

    }

  }

  //Provjeriti da li je kljuc operator

  if (type === 'operator') {


    operatorKeys.forEach(operator => { operator.dataset.state = '' })

    key.dataset.state = 'selected'

    calculatorApp.dataset.firstNumber = displayValue

    console.log(checkForDot(displayValue))

    calculatorApp.dataset.operator = calculatorApp.querySelector('[data-state= "selected" ]').innerHTML

    littleDisplay.innerText += key.innerText


  }

  if (type === 'equal') {

    operatorKeys.forEach(operator => { operator.dataset.state = '' })

    firstNumber  = calculatorApp.dataset.firstNumber

    operator  = calculatorApp.dataset.operator

    secondNumber = displayValue

    result.innerText = calculate(firstNumber,operator,secondNumber)

    calculatorApp.dataset.equasionDone = 'true'

    if(littleDisplay.innerText == '') return

    littleDisplay.innerText = ''
    
  }

  if(type === 'delete') {


    firstNumber = secondNumber = calculatorApp.dataset.firstNumber = result.innerText = reset

    littleDisplay.innerText = ''

  }

  calculatorApp.dataset.previousKeyType = type



})


function calculate(firstNumber, operation, secondNumber) {

  firstNumber = parseFloat(firstNumber)
  secondNumber = parseFloat(secondNumber)


  let finalResult = ''

  if (operation === '+') finalResult = firstNumber + secondNumber
  if (operation === '-') finalResult = firstNumber - secondNumber
  if (operation === '*') finalResult = firstNumber * secondNumber
  if (operation === '/') finalResult = firstNumber / secondNumber

  return finalResult.toFixed(2)



}


function createNumber(arg) {

  const lastIndex = arg[arg.length-1]; 

  let sum =0 

  let ten = 10 

  for(let i = arg.length-2 ; i >=0 ; i--) {

    sum+=arg[i]*ten 

    ten*=10 


  }
  
  const number = sum+lastIndex

  return number

}


function checkForDot(arg) { 

  if(arg.includes('.')) return true

  else return false


 }









