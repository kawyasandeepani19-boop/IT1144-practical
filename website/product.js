function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('glowyyCart')) || [];
    cart.push(productName);
    localStorage.setItem('glowyyCart', JSON.stringify(cart));
    alert(`🎉 ${productName} successfully added to your cart!`);
}


function buyNow(productName, price) {
    alert(`🛍️ Thank you for your interest!\n\nYour order for "${productName}" ($${price}) has been placed successfully.\nOur team will contact you soon for shipping details! 🎉`);
}