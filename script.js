// ========================================
// Part 1: Variables and Conditionals
// ========================================

// Variable declarations
const VOTING_AGE = 18;
let userName = "";
let userAge = 0;

// Function to check voting eligibility
function checkEligibility() {
    // Get user input
    userAge = parseInt(document.getElementById('ageInput').value);
    const resultElement = document.getElementById('eligibilityResult');
    
    // Conditional logic
    if (isNaN(userAge)) {
        resultElement.textContent = "Please enter a valid age.";
        resultElement.style.color = "var(--error-color)";
    } else if (userAge < 0) {
        resultElement.textContent = "Age cannot be negative.";
        resultElement.style.color = "var(--error-color)";
    } else if (userAge >= VOTING_AGE) {
        resultElement.textContent = `You are eligible to vote!`;
        resultElement.style.color = "var(--success-color)";
    } else {
        const yearsLeft = VOTING_AGE - userAge;
        resultElement.textContent = `You need to wait ${yearsLeft} more year${yearsLeft > 1 ? 's' : ''} to vote.`;
        resultElement.style.color = "var(--error-color)";
    }
}

// ========================================
// Part 2: Functions
// ========================================

// Function to calculate area of a rectangle
function calculateArea() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const resultElement = document.getElementById('areaResult');
    
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        resultElement.textContent = "Please enter valid positive numbers for length and width.";
        resultElement.style.color = "var(--error-color)";
        return;
    }
    
    const area = length * width;
    resultElement.textContent = `The area is: ${area.toFixed(2)} square units`;
    resultElement.style.color = "var(--success-color)";
}

// Function to format text based on type
function formatText(formatType) {
    const textInput = document.getElementById('textInput').value;
    const resultElement = document.getElementById('formattedText');
    
    if (!textInput.trim()) {
        resultElement.textContent = "Please enter some text to format.";
        resultElement.style.color = "var(--error-color)";
        return;
    }
    
    let formattedText = '';
    
    switch(formatType) {
        case 'uppercase':
            formattedText = textInput.toUpperCase();
            break;
        case 'lowercase':
            formattedText = textInput.toLowerCase();
            break;
        case 'capitalize':
            formattedText = textInput.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            break;
        default:
            formattedText = textInput;
    }
    
    resultElement.textContent = formattedText;
    resultElement.style.color = "var(--success-color)";
}

// ========================================
// Part 3: Loops
// ========================================

// Function to generate multiplication table using for loop
function generateTable() {
    const number = parseInt(document.getElementById('numberInput').value);
    const tableContainer = document.getElementById('multiplicationTable');
    
    if (isNaN(number) || number <= 0) {
        tableContainer.innerHTML = "<p style='color: var(--error-color)'>Please enter a valid positive number.</p>";
        return;
    }
    
    let tableHTML = "<table class='table'>";
    tableHTML += "<tr><th>Multiplier</th><th>Result</th></tr>";
    
    // For loop to generate table
    for (let i = 1; i <= 10; i++) {
        tableHTML += `<tr><td>${number} × ${i}</td><td>${number * i}</td></tr>`;
    }
    
    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
}

// Array to store todo items
let todos = [];

// Function to add a new todo item using array method (forEach)
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task');
        return;
    }
    
    // Add new todo to array
    todos.push(todoText);
    todoInput.value = '';
    
    // Update the todo list display
    updateTodoList();
}

// Function to update the todo list display
function updateTodoList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    // Using forEach to iterate through todos array
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <button onclick="removeTodo(${index})">Remove</button>
        `;
        todoList.appendChild(li);
    });
}

// Function to remove a todo item
function removeTodo(index) {
    todos.splice(index, 1);
    updateTodoList();
}

// ========================================
// Part 4: DOM Manipulation
// ========================================

// Theme switcher function
function changeTheme(theme) {
    const body = document.body;
    
    // Remove all theme classes first
    body.classList.remove('dark-theme', 'blue-theme');
    
    // Add the selected theme class
    if (theme !== 'light') {
        body.classList.add(`${theme}-theme`);
    }
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
}

// Function to add a new list item
let itemCounter = 1;
function addItem() {
    const dynamicList = document.getElementById('dynamicList');
    const newItem = document.createElement('li');
    newItem.textContent = `Item ${itemCounter++}`;
    newItem.className = 'dynamic-item';
    dynamicList.appendChild(newItem);
}

// Function to remove the last list item
function removeItem() {
    const dynamicList = document.getElementById('dynamicList');
    if (dynamicList.lastChild) {
        dynamicList.removeChild(dynamicList.lastChild);
        if (itemCounter > 1) itemCounter--;
    }
}

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;
    
    // Reset previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    
    // Validate name
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        alert('Form submitted successfully!');
        document.getElementById('contactForm').reset();
    }
    
    return false; // Prevent form submission for demo purposes
}

// Initialize the page
function init() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);
    
    // Add event listeners for better user experience
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initialize with one item in the dynamic list
    addItem();
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
