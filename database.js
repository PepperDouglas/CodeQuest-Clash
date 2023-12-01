const questData = [
    {
      "question": "In which year was the Python programming language first released?",
      "options": ["1990", "2000", "1985", "2010"],
      "answer": "1990"
    },
    {
      "question": "What does HTML stand for?",
      "options": ["Hyper Text Markup Language", "High-Level Text Modeling Language", "Hyper Transfer Markup Language", "Hyperlink and Text Markup Language"],
      "answer": "Hyper Text Markup Language"
    },
    {
      "question": "Which programming language is known as 'the mother of all languages'?",
      "options": ["C", "Fortran", "Assembly", "COBOL"],
      "answer": "C"
    },
    {
      "question": "What does CSS stand for?",
      "options": ["Counter Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet"],
      "answer": "Cascading Style Sheet"
    },
    {
      "question": "Who is the founder of the C programming language?",
      "options": ["Bill Gates", "Dennis Ritchie", "Steve Jobs", "Linus Torvalds"],
      "answer": "Dennis Ritchie"
    },
    {
      "question": "What does the acronym SQL stand for?",
      "options": ["Structured Question Language", "Structured Query Language", "Simple Query Language", "Sequential Query Language"],
      "answer": "Structured Query Language"
    },
    {
      "question": "Which programming language is often used for artificial intelligence and machine learning?",
      "options": ["Java", "Ruby", "Python", "C++"],
      "answer": "Python"
    },
    {
      "question": "Who created the JavaScript programming language?",
      "options": ["James Gosling", "Brendan Eich", "Guido van Rossum", "Larry Page"],
      "answer": "Brendan Eich"
    },
    {
      "question": "In which year was the first version of the Java programming language released?",
      "options": ["1995", "1985", "2000", "1990"],
      "answer": "1995"
    },
    {
      "question": "What does the acronym API stand for?",
      "options": ["Application Programming Interface", "Advanced Programming Interface", "Automated Program Integration", "Application Process Interface"],
      "answer": "Application Programming Interface"
    },
    {
      "question": "Which company developed the C# programming language?",
      "options": ["Sun Microsystems", "Microsoft", "IBM", "Google"],
      "answer": "Microsoft"
    },
    {
      "question": "What does MVC stand for in the context of software architecture?",
      "options": ["Model-View-Control", "Modular View Control", "Multi-View Configuration", "Model-Visual-Code"],
      "answer": "Model-View-Control"
    },
    {
      "question": "Who is often referred to as the father of the World Wide Web?",
      "options": ["Tim Berners-Lee", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
      "answer": "Tim Berners-Lee"
    },
    {
      "question": "What is the purpose of the 'git' version control system?",
      "options": ["Managing databases", "Building websites", "Tracking changes in source code", "Creating graphical user interfaces"],
      "answer": "Tracking changes in source code"
    },
    {
      "question": "In programming, what does the term 'bug' refer to?",
      "options": ["An error in the code", "A hardware malfunction", "A virus", "A programming language"],
      "answer": "An error in the code"
    },
    {
      "question": "Which programming language is often used for developing mobile applications?",
      "options": ["Swift", "Kotlin", "Objective-C", "All of the above"],
      "answer": "All of the above"
    },
    {
      "question": "What is the primary function of the HTML <canvas> element?",
      "options": ["Audio playback", "Video playback", "Drawing graphics", "Creating forms"],
      "answer": "Drawing graphics"
    },
    {
      "question": "Who developed the Linux operating system?",
      "options": ["Richard Stallman", "Linus Torvalds", "Bill Gates", "Steve Jobs"],
      "answer": "Linus Torvalds"
    },
    {
      "question": "What is the purpose of the Python 'Pandas' library?",
      "options": ["Data manipulation and analysis", "Graphic design", "Web development", "Machine learning"],
      "answer": "Data manipulation and analysis"
    },
    {
      "question": "Which programming language is known for its use in game development?",
      "options": ["Python", "C#", "Java", "Ruby"],
      "answer": "C#"
    },
    {
      "question": "What does the acronym HTTP stand for?",
      "options": ["HyperText Transfer Protocol", "High-Level Text Transmission Protocol", "Hypertext Terminal Protocol", "Hyper Transfer Text Protocol"],
      "answer": "HyperText Transfer Protocol"
    },
    {
      "question": "In object-oriented programming, what is encapsulation?",
      "options": ["Combining multiple classes into one", "Bundling data and methods that operate on the data into a single unit", "Breaking a program into smaller units", "Writing code in multiple programming languages"],
      "answer": "Bundling data and methods that operate on the data into a single unit"
    },
    {
      "question": "What is the purpose of the 'npm' package manager in JavaScript?",
      "options": ["Network Programming Module", "Node Package Manager", "New Project Manager", "Native Package Manager"],
      "answer": "Node Package Manager"
    },
    {
      "question": "Which programming language is often used for creating web servers?",
      "options": ["PHP", "Ruby", "Node.js", "Perl"],
      "answer": "Node.js"
    },
    {
      "question": "What is the role of the 'DOCTYPE' declaration in HTML?",
      "options": ["It defines the document type and version", "It declares a variable", "It specifies the document's title", "It creates a new HTML document"],
      "answer": "It defines the document type and version"
    },
    {
      "question": "What is the purpose of the 'elif' keyword in Python?",
      "options": ["It represents the beginning of a loop", "It is short for 'else if' and is used for multiple conditional statements", "It defines a function", "It is used to catch exceptions"],
      "answer": "It is short for 'else if' and is used for multiple conditional statements"
    },
    {
      "question": "What is the primary function of the 'SELECT' statement in SQL?",
      "options": ["Insert data into a table", "Update data in a table", "Delete data from a table", "Retrieve data from a table"],
      "answer": "Retrieve data from a table"
    },
    {
      "question": "Who is the creator of the PHP programming language?",
      "options": ["Rasmus Lerdorf", "Guido van Rossum", "Larry Wall", "Anders Hejlsberg"],
      "answer": "Rasmus Lerdorf"
    },
    {
      "question": "What is the purpose of the 'finally' block in a try-except statement?",
      "options": ["It contains the code that will always be executed, regardless of whether an exception occurs", "It is used to catch exceptions", "It defines the conditions for entering a loop", "It specifies the end of the try block"],
      "answer": "It contains the code that will always be executed, regardless of whether an exception occurs"
    },
    {
      "question": "Which programming paradigm emphasizes immutability and pure functions?",
      "options": ["Object-oriented programming", "Functional programming", "Procedural programming", "Event-driven programming"],
      "answer": "Functional programming"
    },
    {
      "question": "What is the significance of the '404' HTTP status code?",
      "options": ["Internal Server Error", "Unauthorized", "Not Found", "OK"],
      "answer": "Not Found"
    },
    {
      "question": "Which of the following is a dynamically-typed programming language?",
      "options": ["Java", "C#", "Python", "C++"],
      "answer": "Python"
    },
    {
      "question": "What does the term 'DRY' stand for in programming?",
      "options": ["Don't Repeat Yourself", "Do Remember Yourself", "Duplicate, Remove, Yield", "Design Reusable Yield"],
      "answer": "Don't Repeat Yourself"
    },
    {
      "question": "Which data structure follows the Last In, First Out (LIFO) principle?",
      "options": ["Queue", "Stack", "Linked List", "Tree"],
      "answer": "Stack"
    },
    {
      "question": "What is the purpose of the 'localStorage' object in web development?",
      "options": ["Storing data on the server", "Storing data locally on the client's browser", "Managing styles", "Creating animations"],
      "answer": "Storing data locally on the client's browser"
    },
    {
      "question": "Who is the co-founder of Microsoft?",
      "options": ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"],
      "answer": "Bill Gates"
    },
    {
      "question": "In Python, what is the purpose of the 'else' clause in a try-except block?",
      "options": ["It is always executed, regardless of whether an exception occurs", "It defines alternative conditions for entering the try block", "It specifies the end of the try block", "It is executed if no exception occurs"],
      "answer": "It is executed if no exception occurs"
    },
    {
      "question": "Which version control system is commonly used for open-source projects?",
      "options": ["Subversion (SVN)", "Git", "Mercurial", "CVS"],
      "answer": "Git"
    },
    {
      "question": "What does the acronym IDE stand for in programming?",
      "options": ["Integrated Development Environment", "Interactive Design Environment", "Intelligent Design Engine", "Internet Development Extension"],
      "answer": "Integrated Development Environment"
    },
    {
      "question": "Which programming language is often used for data science and statistical analysis?",
      "options": ["Java", "Python", "C++", "R"],
      "answer": "R"
    },
    {
      "question": "What is the purpose of the 'super' keyword in object-oriented programming?",
      "options": ["It refers to the current instance of the class", "It calls the constructor of the superclass", "It is used to create singleton classes", "It defines a static method"],
      "answer": "It calls the constructor of the superclass"
    },
    {
      "question": "In JavaScript, what is the purpose of the 'typeof' operator?",
      "options": ["Checking the type of a variable", "Concatenating strings", "Defining a function", "Declaring a variable"],
      "answer": "Checking the type of a variable"
    },
    {
      "question": "What is the primary function of the 'npm' package manager in JavaScript?",
      "options": ["Network Programming Module", "Node Package Manager", "New Project Manager", "Native Package Manager"],
      "answer": "Node Package Manager"
    },
    {
      "question": "Which programming language is often used for creating web servers?",
      "options": ["PHP", "Ruby", "Node.js", "Perl"],
      "answer": "Node.js"
    },
    {
      "question": "What is the role of the 'DOCTYPE' declaration in HTML?",
      "options": ["It defines the document type and version", "It declares a variable", "It specifies the document's title", "It creates a new HTML document"],
      "answer": "It defines the document type and version"
    },
    {
      "question": "What is the purpose of the 'elif' keyword in Python?",
      "options": ["It represents the beginning of a loop", "It is short for 'else if' and is used for multiple conditional statements", "It defines a function", "It is used to catch exceptions"],
      "answer": "It is short for 'else if' and is used for multiple conditional statements"
    },
    {
      "question": "What is the primary function of the 'SELECT' statement in SQL?",
      "options": ["Insert data into a table", "Update data in a table", "Delete data from a table", "Retrieve data from a table"],
      "answer": "Retrieve data from a table"
    },
    {
      "question": "Who is the creator of the PHP programming language?",
      "options": ["Rasmus Lerdorf", "Guido van Rossum", "Larry Wall", "Anders Hejlsberg"],
      "answer": "Rasmus Lerdorf"
    },
    {
      "question": "What is the purpose of the 'finally' block in a try-except statement?",
      "options": ["It contains the code that will always be executed, regardless of whether an exception occurs", "It is used to catch exceptions", "It defines the conditions for entering a loop", "It specifies the end of the try block"],
      "answer": "It contains the code that will always be executed, regardless of whether an exception occurs"
    },
    {
      "question": "Which programming paradigm emphasizes immutability and pure functions?",
      "options": ["Object-oriented programming", "Functional programming", "Procedural programming", "Event-driven programming"],
      "answer": "Functional programming"
    },
    {
      "question": "What is the significance of the '404' HTTP status code?",
      "options": ["Internal Server Error", "Unauthorized", "Not Found", "OK"],
      "answer": "Not Found"
    },
    {
      "question": "Which of the following is a dynamically-typed programming language?",
      "options": ["Java", "C#", "Python", "C++"],
      "answer": "Python"
    }
];

export default questData;