// ===============================
// PAYMENT PAGE JS
// ===============================

// Coupon logic
function applyCoupon() {

    const code = document.getElementById("coupon").value;
    const msg = document.getElementById("couponMessage");

    if (code === "WELCOME10") {
        msg.innerText = "10% Discount Applied 🎉";
        msg.style.color = "green";
    }
    else if (code === "PLANT50") {
        msg.innerText = "₹50 Discount Applied 🎉";
        msg.style.color = "green";
    }
    else {
        msg.innerText = "Invalid Coupon ❌";
        msg.style.color = "red";
    }
}

// Place Order
function placeOrder() {

    const agree = document.getElementById("agree");

    if (!agree.checked) {
        alert("Please accept Terms & Conditions");
        return;
    }

    // Generate Order ID
    const orderId = "PT" + Math.floor(Math.random() * 1000000);

    // Delivery date (fake)
    const today = new Date();
    today.setDate(today.getDate() + 5);

    const deliveryDate = today.toDateString();

    alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Order ID: " + orderId + "\n" +
        "Estimated Delivery: " + deliveryDate
    );

    // Reset form
    document.querySelectorAll("input, textarea").forEach(el => {
        if (el.type !== "radio" && el.type !== "checkbox") {
            el.value = "";
        }
    });

    document.getElementById("agree").checked = false;
    document.getElementById("couponMessage").innerText = "";
}