//Button for new books top right
const newBookButton = document.getElementById("add-new-book");

//Gets the Dialog element of the page using ID
const dialog = document.getElementById("dialog")
//These are all the inputs from the dialog
const dialogInputArray = document.querySelectorAll("input");
const userForm = document.getElementById("user-form")
const template = document.getElementById("template");

let myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead() {
        this.isRead = this.isRead === "read" ? "not-read" : "read";
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBook(book);
}

addBookToLibrary("1984", "George Orwell", 328, "read");
addBookToLibrary("The 48 Laws of Power", "Robert Greene", 480, "not-read");
addBookToLibrary("Calm", "The School of Life", 480, "not-read");


function displayBook(book) {
    console.log(book)
    const newBookCard = template.cloneNode(true);
    newBookCard.removeAttribute("id");
    // Setting an attribute to the title so we can remove it later with the delete button.
    newBookCard.setAttribute("bookindex", myLibrary.indexOf(book))
    newBookCard.querySelector(".title").textContent = book.title;
    newBookCard.querySelector(".author").textContent = book.author;
    newBookCard.querySelector(".pages").textContent = book.pages;

    document.getElementById("library").appendChild(newBookCard);

    toggleDisplayReadStatus(newBookCard, book);
    bookButtonsListeners(newBookCard, book);
    setUniqueId(newBookCard);
}

function toggleDisplayReadStatus(bookCard, book) {
    bookCard.querySelector("input").checked = book.isRead === "read";
}

function bookButtonsListeners(bookCard, book) {
    bookIndex = bookCard.getAttribute("bookindex");
    console.log(bookIndex);

    let bookButtons = bookCard.querySelectorAll("button")
    console.log(bookButtons);

    bookButtons.forEach(button => {
        button.addEventListener("click", function () {

            if (button.classList.contains("read-button")) {
                book.toggleRead();
                toggleDisplayReadStatus(bookCard, book);
            }

            if (button.classList.contains("borrow-button")) {
                bookCard.remove();
                myLibrary.splice(bookCard.getAttribute("bookindex"), 1);
            }

        })
    })
}

function setUniqueId(bookCard) {

}
newBookButton.addEventListener("click", function () {
    resetDialogInput();
    dialog.showModal();
    dialog.focus();
})

dialogInputArray.forEach(element => {
    element.addEventListener("click", function (e) {
        if (element.id == "submit-btn") {
            console.log("Submit");
            getDialogInput()
        }
        if (element.id == "cancel-btn") {
            console.log("Cancel")
            // e.preventDefault();
            dialog.close();
        }
    })
});

console.log(dialog)
console.log(dialogInputArray)

function getDialogInput() {
    const authorInput = document.getElementById('author-input').value;
    const titleInput = document.getElementById('title-input').value;
    const pagesInput = document.getElementById('pages-input').value;
    const readInput = document.querySelector('input[name="read-toggle"]:checked').id;

    validateForm(authorInput, titleInput, pagesInput, readInput);
}

function resetDialogInput() {
    let authorInput = document.getElementById('author-input').value = ""
    let titleInput = document.getElementById('title-input').value = ""
    let pagesInput = document.getElementById('pages-input').value = ""
}

function validateForm(authorInput, titleInput, pagesInput, readInput) {
    if (authorInput && titleInput && pagesInput) {
        addBookToLibrary(titleInput, authorInput, pagesInput, readInput);
    } else {
        console.log("Missing field");
    }
}