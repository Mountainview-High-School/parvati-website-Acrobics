const menu = {
  "Coffees": ["Cappuccino", "Flat White", "Latte", "Mocha", "Long Black", "Hot Choc", "Chai Latte"],
  "Pastries": ["Croissant", "Apple Strudel", "Sausage Roll", "Cronut", "Danish", "Macaron", "Profiterole"],
  "Sandwiches": ["B&E", "BLT", "CCA", "Club", "H&C", "The Beast"],
  "Wraps": ["Aioli", "Ranch", "Sweet Chilli", "Veggie"]
}

const flavors = ["Vanilla", "Caramel", "Hazelnut", "White Choc", "Butterscotch", "Peppermint"]

const orderContainer = document.getElementById("order-container")
const orderSummary = document.getElementById("order-summary")

function createOptionElement(value, text) {
  const option = document.createElement("option")
  option.value = value
  option.textContent = text
  return option
}

function populateCategorySelector() {
  const categorySelects = document.querySelectorAll(".category-select")
  for (const category in menu) {
    const option = createOptionElement(category, category)
    categorySelects.forEach((select) => select.appendChild(option.cloneNode(true)))
  }
}

function updateItems(categorySelect) {
  const itemSelect = categorySelect.nextElementSibling
  itemSelect.disabled = false
  itemSelect.innerHTML = ""

  const selectedCategory = categorySelect.value
  const items = menu[selectedCategory]
  for (const item of items) {
    const option = createOptionElement(item, item)
    itemSelect.appendChild(option)
  }

  const flavorSelect = categorySelect.parentNode.querySelector(".flavor-select")
  if (selectedCategory === "Coffees") {
    addFlavorOption(flavorSelect)
    flavorSelect.disabled = false
  } else {
    flavorSelect.selectedIndex = 0
    flavorSelect.disabled = true
  }
}

function addFlavorOption(flavorSelect) {
  flavorSelect.innerHTML = ""
  const flavorOptionNone = createOptionElement("None", "None")
  flavorSelect.appendChild(flavorOptionNone)

  for (const flavor of flavors) {
    const flavorOption = createOptionElement(flavor, flavor)
    flavorSelect.appendChild(flavorOption)
  }
}

function updateRemoveButtons() {
  const itemRows = document.querySelectorAll(".item-row")
  const removeBtns = document.querySelectorAll(".remove-btn")

  if (itemRows.length > 1) {
    removeBtns.forEach((btn) => (btn.style.display = "block"))
  } else {
    removeBtns.forEach((btn) => (btn.style.display = "none"))
  }
}

function addItem() {
  const newItemRow = orderContainer.firstElementChild.cloneNode(true)
  const categorySelect = newItemRow.querySelector(".category-select")
  const itemSelect = newItemRow.querySelector(".item-select")

  categorySelect.selectedIndex = 0
  itemSelect.selectedIndex = 0
  itemSelect.disabled = true

  orderContainer.appendChild(newItemRow)

  // Update the "Remove" buttons visibility after adding the new item
  updateRemoveButtons()
}

function removeItem(removeButton) {
  const itemRow = removeButton.parentNode
  orderContainer.removeChild(itemRow)

  // Update the "Remove" buttons visibility after removing an item
  updateRemoveButtons()
}

function showOrder() {
  const items = orderContainer.querySelectorAll(".item-row")
  let orderText = "<div class=\"submittedOrder\"> <strong>YOUR ORDER:</strong><br>"

  items.forEach((item) => {
    const categorySelect = item.querySelector(".category-select")
    const itemSelect = item.querySelector(".item-select")
    const flavorSelect = item.querySelector(".flavor-select")

    const selectedCategory = categorySelect.value
    const selectedItem = itemSelect.value
    const selectedFlavor = flavorSelect ? flavorSelect.value : "None"

    if (selectedCategory && selectedItem) {
      orderText += `${selectedItem}`
      if (selectedCategory === "Coffees" && selectedFlavor !== "None") {
        orderText += ` (with ${selectedFlavor} shot)`
      }
      orderText += "<br>"
    }
    
  }
  )
  orderText += "</div>"
  orderSummary.innerHTML = orderText

  // Show or hide the "Submit" button based on the order status
  const submitBtn = document.querySelector(".submit-btn")
  if (items.length > 0) {
    submitBtn.style.display = "block"
  } else {
    submitBtn.style.display = "none"
  }
}

function submitOrder() {
  alert("Your order has been submitted! \n (...not really)")
}

populateCategorySelector()
updateRemoveButtons()
