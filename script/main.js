const layout = document.getElementById('book-layout');

const buildBookContainer =  (book) => {
    const bookId = book.id;
    const title = book.title;
    const imageUrl = book.image;
    const authors = book.authors;
    
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    
    const image = document.createElement('img');
    image.src = imageUrl;
    
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');
    
    const h2Title = document.createElement('h2');
    h2Title.textContent = title;
    
    const list = document.createElement('ul');
    list.classList.add('authors-list');
    
    for (let i = 0; i < authors.length; i++) {
        const listElement = document.createElement('li');
        listElement.textContent = authors[i].name;
        
        list.appendChild(listElement);
    }
    
    const button =  document.createElement('button');
    button.textContent = 'Add Book Progress';
    
    bookDetails.appendChild(h2Title);
    bookDetails.appendChild(list);
    bookDetails.appendChild(button);
    
    bookContainer.appendChild(image);
    bookContainer.appendChild(bookDetails)
    
    layout.appendChild(bookContainer);
}

const data = `[
  {
    "id": 14296534,
    "title": "Harry Potter and the Order of the Phoenix",
    "image": "https://covers.openlibrary.org/b/id/11416565-M.jpg",
    "authors": [
      {
        "id": 14136020,
        "name": "J. K. Rowling"
      }
    ]
  },
  {
    "id": 18271980,
    "title": "The help",
    "image": "https://covers.openlibrary.org/b/id/10181699-M.jpg",
    "authors": [
      {
        "id": 18271972,
        "name": "Kathryn Stockett"
      }
    ]
  },
  {
    "id": 15296228,
    "title": "The Lightning Thief",
    "image": "https://covers.openlibrary.org/b/id/13011239-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 20544942,
    "title": "The battle of the Labyrinth",
    "image": "https://covers.openlibrary.org/b/id/13011688-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 21181278,
    "title": "The last Olympian",
    "image": "https://covers.openlibrary.org/b/id/-1-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 16911180,
    "title": "The Titan's Curse (Percy Jackson",
    "image": "https://covers.openlibrary.org/b/id/13011751-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 19062944,
    "title": "The Sea of Monsters",
    "image": "https://covers.openlibrary.org/b/id/13011225-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 24526168,
    "title": "Frankenstein galvanized",
    "image": "https://covers.openlibrary.org/b/id/12806007-M.jpg",
    "authors": [
      {
        "id": 13354010,
        "name": "Mary Wollstonecraft Shelley"
      }
    ]
  },
  {
    "id": 20883560,
    "title": "Frankenstein, or, The modern promethueus",
    "image": "https://covers.openlibrary.org/b/id/12655806-M.jpg",
    "authors": [
      {
        "id": 13354010,
        "name": "Mary Wollstonecraft Shelley"
      }
    ]
  },
  {
    "id": 24533812,
    "title": "The son of Neptune",
    "image": "https://covers.openlibrary.org/b/id/13158349-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 16942324,
    "title": "Mark of Athena",
    "image": "https://covers.openlibrary.org/b/id/13011265-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 22662712,
    "title": "The House of Hades",
    "image": "https://covers.openlibrary.org/b/id/13011305-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 27064082,
    "title": "The Last Mrs. Parrish A Novel",
    "image": "https://covers.openlibrary.org/b/id/13472767-M.jpg",
    "authors": [
      {
        "id": 22483822,
        "name": "Liv Constantine"
      }
    ]
  },
  {
    "id": 14646040,
    "title": "Every Summer After",
    "image": "https://covers.openlibrary.org/b/id/12752489-M.jpg",
    "authors": [
      {
        "id": 14646030,
        "name": "Carley Fortune"
      }
    ]
  },
  {
    "id": 19146982,
    "title": "Percy Jackson's Greek gods",
    "image": "https://covers.openlibrary.org/b/id/13011637-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 24473674,
    "title": "Club Dead (Southern Vampire Mysteries, Book 3)",
    "image": "https://covers.openlibrary.org/b/id/886256-M.jpg",
    "authors": [
      {
        "id": 13326960,
        "name": "Charlaine Harris"
      }
    ]
  },
  {
    "id": 13667512,
    "title": "Club dead",
    "image": "https://covers.openlibrary.org/b/id/7124572-M.jpg",
    "authors": [
      {
        "id": 13326960,
        "name": "Charlaine Harris"
      }
    ]
  },
  {
    "id": 18137196,
    "title": "The Hidden Oracle (Trials of Apollo, Book One)",
    "image": "https://covers.openlibrary.org/b/id/13011816-M.jpg",
    "authors": [
      {
        "id": 13234550,
        "name": "Rick Riordan"
      }
    ]
  },
  {
    "id": 24510068,
    "title": "The Art of The Fellowship of the Ring",
    "image": "https://covers.openlibrary.org/b/id/393768-M.jpg",
    "authors": [
      {
        "id": 13382732,
        "name": "Gary Russell"
      }
    ]
  },
  {
    "id": 19843474,
    "title": "The  left hand of darkness",
    "image": "https://covers.openlibrary.org/b/id/7373553-M.jpg",
    "authors": [
      {
        "id": 13788666,
        "name": "Ursula K. Le Guin"
      }
    ]
  }
]`;


const loadBooks =  (e) => {
    
    const response =  JSON.parse(data);

    for (let i = 0; i < response.length; i++) {
        const book = response[i];
        buildBookContainer(book);
    }
    
    
}


document.getElementById('search-button').addEventListener("click", loadBooks);
window.onload = loadBooks();