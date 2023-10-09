import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-88260-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList")

const shoppingListEl = document.getElementById("shopping-list")
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;

    push(shoppingListDB, inputValue);

    clearInputFieldEl()
    appendItemToShoppingListEl(inputValue)

    console.log(inputValue);
});

let clearInputFieldEl = () => {
    inputFieldEl.value = ""
};

let appendItemToShoppingListEl = (itemValue) => {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
};
