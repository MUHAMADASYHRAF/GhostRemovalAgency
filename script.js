
"use strict";

// ==========================================
// 1. GET HTML ELEMENTS
// ==========================================

const form = document.getElementById("resourceForm");

const nameInput = document.getElementById("customerName");
const emailInput = document.getElementById("customerEmail");
const usersInput = document.getElementById("users");
const daysInput = document.getElementById("days");
const backupInput = document.getElementById("backupKit");

const result = document.getElementById("result");
const resultIntro = document.getElementById("resultIntro");
const resultContent = document.getElementById("resultContent");

const resetButton = document.getElementById("resetButton");


// ==========================================
// 2. DISPLAY RED WARNING MESSAGE
// ==========================================

function showError(input, errorId, message) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;

    errorElement.style.color = "#ff0000";

    input.classList.add("input-error");

}


// ==========================================
// 3. CLEAR WARNING MESSAGE
// ==========================================

function clearError(input, errorId) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = "";

    input.classList.remove("input-error");

}


// ==========================================
// 4. VALIDATE CUSTOMER NAME
// ==========================================

function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {

        showError(
            nameInput,
            "nameError",
            "Please enter your customer name."
        );

        return false;

    }

    if (name.length < 2) {

        showError(
            nameInput,
            "nameError",
            "Name must contain at least 2 characters."
        );

        return false;

    }

    clearError(nameInput, "nameError");

    return true;

}


// ==========================================
// 5. VALIDATE EMAIL ADDRESS
// ==========================================

function validateEmail() {

    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        showError(
            emailInput,
            "emailError",
            "Please enter your email address."
        );

        return false;

    }

    if (!emailPattern.test(email)) {

        showError(
            emailInput,
            "emailError",
            "Invalid email! Please enter a valid email address."
        );

        return false;

    }

    clearError(emailInput, "emailError");

    return true;

}


// ==========================================
// 6. VALIDATE NUMBER OF TEAM MEMBERS
// ==========================================

function validateUsers() {

    const value = usersInput.value.trim();

    const users = Number(value);

    if (value === "") {

        showError(
            usersInput,
            "usersError",
            "Please enter the number of team members."
        );

        return false;

    }

    if (!Number.isInteger(users)) {

        showError(
            usersInput,
            "usersError",
            "Team members must be a whole number."
        );

        return false;

    }

    if (users < 1 || users > 100) {

        showError(
            usersInput,
            "usersError",
            "Team members must be between 1 and 100."
        );

        return false;

    }

    clearError(usersInput, "usersError");

    return true;

}


// ==========================================
// 7. VALIDATE MISSION DURATION
// ==========================================

function validateDays() {

    const value = daysInput.value.trim();

    const days = Number(value);

    if (value === "") {

        showError(
            daysInput,
            "daysError",
            "Please enter the mission duration."
        );

        return false;

    }

    if (!Number.isInteger(days)) {

        showError(
            daysInput,
            "daysError",
            "Mission duration must be a whole number."
        );

        return false;

    }

    if (days < 1 || days > 30) {

        showError(
            daysInput,
            "daysError",
            "Mission duration must be between 1 and 30 days."
        );

        return false;

    }

    clearError(daysInput, "daysError");

    return true;

}


// ==========================================
// 8. LIVE VALIDATION WHILE TYPING
// ==========================================

nameInput.addEventListener("input", function() {

    validateName();

});

emailInput.addEventListener("input", function() {

    validateEmail();

});

usersInput.addEventListener("input", function() {

    validateUsers();

});

daysInput.addEventListener("input", function() {

    validateDays();

});


// ==========================================
// 9. SUBMIT FORM AND CALCULATE RESOURCES
// ==========================================

form.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();


    // Validate every input field
    const nameValid = validateName();

    const emailValid = validateEmail();

    const usersValid = validateUsers();

    const daysValid = validateDays();


    // Stop calculation if any field is invalid
    if (
        !nameValid ||
        !emailValid ||
        !usersValid ||
        !daysValid
    ) {

        alert("Warning! Please correct all red warning messages.");

        return;

    }


    // Get the valid input values
    const customerName = nameInput.value.trim();

    const customerEmail = emailInput.value.trim();

    const users = Number(usersInput.value);

    const days = Number(daysInput.value);

    const includeBackup = backupInput.checked;


    // ======================================
    // 10. RESOURCE CALCULATION
    // ======================================

    // One EMF detector per team member
    const emfDetectors = users;

    // One protective suit per team member
    const protectiveSuits = users;

    // Two salt packs per person per day
    const saltPacks = 2 * users * days;

    // One flashlight per team member
    const flashlights = users;


    // Create resource list
    const resources = [

        {
            name: "EMF detectors",
            quantity: emfDetectors
        },

        {
            name: "Protective suits",
            quantity: protectiveSuits
        },

        {
            name: "Salt packs",
            quantity: saltPacks
        },

        {
            name: "Flashlights",
            quantity: flashlights
        }

    ];


    // Add optional backup equipment kits
    if (includeBackup) {

        resources.push({

            name: "Backup equipment kits",

            quantity: users

        });

    }


    // ======================================
    // 11. DISPLAY CUSTOMER INFORMATION
    // ======================================

    resultIntro.textContent =
        "Prepared for " +
        customerName +
        " (" +
        customerEmail +
        "), your " +
        users +
        "-member team will operate for " +
        days +
        " day(s).";


    // ======================================
    // 12. CREATE RESULT TABLE
    // ======================================

    const table = document.createElement("table");

    table.className = "result-table";


    // Create table heading
    const thead = document.createElement("thead");

    const headerRow = document.createElement("tr");

    const equipmentHeader = document.createElement("th");

    equipmentHeader.textContent = "Equipment";

    const quantityHeader = document.createElement("th");

    quantityHeader.textContent = "Quantity required";


    headerRow.appendChild(equipmentHeader);

    headerRow.appendChild(quantityHeader);

    thead.appendChild(headerRow);

    table.appendChild(thead);


    // Create table body
    const tbody = document.createElement("tbody");


    // Add each calculated resource to the table
    resources.forEach(function(item) {

        const row = document.createElement("tr");

        const equipmentCell = document.createElement("td");

        const quantityCell = document.createElement("td");


        equipmentCell.textContent = item.name;

        quantityCell.textContent = item.quantity;


        row.appendChild(equipmentCell);

        row.appendChild(quantityCell);

        tbody.appendChild(row);

    });


    table.appendChild(tbody);


    // ======================================
    // 13. DISPLAY FINAL RESULT
    // ======================================

    resultContent.innerHTML = "";

    resultContent.appendChild(table);

    result.hidden = false;


    // Scroll to calculation result
    result.scrollIntoView({
        behavior: "smooth"
    });


    // Success notification
    alert("Success! Your resource calculation is complete.");

});


// ==========================================
// 14. RESET FORM AND CLEAR ALL WARNINGS
// ==========================================

resetButton.addEventListener("click", function() {

    // Reset all form inputs
    form.reset();


    // Remove all warning messages
    clearError(nameInput, "nameError");

    clearError(emailInput, "emailError");

    clearError(usersInput, "usersError");

    clearError(daysInput, "daysError");


    // Clear previous calculation
    resultIntro.textContent = "";

    resultContent.innerHTML = "";

    result.hidden = true;


    // Scroll back to the form
    form.scrollIntoView({
        behavior: "smooth"
    });

});
