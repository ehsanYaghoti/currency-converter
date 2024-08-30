const fromCurrencySelect = document.getElementById('from') as HTMLSelectElement
const toCurrencySelect = document.getElementById('to') as HTMLSelectElement
const amountInput = document.getElementById('amount') as HTMLInputElement
const resultElement = document.getElementById('result') as HTMLParagraphElement
const form = document.getElementById('converter-form') as HTMLFormElement 


currency_list.forEach((currency , index) => {

    const currencyCode = currency[0]
    const currencyCountry = currency[1]

    const option = document.createElement('option')

    option.id = `currency-${index}`
    
    option.innerHTML = `<div class="option" >
        <span>${currencyCode}</span>
        <span>- ${currencyCountry}</span>
    </div>`
    
    option.value = currencyCode

    if(currencyCode === 'USD'){
        option.selected = true
    }

    fromCurrencySelect?.appendChild(option)

    const newOptionTo = option.cloneNode(true) as  HTMLOptionElement
    
    if(currencyCode === 'IRR'){
        newOptionTo.selected = true
    }

    toCurrencySelect?.appendChild(newOptionTo)

})

document.getElementById('switchCurrency')?.addEventListener('click' , (e : Event) => {
    e.preventDefault();

    const fromValue = fromCurrencySelect.value
    fromCurrencySelect.value = toCurrencySelect.value
    toCurrencySelect.value = fromValue

})


async function fetchData(){
    try {

        const response = await fetch(API_URL)
        const json = await response.json()

        return json.rates    
    } catch (error : any) {
        console.log(error)
        resultElement.classList.add('error')
        resultElement.innerHTML = 'there is some thing wrong with fetching data!!!'
    }
}

function isNumber(x : any) {
    return !isNaN(x) && !isNaN(parseInt(x));
}

function amountValidation(){
    const value = amountInput.value

    const validationMessage = document?.getElementById('validationMessage')!

    if(!isNumber(value) ){
        validationMessage.textContent = 'please inter valid amount'
        return false
    } else {
        validationMessage.textContent = ''
        return true
    }
}

amountInput.addEventListener('input' , () => amountValidation())

form.addEventListener('submit' , async (e) => {
    e.preventDefault();

    // loading
    resultElement.innerHTML = `<span class="spinner" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    </span>`

    // check if amont is valid then fetch and convert
    if(! amountValidation()){
        resultElement.classList.add('error')
        resultElement.innerHTML ='please inter valid amount' 
    } else if(amountValidation()) {
        const rates = await fetchData()

        const fromCurrency  = fromCurrencySelect.value
        const toCurrency = toCurrencySelect.value
        const amount = amountInput.value

        const result = +amount * (rates[toCurrency] / rates[fromCurrency])

        let resultFixed = `${1 * +result.toFixed(7).replace(/\.0+$/, '')}`
        resultFixed =resultFixed.toString().replace(/\B(?=(\d{3})+(?!\d)\.)/g, ",")

        resultElement.innerHTML = ` <span class="result__from" >${amount} ${fromCurrency} =</span> <span class="result__to" >${resultFixed} ${toCurrency}</span>`
    }
})