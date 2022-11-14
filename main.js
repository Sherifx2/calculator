class Calculator{
    constructor(historyText,totalText){
        this.historyText=historyText
        this.totalText=totalText
        this.clear()
    }
    clear(){
        this.total=''
        this.history=''
        this.operation=undefined
    }
    delete(){
        this.total = this.total.toString().slice(0, -1)
    }
    appendNum(number){
        if (number === '.' && this.total.includes('.'))return
        this.total=this.total.toString() + number.toString()
    }
    plusMinus(){
        this.total = this.total * -1
    }
    chooseOperation(operation){
        if(this.total === '')return
        if(this.history !== ''){
            this.compute()
        }
        this.operation = operation
        this.history = this.total
        this.total = ''
    }
    compute(){
        let computation 
        const prev = parseFloat(this.history)
        const current = parseFloat(this.total)
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.total = computation
        this.operation = undefined
        this.history = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
  updateDisplay() {
    this.totalText.innerText =
      this.getDisplayNumber(this.total)
    if (this.operation != null) {
      this.historyText.innerText =
        `${this.getDisplayNumber(this.history)} ${this.operation}`
    } else {
      this.historyText.innerText = ''
    }
  }
}

const numBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const plusMinusBtn = document.querySelector('[data-plus-minus]')
const historyText = document.querySelector('[data-history]')
const totalText = document.querySelector('[data-total]')

const calculator = new Calculator(historyText,totalText)

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
plusMinusBtn.addEventListener('click', button => {
    calculator.plusMinus()
    calculator.updateDisplay()
})