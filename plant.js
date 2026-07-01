// ===============================
// Plant Teacher - Part 3A
// Cart + Wishlist + Local Storage
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartTotal = document.getElementById("cartTotal");

// Save Data
function saveData() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Update Cart UI
function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartCount.textContent = "0";
        cartTotal.innerHTML = "<h3>Total : ₹0</h3>";
        saveData();
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

            </div>

            <div>

                <button onclick="decreaseQty(${index})">-</button>

                <span style="padding:10px;">${item.qty}</span>

                <button onclick="increaseQty(${index})">+</button>

            </div>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        `;
    });

    cartCount.textContent = cart.length;

    cartTotal.innerHTML = `<h3>Total : ₹${total}</h3>`;

    saveData();
}

// Add Cart
document.querySelectorAll(".add-cart").forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".shop-card");

        const name = card.querySelector("h3").innerText;

        const price = Number(
            card.querySelector(".price")
            .innerText.replace("₹", "")
        );

        const existing = cart.find(p => p.name === name);

        if (existing) {

            existing.qty++;

        } else {

            cart.push({

                name,
                price,
                qty:1

            });

        }

        updateCart();

        alert(name + " added to cart 🌱");

    });

});

// Wishlist
document.querySelectorAll(".wishlist").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const card = btn.closest(".shop-card");

        const name = card.querySelector("h3").innerText;

        if(!wishlist.includes(name)){

            wishlist.push(name);

            alert(name+" added to wishlist ❤️");

        }else{

            alert("Already in wishlist");

        }

        wishlistCount.textContent=wishlist.length;

        saveData();

    });

});

// Increase Qty
function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

// Decrease Qty
function decreaseQty(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

// Remove Item
function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// Initial Load
wishlistCount.textContent=wishlist.length;

updateCart();
// ===============================
// PART 3B
// Search + Dark Mode + Checkout
// Contact Form + Toast
// ===============================

// ---------- SEARCH ----------

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const cards=document.querySelectorAll(".shop-card");

cards.forEach(card=>{

const name=card.querySelector("h3").innerText.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ---------- DARK MODE ----------

const darkBtn=document.getElementById("darkModeBtn");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

darkBtn.innerHTML="☀";

}else{

localStorage.setItem("theme","light");

darkBtn.innerHTML="🌙";

}

});

}

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

if(darkBtn){

darkBtn.innerHTML="☀";

}

}

// ---------- CHECKOUT ----------

const checkout=document.getElementById("checkoutBtn");

if(checkout){

checkout.addEventListener("click",()=>{

if(cart.length===0){

alert("🛒 Your cart is empty!");

return;

}

let total=0;

cart.forEach(item=>{

total+=item.price*item.qty;

});

const ok=confirm(

"Total Amount : ₹"+total+

"\n\nProceed to Checkout?"

);

if(ok){

alert("🎉 Order Placed Successfully!");

cart=[];

updateCart();

localStorage.removeItem("cart");

}

});

}

// ---------- CONTACT FORM ----------

const form=document.getElementById("contactForm");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("✅ Message Sent Successfully!");

form.reset();

});

}

// ---------- WELCOME ----------

window.addEventListener("load",()=>{

console.log("Plant Teacher Loaded Successfully 🌱");

});
