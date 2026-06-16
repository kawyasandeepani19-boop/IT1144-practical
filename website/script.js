document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. SEARCH BAR LOGIC ---
    const searchBox = document.getElementById('searchBox');
    const resultsContainer = document.getElementById('results');
    const productElements = document.querySelectorAll('.product');
    const products = [];
    
    productElements.forEach(el => {
        products.push({
            name: el.getAttribute('data-name').toLowerCase(),
            url: el.getAttribute('data-url'),
            img: el.getAttribute('data-img')
        });
    });

    if (searchBox && resultsContainer) {
        searchBox.addEventListener('input', function() {
            const query = searchBox.value.toLowerCase().trim();
            resultsContainer.innerHTML = ''; 

            if (query === '') {
                resultsContainer.style.display = 'none';
                return;
            }

            const filteredProducts = products.filter(p => p.name.includes(query));

            if (filteredProducts.length > 0) {
                resultsContainer.style.display = 'block';
                filteredProducts.forEach(product => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <img src="${product.img}" width="35" height="35" style="border-radius:4px; object-fit:cover; margin-right:10px;">
                        <a href="${product.url}" style="text-decoration:none; color:#333; font-weight:500; text-transform:capitalize;">${product.name}</a>
                    `;
                    resultsContainer.appendChild(item);
                });
            } else {
                resultsContainer.style.display = 'block';
                resultsContainer.innerHTML = '<p style="padding:8px; color:#999; font-size:12px; text-align:center; margin:0;">No products found</p>';
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (searchBox && !searchBox.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });

    // --- 2. CART SIDEBAR LOGIC ---
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeBtn = document.getElementById('closeBtn');

    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.style.right = '0px'; 
            displayCartItems(); 
        });
    }

    if (closeBtn && cartSidebar) {
        closeBtn.addEventListener('click', function() {
            cartSidebar.style.right = '-350px'; 
        });
    }

    updateCartCount(); 
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('glowyyCart')) || [];
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
    }
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('glowyyCart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">No items added</p>';
    } else {
        cartItemsContainer.innerHTML = ''; 
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.padding = '12px 0';
            itemDiv.style.borderBottom = '1px solid #eee';
            itemDiv.innerHTML = `
                <span style="font-size:14px; color:#3b3232; font-weight:500;">✨ ${item}</span>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:12px; font-weight:600;">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
        
        const clearBtn = document.createElement('button');
        clearBtn.innerText = 'Clear All';
        clearBtn.style.width = '100%';
        clearBtn.style.marginTop = '20px';
        clearBtn.style.padding = '12px';
        clearBtn.style.background = '#4a3f3f';
        clearBtn.style.color = 'white';
        clearBtn.style.border = 'none';
        clearBtn.style.borderRadius = '25px';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.fontWeight = '600';
        clearBtn.onclick = clearCart;
        cartItemsContainer.appendChild(clearBtn);
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('glowyyCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('glowyyCart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem('glowyyCart');
    displayCartItems();
    updateCartCount();
}

function showMessage() { alert("Hello! Welcome to Glowyy Beauty."); }
function changeColor() { document.body.style.backgroundColor = "#f0e4e4"; }