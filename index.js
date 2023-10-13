import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-88260-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");
const addButtonEl = document.getElementById("add-button");

addButtonEl.addEventListener("click", () => {
   const inputValue = inputFieldEl.value;

    push(shoppingListDB, inputValue);

    clearInputFieldEl();
});

onValue(shoppingListDB, (snapshot) => {
    const itemsArray = Object.values(snapshot.val());
    
     clearShoppingListEl();
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i]);
    }
});

const clearInputFieldEl = () => {
    inputFieldEl.value = "";
};

const appendItemToShoppingListEl = (itemValue) => {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
};

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = "";
};
