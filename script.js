let AddBtnStatus = false
let AddTransaction = document.getElementById("add-transaction")
let TransactionList = [
    {desc:"Salary", Amount:10000, type:"income"},
    {desc:"Cinema", Amount:50, type:"expense"}
]
let TransactionDiv = document.getElementsByClassName('transactions-list')

document.getElementById("add-btn").addEventListener("click", AddBtnClicked)
document.getElementById("add-trans").addEventListener("click", UpdateTransactionList)
document.getElementById("search-bar").addEventListener("input", SearchList)

function AddBtnClicked(){
    AddBtnStatus = !AddBtnStatus
    if(AddBtnStatus){
        AddTransaction.style.display = "block"
        document.getElementById("add-btn").innerText = "X"
    }
    else{
        AddTransaction.style.display = "none"
        document.getElementById("add-btn").innerText = "ADD"
    }
}

function UpdateTransactionList(){
    TransactionList.push(
        {
            desc:document.getElementById('desc').value,
            Amount:parseInt(document.getElementById("amount").value),
            type:document.getElementById("expense").checked ? "expense" : "income"
        }
    )
    document.getElementById('desc').value = null
    document.getElementById("amount").value = null
    document.getElementById("expense").checked = false
    document.getElementById("income").checked = false

    UpdateBalance()
    // UpdateTransactionListUI()

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
            alert("You can't Afford that Expense")
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

function SearchList(){
    for(let i=0; i<TransactionList.length; i++){
        TransactionList[i].desc.toLowerCase().search(document.getElementById("search-bar").value.toLowerCase()) != -1 ? console.log(TransactionList[i].desc) : console.log(i)
    }
}
