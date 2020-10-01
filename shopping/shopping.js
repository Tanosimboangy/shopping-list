const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

//  we need to array to hold our state
// This is our state to store all objects that have been created
let items = [];

// This fuction runs the submit event
const handleSubmit = e  => {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return;
    const item = {
        name: name,
        id: Date.now(),
        complete: false,
    };
    // we push the new object into the items storage
    items.push(item);
    // Resetting the form after each event
    e.target.reset();
    // displayItems();
    // We create our own event called "itemsUpdated"
    // This event is the event from what we have done
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
};

// This is a function which generate the html according to the event we have lictened
const displayItems = () => {
    // We loop through the items first by using "Map()"
    const html = items
    .map(item => `<li class="shopping-item">
                    <input type="checkbox" value="${item.id}" ${item.complete ? 'checked' : ''}
                     >
                    <span class="itemName">${item.name}</span>
                    <button aria-label="Remove ${item.name}" 
                    value="${item.id}">&times;</button>
                </li>`).join('');
    // We insert the new html into html
    list.innerHTML = html;
}

// A function will handle the data from state

const mirrorToLocalStorage = () => {
    // Convert the state into a string and store it into local storeage
    localStorage.setItem('items', JSON.stringify(items));
}

// 
const restoreFromLocalStorage = () => {
    const lsItems = JSON.parse(localStorage.getItem('items'));
    // check if there is something inside local storage
    if (lsItems) {
        // push has no limit for arguments
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

// A function that returns all undeleted data from the local storage 
const deleteItem = id => {
    // this refers to the one id matched
    items = items.filter(item => item.id !== id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Finds the data according to its id and deletes it
const mardAsComplete = id => {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// listening to the event from the form
shoppingForm.addEventListener('submit', handleSubmit);
// listening the event and displaying the data
list.addEventListener('itemsUpdated', displayItems);
// listening the event and storing it inside of the local storage
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
        deleteItem(Number(e.target.value));
    }
    if (e.target.matches('input[type="checkbox"]')) {
        mardAsComplete(id);
    }
});

restoreFromLocalStorage();