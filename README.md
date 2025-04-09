# Library Management System

This project is a Library Management System built with React and Vite. It allows users to manage books, authors, and library operations.
The Project was completed by CPSC 481 Tutorial 2 - Group 2:
Jasmit Saroya, Mufaro Mungoni, Stephanie Sevilla, Maxinne Sanchez, and Jayden Ma.

Use the insructions below to run the application on your local device:

## Step 1: Install Prerequisites

1. **Node.js** (Download it from [https://nodejs.org](https://nodejs.org))

   - Install the **LTS** version for better stability.
   - After installing, check if Node.js and npm are installed correctly:

   ```bash
   node -v
   npm -v
   ```

2. **Git** (Download it from [https://git-scm.com](https://git-scm.com))
   - After installing, check if Git is installed:
   ```bash
   git --version
   ```

---

## Step 2: Clone the Repository

Open a terminal and navigate to the folder where you want to clone the repository. Then run:

```bash
git clone https://github.com/Jasmit22/LibraryInventory.git
```

---

## Step 3: Navigate to the Project Directory

```bash
cd LibraryInventory
```

---

## Step 4: Install Dependencies

```bash
npm install
```

This will install all the dependencies listed in the `package.json` file.

---

## Step 5: Start the Development Server

```bash
npm run dev
```

This will start the app, and you should see output like:

```bash
VITE v4.0.0 ready in 300ms
➜ Local: http://localhost:5173/
```

Open the provided URL (`http://localhost:5173/`) in your browser to see the app running.

---

Once the link is opened, you will be greeted by the landing page where can view the availability of books without needing to login. The keyboard shortcuts will not work unless you are logged in. If you click on a book, or click on Book Search, View Members or Log In you will be directed to the Log In Page. Use the credentials below to access the rest of the system.

## Login Credentials

- Username: user
- Password: password

Keyboard Shortcuts are found at the bottom of the home page.

## Walkthrough 1: Search Book

1. Click Book Search on the left bar or on the Home Page or press Alt (or Option ⌥ on Mac) + S
2. Enter any of the following Titles, Genres, Authors, or ISBNs into the Search bar:
   | Title | ISBN| Author | Genre |
   |----------|----------|----------|----------|
   | The Great Gatsby| 9780743273565 | F. Scott Fitzgerald| Classic |
   | To Kill a Mockingbird| 9780061120084 | Harper Lee| Fiction |
   | 1984 | 9780451524935 | George Orwell | Dystopian |
   | Pride and Prejudice | 9780141439518 | Jane Austen |Romance |
   | The Hobbit | 9780547928227| J.R.R. Tolkien |Fantasy |
   | Harry Potter | 9780590353427 | J.K. Rowling |Fantasy |
   | The Catcher in the Rye | 9780316769488 | J.D. Salinger |Fiction |
   | The Lord of the Rings | 9780618640157 | J.R.R. Tolkien |Fantasy |
   | Brave New World | 9780060850524 | Aldous Huxley |Dystopian |

3. Click on the Filter button to refine your search. Make sure to click "Apply Filter" to apply the filters. "Reset" button will remove all the applied filters

4. Click on a book of your choice to view the information of the book that will appear on a pop-up
5. Click the "X" on the top right or click outside the pop-up to close it

## Walkthrough 2a: Add a Book to the System using ISBN

1. Click Add Book on the left bar or press Alt (or Option ⌥ on Mac) + A
2. Enter the following ISBN in the ISBN Lookup bar: 9780525559474
3. Click "Lookup" and the information will auto-fill in all the fields
4. Click "Add Book" (green button) at the bottom right of the screen and a confirmation message will appear with a summary of the information you entered. From here you have 3 options:
   a. Click "Go to Book Search" and follow the steps in from **Walkthrough 1** to search for the book you just added
   b. Click "Add Another Book" to restart this walkthrough for another book
   c. Click "Keep Editing" to modify or fix any mistakes that might have been made

## Walkthrough 2b: Add a Book to the System using Scanner

1. Click Add Book on the left bar or press Alt (or Option ⌥ on Mac) + A
2. Click the "Scan Book" button to simulate a scanner scanning the barcode of a book
3. Once book is successfully scanned the information will auto-fill in all the fields
4. Click "Add Book" (green button) at the bottom right of the screen and a confirmation message will appear with a summary of the information you entered. From here you have 3 options:
   a. Click "Go to Book Search" and follow the steps in from **Walkthrough 1** to search for the book you just added
   b. Click "Add Another Book" to restart this walkthrough for another book
   c. Click "Keep Editing" to modify or fix any mistakes that might have been made

## Walkthrough 2c: Add a Book to the System Manually

1. Click Add Book on the left bar or press Alt (or Option ⌥ on Mac) + A
2. Enter random information in the required fields
3. Enter 9780525559474 in the ISBN
4. Click "Add Book" (green button) at the bottom right of the screen and a confirmation message will appear with a summary of the information you entered. From here you have 3 options:
   a. Click "Go to Book Search" and follow the steps in from **Walkthrough 1** to search for the book you just added
   b. Click "Add Another Book" to restart this walkthrough for another book
   c. Click "Keep Editing" to modify or fix any mistakes that might have been made
