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
2. Search up any of the following Titles, Genres, Authors, or ISBNs:
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
