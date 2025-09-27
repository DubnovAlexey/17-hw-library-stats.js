const library = [];

// --- НОВАЯ ФУНКЦИЯ: ОБНОВЛЕНИЕ СТАТИСТИКИ ---
function updateStats() {
    const years = library.map(book => +book.year);
    const total = library.length;

    // Общее количество книг
    document.getElementById('totalBooks').textContent = total;

    if (total === 0) {
        document.getElementById('oldestYear').textContent = 'N/A';
        document.getElementById('newestYear').textContent = 'N/A';
        document.getElementById('averageYear').textContent = 'N/A';
        return;
    }
    // Средний год
    const sum = years.reduce((acc, year) => acc + year, 0);
    const avg = (sum / total).toFixed(0);
    document.getElementById('avgYear').textContent = avg;

    // Минимальный и максимальный год
    const min = Math.min(...years);
    const max = Math.max(...years);
    document.getElementById('minYear').textContent = min;
    document.getElementById('maxYear').textContent = max;
}
//---------------------------

addBook.onclick = function () {
    if (findBook(library, isbn.value) === -1) {
        const book = new Book(isbn.value, title.value, author.value, year.value);
        library.push(book);
        const li = document.createElement('li');

        const buttonDel = createButtonDel(() => {
            const index = findBook(library, book.isbn);
            if (index !== -1) {
                library.splice(index, 1);
            }
            updateStats(); // Обновляем статистику после удаления
        });
        li.append(book.toString(), buttonDel);
        result.append(li);
        updateStats(); // Обновляем статистику после добавления
    } else {
        alert(`Book with isbn = ${isbn.value} exists`);
    }
    isbn.value = title.value = author.value = year.value = '';
}


function findBook(library, isbn) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].isbn === isbn) {
            return i;
        }
    }
    return -1;
}

function Book(isbn, title, author, year) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.year = +year;
    this.toString = function () {
        return `ISBN: ${this.isbn}, Title: ${this.title}, Author: ${this.author}, Year of publishing: ${this.year}`
    }
}