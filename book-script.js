document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname.endsWith('dashboard.html')) {
        checkLogin();
        loadBooks();
    }
});

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    localStorage.setItem(username, password);
    alert('Registration successful');
    document.getElementById('register-form').reset();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    if (localStorage.getItem(username) === password) {
        localStorage.setItem('loggedInUser', username);
        location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
}

function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        location.href = 'book-index.html';
    }
}

const books = [
    { id: '1', name: 'JavaScript: The Good Parts', author: 'Douglas Crockford', available: true, rack: 'A1' },
    { id: '2', name: 'Eloquent JavaScript', author: 'Marijn Haverbeke', available: false, rack: '' },
    { id: '3', name: 'You Don’t Know JS', author: 'Kyle Simpson', available: true, rack: 'B3' }
];

function loadBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = books.map(book => {
        return `
            <div class="book-item">
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Name:</strong> ${book.name}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Available:</strong> ${book.available ? `Yes, Rack No: ${book.rack}` : 'No'}</p>
            </div>
        `;
    }).join('');
}

function searchBooks() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredBooks = books.filter(book => {
        return book.id.includes(query) || book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    });
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = filteredBooks.map(book => {
        return `
            <div class="book-item">
                <p><strong>ID:</strong> ${book.id}</p>
                <p><strong>Name:</strong> ${book.name}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Available:</strong> ${book.available ? `Yes, Rack No: ${book.rack}` : 'No'}</p>
            </div>
        `;
    }).join('');
}
