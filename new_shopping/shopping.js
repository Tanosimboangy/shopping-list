const shopppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

// For storing the data
// const items = [];
let items = [];

function handleClick(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    const item = {
        name: name,
        id: Date.now(),
        complete: false,
    }
    // Push the item into the items
    items.push(item);
    // Either e.target or e.currentTarget are doing the same thing
    e.target.reset();
    // e.currentTarget.reset();
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const html = items.map(item => `<li class="shopping-item">
    <input ${item.complete ? "checked" : ""} value="${item.id}" type="checkbox">
    <spapn class="itemName">${item.name}</span>
    <button value="${item.id}" aria-label="Remove ${item.name}">&times;</button>
    </li>
    `)
    .join(' ');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
    listItems = JSON.parse(localStorage.getItem("items"));
    if(listItems) {
        items.push(...listItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItems(id) {
    console.log("DELTE ITEMS FOR NOW", id);
    items = items.filter(item => item.id !== id);
    console.log(items);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

function markAsComplete(id) {
    console.log("DELTE ITEMS FOR NOW", id);
    const itemsRef = items.find(item => item.id == id);
    itemsRef.complete = !itemsRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shopppingForm.addEventListener("submit", handleClick);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrorToLocalStorage);
list.addEventListener("click", function(e) { 
    if(e.target.matches("button")) {
        deleteItems(parseInt(e.target.value));
    }
    if(e.target.matches("input[type='checkbox']")) {
        markAsComplete(parseInt(e.target.value));
    }
});

restoreFromLocalStorage();