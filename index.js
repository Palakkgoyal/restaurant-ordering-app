import { menuArray } from "./data.js"

const menu = document.getElementById("menu")
const orderSummary = document.getElementById("order-summary")
const completeOrderBtn = document.getElementById("complete-order-btn")
const cardDetailsContainer = document.getElementById("card-details-container")
const thanksNote = document.getElementById("thanks-note")

const order = {}

document.addEventListener("click", function(e) {
    if(e.target.dataset.addItem) {
        const itemId = e.target.dataset.addItem
        addItem(itemId)
    } else if(e.target.dataset.removeItem) {
        removeItem(e.target.dataset.removeItem)
    } else if(e.target.id === "complete-order-btn") {
        showItem(cardDetailsContainer)
    } else if(e.target.id === "cross-btn") {
        hideItem(cardDetailsContainer)
    }
})

document.querySelector("form").addEventListener("submit", pay)

function pay(e) {
    e.preventDefault()
    document.getElementById("order-giver-name").textContent = document.getElementById("name").value
    hideItem(orderSummary)
    showItem(thanksNote)
    hideItem(cardDetailsContainer)
}

function showItem(item) {
    item.style.display = "block"
}

function hideItem(item) {
    item.style.display = "none"
}

function removeItem(itemId) {
    delete order[itemId]
    
    if(isEmpty(order)) {
        orderSummary.style.display = "none"
    } else {
        renderOrderSummary()
    }
}

function addItem(itemId) {
        if(order[itemId]){
            order[itemId] += 1   
        } else {
            order[itemId] = 1
        }
        hideItem(thanksNote)
        renderOrderSummary()
}

function isEmpty(obj) {
    if(!obj) {
        throw new Error("Provide an object as argument")
    }
    return Object.keys(obj).length === 0;
}

function renderOrderSummary() {
    orderSummary.style.display = "block"
    const orderContainer = document.getElementById("order-container")
    orderContainer.innerHTML = ""
    let totalPrice = 0;
    
    const itemIdArr = Object.keys(order)
    itemIdArr.forEach((id) => {
        const item = menuArray.filter(item => item.id == id)[0]
        const { name, price } = item
        
        const li = document.createElement("li")
        li.classList.add("order-item")
        
        const h5 = document.createElement("h5")
        h5.textContent = `${name} (${order[id]})`
        li.appendChild(h5)
        
        const button = document.createElement("button")
        button.textContent = "remove"
        button.setAttribute("data-remove-item", id)
        li.appendChild(button)
        
        const orderPrice = price * Number(order[id])
        totalPrice += orderPrice
        
        const p = document.createElement("p")
        p.textContent = `$${orderPrice}`
        li.appendChild(p)
        
        orderContainer.appendChild(li)
    })
    
    document.getElementById("total-price-el").textContent = `$${totalPrice}`
}

function renderMenu() {
     menuArray.forEach((item) => {
        const { name, ingredients, id, price, emoji, image, altText } = item
        const section = document.createElement("section")
        section.classList.add("menu-item")
        
        const img = document.createElement("img")
        img.setAttribute("src", image)
        img.setAttribute("alt", altText)
        img.classList.add("menu-item-img")
        section.appendChild(img)
        
        const div = document.createElement("div")
        section.appendChild(div)
        
        const h3 = document.createElement("h3")
        h3.classList.add("item-name")
        h3.textContent = name
        div.appendChild(h3)
        
        const p = document.createElement("p")
        p.classList.add("item-ingredients")
        p.textContent = ingredients.join(", ")
        div.appendChild(p)
        
        const h4 = document.createElement("h4")
        h4.classList.add("item-price")
        h4.textContent = `$${price}`
        div.appendChild(h4)
        
        const button = document.createElement("button")
        button.setAttribute("data-add-item", id)
        button.classList.add("add-item-btn")
        button.textContent = "+"
        section.appendChild(button)
        
        menu.appendChild(section)
    })
}

renderMenu()