// let AddBtnStatus = false
let AddTransaction = document.getElementById("add-transaction")
let TransactionList = []
// let TransactionDiv = document.getElementsByClassName('transactions-list')

// document.getElementById("add-btn").addEventListener("click", AddBtnClicked)
document.getElementById("add-trans").addEventListener("click", UpdateTransactionList)
document.getElementById("search-bar").addEventListener("input", SearchList)

// function AddBtnClicked(){
//     AddBtnStatus = !AddBtnStatus
//     if(AddBtnStatus){
//         AddTransaction.style.display = "block"
//         document.getElementById("add-btn").innerText = "X"
//     }
//     else{
//         AddTransaction.style.display = "none"
//         document.getElementById("add-btn").innerText = "ADD"
//     }
// }

function UpdateTransactionList(){
    let desc = document.getElementById('desc')
    let amount = document.getElementById("amount")
    let expense = document.getElementById("expense")
    let income = document.getElementById("income")
    let SearchBar = document.getElementById("search-bar")

    if(desc.value != "" && amount.value != ""){
        if(expense.checked == false && income.checked == false){
            alert("select income or an expense!")
        }
        else if(isNaN(Number(desc.value)) && typeof Number(amount.value) === "number"){
            TransactionList.push(
                {
                    desc:document.getElementById('desc').value,
                    Amount:parseInt(document.getElementById("amount").value),
                    type:document.getElementById("expense").checked ? "expense" : "income",
                    color:expense.checked ? "red" : "green"
                }
            )
            UpdateBalance()
            UpdateTransactionListUI(TransactionList)
            ClearForm(SearchBar)
        }
        else{
           alert("Invalid Input")
        }
    }
}

function ClearForm(SearchBar){
    desc.value = null
    amount.value = null
    expense.checked = false
    income.checked = false
    SearchBar.value = null
    SearchList()
}

function UpdateBalance(){
    let transaction = TransactionList.pop()
    if(transaction.type == "income"){
        let total =  parseInt(document.getElementById("balance").textContent) + transaction.Amount
        document.getElementById("balance").textContent = total.toString()
        UpdateIncome(transaction)
        TransactionList.push(transaction)
    }
    else{
        let total = parseInt(document.getElementById("balance").textContent) - transaction.Amount 
        if(total >= 0){
            document.getElementById("balance").textContent = total.toString()
            UpdateExpense(transaction)
            TransactionList.push(transaction)
        }
        else{
            alert("You can't Afford that!")
        }
    }
}

function UpdateExpense(transaction){
    let element = document.getElementById("exp")
    total = parseInt(element.textContent) + transaction.Amount
    element.textContent = total.toString()
}

function UpdateIncome(transaction){
    let element = document.getElementById("inc")
    total = parseInt(element.textContent) + transaction.Amount
    element.textContent = total.toString()
}

function UpdateTransactionListUI(Transactions){
    let element = document.getElementById("transactions-list")
    let last_entry = Transactions.pop()
    element.innerHTML += '<div class="relative bg-white border-2 border-t-0 border-gray-200 rounded my-2 flex justify-between"><h4 class = "text-center py-1 text-lg pl-3 font-semibold">'+last_entry.desc+'</h4><p class = "pr-3 py-1 text-lg font-semibold">$'+last_entry.Amount+'</p><span class="absolute w-1 h-full bg-'+last_entry.color+'-400 right-0"></span></div>'
    Transactions.push(last_entry)
}

function SearchList(){
    let SearchBar = document.getElementById("search-bar")
    let element = document.getElementById("transactions-list")
    if(SearchBar.value == ""){
        element.innerHTML = null
        for(let i=0; i<TransactionList.length; i++){
            element.innerHTML += '<div class="relative bg-white border-2 border-t-0 border-gray-200 rounded my-2 flex justify-between"><h4 class = "text-center py-1 text-lg pl-3 font-semibold">'+TransactionList[i].desc+'</h4><p class = "pr-3 py-1 text-lg font-semibold">$'+TransactionList[i].Amount+'</p><span class="absolute w-1 h-full bg-'+TransactionList[i].color+'-400 right-0"></span></div>'
        }
    }
    else{
        element.innerHTML = null
        for(let i=0; i<TransactionList.length; i++){
            if(TransactionList[i].desc.toLowerCase().search(SearchBar.value.toLowerCase()) != -1){
                element.innerHTML += '<div class="relative bg-white border-2 border-t-0 border-gray-200 rounded my-2 flex justify-between"><h4 class = "text-center py-1 text-lg pl-3 font-semibold">'+TransactionList[i].desc+'</h4><p class = "pr-3 py-1 text-lg font-semibold">$'+TransactionList[i].Amount+'</p><span class="absolute w-1 h-full bg-'+TransactionList[i].color+'-400 right-0"></span></div>'
            }
        }
    }
}
