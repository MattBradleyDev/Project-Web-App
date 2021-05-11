class Drink {
    // Created a data structure to hold information about the current drink
    constructor(type, milk, size, sugar, syrup, cream, price) {
        this.type = type;
        this.milk = milk;
        this.size = size;
        this.sugar = sugar;
        this.syrup = syrup;
        this.cream = cream;
        this.price = price;
    }
}

function addEventListeners() {
    // Adds event listeners for both of the buttons on screen
    let addDrink = document.getElementById("addDrink");
    addDrink.addEventListener("click", addDrinkToOrder);

    let placeOrder = document.getElementById("placeOrder");
    placeOrder.addEventListener("click", completeOrder);
}

function updateSliderText(val, id) {
    // Updates the text box next to the slider based on id and value
    document.getElementById(id).value=val; 
  }

  function addUpdateFunction() {
    // Adds event listeners for all input fields to update the display when they change
    let inputs = document.querySelectorAll('input');
    for (let i=0; i<inputs.length; i++) {
        inputs[i].addEventListener("change", displayOrder);
    }

}


function hideMilkTab(hideTab) {
    // Finds the milk table and removes display if milk is not required
    // Will automatically set field to "none" if milk is not needed
    let milkTab = document.getElementById('milkType');
    if (hideTab) {
        milkTab.style.display = 'none';
        document.getElementById('none').checked = true;
    }
    else {
        milkTab.style.display = 'block';
    }

}

function updatePrice(size, syrup, cream) {
    // Will add up pricing per element of the current order
    let price = 0;
    switch (size) {
        case "small":
            price += 2.45;
            break;
        case "medium":
            price += 2.65;
            break;
        case "large":
            price += 2.85;
    }
    if (cream) {
        price += 0.5;
    }
    price += (syrup * 0.25);
    return price;

}

function getCurrentDrink() {
    // Checks if the type field is selected as this is the only one that can start blank
    let type = document.querySelector("input[name='type']:checked");
    if (type != null) {
        type = type.value;
    }
    else {
        // Will not continue if there is not a complete order
        return false
    }
    // Gets the current drink attributes from the input fields in the document and creates an object
    type = document.querySelector("input[name='type']:checked").value;
    let milk = document.querySelector("input[name='milk']:checked").value;
    let sizeTab = document.getElementById('size');
    let size = sizeTab.options[sizeTab.selectedIndex].value;
    let sugar = document.getElementById('sugar').value;
    let syrup = document.getElementById('syrup').value;
    let cream = false;
    if (document.getElementById('cream').checked) {
        cream = true;
    }
    let price = updatePrice(size, syrup, cream);
    let drink = new Drink(type, milk, size, sugar, syrup, cream, price);
    return drink;
}

function displayOrder() {
    // Changes HTML text to the current order while being changed

    d = getCurrentDrink()
    if (d != false) {
        let cream = (d.cream===true) ? 'with' : 'without';
        document.getElementById('costText').innerHTML = `Current Cost: £${d.price.toFixed(2)}<br>${d.size} ${d.type} with ${d.milk} milk ${cream} cream<br>&emsp;${d.sugar} Sugars,<br>&emsp;${d.syrup} syrup shots`;
    }
    // Forms an unordered list with html tags for the drink order to be displayed well
    textString = `<ul>`;
    totalPrice = 0;
    for (let i=0; i<drinksOrder.length; i++) {
        let d = drinksOrder[i];
        let cream = (d.cream===true) ? 'with' : 'without';
        textString += `<li>(£${d.price.toFixed(2)}) ${d.size} ${d.type} with ${d.milk} milk, ${cream} cream, ${d.sugar} sugar, ${d.syrup} syrup shots.</li>`;
        totalPrice += d.price;
    }
    textString += `</ul><u>£${totalPrice.toFixed(2)}</u>`;
    document.getElementById('orderText').innerHTML = textString;

}

function resetForms() {
    // This will reset each form to the state when the page loaded
    document.getElementById('typeForm').reset();
    document.getElementById('sizeForm').reset();
    document.getElementById('milkForm').reset();
    document.getElementById('extraForm').reset();
    document.getElementById('costText').innerHTML = "Current Cost: £0.00";
}


function addDrinkToOrder() {
    // Accesses the global order array to hold the drinks to add in the drink object. This will then reset the order
    let drink = getCurrentDrink()
    if (drink != false) {
        drinksOrder.push(drink)
        resetForms();
        displayOrder(drink);
    }
    console.log(drinksOrder);
}

function completeOrder() {
    // Gives the user a notification and resets the whole program
    alert("Thank you for your custom");
    drinksOrder = [];
    resetForms();
    displayOrder();
}

// Instantiates the program in main
addEventListeners();
addUpdateFunction();

var drinksOrder = [];