import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val());

        clearShoppingListEl();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem);
        }
    }else {
        shoppingListEl.innerHTML = "No items here.... yet"
    }
    
});

const clearInputFieldEl = () => {
    inputFieldEl.value = "";
};

const appendItemToShoppingListEl = (item) => {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    shoppingListEl.append(newEl)

    newEl.addEventListener("click", () => {
        deleteItemFromFirebase(itemID)
    })

};

const deleteItemFromFirebase = (itemKey) => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemKey}`)
    remove(exactLocationOfItemInDB)
}

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = "";
};
