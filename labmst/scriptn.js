let total = 0;
let selectedItem = null;

function addExpense(){

let name = document.getElementById("name").value;
let amount = document.getElementById("amount").value;
let category = document.getElementById("category").value;

let list = document.getElementById("list");

let li = document.createElement("li");

li.innerHTML = name + " - ₹" + amount + " - " + category +
" <button onclick='editExpense(this)'>Edit</button> " +
" <button onclick='deleteExpense(this)'>Delete</button>";

list.appendChild(li);

total = total + Number(amount);

document.getElementById("total").innerHTML = total;

}

function editExpense(btn){

selectedItem = btn.parentElement;

let text = selectedItem.innerText.split(" - ");

document.getElementById("name").value = text[0];
document.getElementById("amount").value = text[1].replace("₹","");
document.getElementById("category").value = text[2];

}

function updateExpense(){

if(selectedItem == null) return;

let name = document.getElementById("name").value;
let amount = document.getElementById("amount").value;
let category = document.getElementById("category").value;

selectedItem.firstChild.textContent =
name + " - ₹" + amount + " - " + category + " ";

}

function deleteExpense(btn){

let li = btn.parentElement;

let amount = li.innerText.split("₹")[1];

total = total - Number(amount);

document.getElementById("total").innerHTML = total;

li.remove();

}