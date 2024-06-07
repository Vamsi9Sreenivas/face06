const books = [
    // Example books
    { id: '1', name: 'Action Book 1', author: 'Author 1', genre: 'action', available: true, rack: 'A1', price: 500 },
    { id: '2', name: 'Comedy Book 1', author: 'Author 2', genre: 'comedy', available: false, price: 300 },
    { id: '3', name: 'The Maze Runner', author: 'James Dashner', genre: 'action', available: false, rack: '', price: '400' },
    { id: '4', name: 'Red Rising', author: 'Pierce Brown', genre: 'action', available: true, rack: 'A3', price: '450' },
    { id: '5', name: 'Legend', author: 'Marie Lu', genre: 'action', available: false, rack: '', price: '300' },
    // Comedy
    { id: '6', name: 'Good Omens', author: 'Neil Gaiman & Terry Pratchett', genre: 'comedy', available: true, rack: 'B1', price: '500' },
    { id: '7', name: 'Catch-22', author: 'Joseph Heller', genre: 'comedy', available: true, rack: 'B2', price: '550' },
    { id: '8', name: 'The Hitchhiker’s Guide to the Galaxy', author: 'Douglas Adams', genre: 'comedy', available: false, rack: '', price: '600' },
    { id: '9', name: 'Bossypants', author: 'Tina Fey', genre: 'comedy', available: true, rack: 'B3', price: '650' },
    { id: '10', name: 'Is Everyone Hanging Out Without Me?', author: 'Mindy Kaling', genre: 'comedy', available: false, rack: '', price: '700' },
];

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!username || !password || username.toLowerCase() === 'error' || password.toLowerCase() === 'error') {
        alert('Error! Please enter valid username and password.');
        return;
    }

    localStorage.setItem(username, password);
    alert('Registration successful');
    document.getElementById('register-form').reset();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedPassword = localStorage.getItem(username);

    if (!storedPassword || storedPassword !== password) {
        alert('Error! Please use valid username and password.');
        return;
    }

    localStorage.setItem('loggedInUser', username);
    location.href = 'dashboard.html';
}

function logout() {
    localStorage.removeItem('loggedInUser');
    location.href = 'login.html';
}

function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        location.href = 'login.html';
    }
}

function loadBooks(filteredBooks) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = filteredBooks.map(book => {
        return `
            <div class="book-item">
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Name:</strong> ${book.name}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Available:</strong> ${book.available ? `Yes, Rack No: ${book.rack}` : 'No'}</p>
                <p><strong>Price:</strong> INR ${book.price}</p>
                <div class="actions">
                    ${book.available ? `<button onclick="buyNow(${book.id})">Buy Now</button>` : ''}
                    <button onclick="addToCart(${book.id})">Add to Cart</button>
                    <button onclick="preview(${book.id})">Preview</button>
                </div>
            </div>
        `;
    }).join('');
}

function searchBooks() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const genreElement = document.querySelector('.custom-select-trigger span');
    const genre = genreElement.textContent.toLowerCase() === 'select genre' ? '' : genreElement.textContent.toLowerCase();
    const filteredBooks = books.filter(book => {
        const matchesQuery = book.id.includes(query) || book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
        const matchesGenre = genre ? book.genre === genre : true;
        return matchesQuery && matchesGenre;
    });

    if (filteredBooks.length === 0) {
        loadBooks(books.filter(book => book.genre === genre));
    } else {
        loadBooks(filteredBooks);
    }
}

function buyNow(bookId) {
    alert(`You have selected to buy the book with ID: ${bookId}`);
}

function addToCart(bookId) {
    alert(`Book with ID: ${bookId} has been added to your cart`);
}

function preview(bookId) {
    alert(`Previewing book with ID: ${bookId}`);
}

document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname.endsWith('dashboard.html')) {
        checkLogin();
        loadBooks(books); // Load all books initially
    }

    document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
    });

    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select-trigger span').textContent = this.textContent;
            }
        });
    }

    window.addEventListener('click', function(e) {
        const select = document.querySelector('.custom-select');
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });
});
