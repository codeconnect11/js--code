// Function to save table data to localStorage
function saveToLocalStorage() {
    const tableRows = Array.from(document.querySelectorAll("#userTable tbody tr"));
    const tableData = tableRows.map(row => {
        return {
            firstName: row.cells[0].textContent,
            age: row.cells[1].textContent,
            phoneno: row.cells[2].textContent,
            email: row.cells[3].textContent,
            education: row.cells[4].textContent,
        };
    });
    localStorage.setItem("tableData", JSON.stringify(tableData));
}

// Function to load table data from localStorage
function loadFromLocalStorage() {
    const tableData = JSON.parse(localStorage.getItem("tableData")) || [];
    const tableBody = document.getElementById("userTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Name the first entry explicitly as `firstEntry`
    if (tableData.length > 0) {
        const firstEntry = tableData[0]; // First entry
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${firstEntry.firstName}</td>
            <td>${firstEntry.age}</td>
            <td>${firstEntry.phoneno}</td>
            <td>${firstEntry.email}</td>
            <td>${firstEntry.education}</td>
            <td class="action-buttons">
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
                <button onclick="previewRow(this)">Preview</button>
            </td>
        `;
        tableBody.appendChild(row);

        // For subsequent entries, use indexes
        for (let i = 1; i < tableData.length; i++) {
            const entry = tableData[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.firstName}</td>
                <td>${entry.age}</td>
                <td>${entry.phoneno}</td>
                <td>${entry.email}</td>
                <td>${entry.education}</td>
                <td class="action-buttons">
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                    <button onclick="previewRow(this)">Preview</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    }
}

function addRow(event) {
    event.preventDefault();
    const firstName = document.getElementById("fname").value.trim();
    const age = document.getElementById("age").value.trim();
    const phoneno = document.getElementById("phoneno").value.trim();
    const email = document.getElementById("Email").value.trim();
    const education = document.getElementById("Education").value.trim();
    
    if (!firstName || isNaN(age) || age <= 0) {
        alert("Please provide valid data.");
        return;
    }

    const tableBody = document.getElementById("userTable").querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${firstName}</td>
        <td>${age}</td>
        <td>${phoneno}</td>
        <td>${email}</td>
        <td>${education}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
            <button onclick="previewRow(this)">Preview</button>
        </td>
    `;
    tableBody.appendChild(row);
    saveToLocalStorage();
    document.getElementById("userForm").reset();
}

function editRow(button) {
    const row = button.parentElement.parentElement;
    const firstName = row.cells[0].textContent;
    const age = row.cells[1].textContent;
    const phoneno = row.cells[2].textContent;
    const email = row.cells[3].textContent;
    const education = row.cells[4].textContent;

    row.cells[0].innerHTML = `<input type="text" value="${firstName}">`;
    row.cells[1].innerHTML = `<input type="text" value="${age}">`;
    row.cells[2].innerHTML = `<input type="text" value="${phoneno}">`;
    row.cells[3].innerHTML = `<input type="text" value="${email}">`;
    row.cells[4].innerHTML = `<input type="text" value="${education}">`;
    row.cells[5].innerHTML = `
        <button onclick="updateRow(this)">Update</button>
        <button onclick="cancelEdit(this)">Cancel</button>
        <button onclick="deleteRow(this)">Delete</button>
    `;
}

function updateRow(button) {
    const row = button.parentElement.parentElement;
    const firstName = row.cells[0].querySelector("input").value.trim();
    const age = row.cells[1].querySelector("input").value.trim();
    const phoneno = row.cells[2].querySelector("input").value.trim();
    const email = row.cells[3].querySelector("input").value.trim();
    const education = row.cells[4].querySelector("input").value.trim();

    if (!firstName || isNaN(age) || age <= 0) {
        alert("Please provide valid data.");
        return;
    }

    row.cells[0].textContent = firstName;
    row.cells[1].textContent = age;
    row.cells[2].textContent = phoneno;
    row.cells[3].textContent = email;
    row.cells[4].textContent = education;
    row.cells[5].innerHTML = `
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
        <button onclick="previewRow(this)">Preview</button>
    `;
    saveToLocalStorage();
}

function cancelEdit(button) {
    loadFromLocalStorage();
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    saveToLocalStorage();
}

// Load data from localStorage on page load
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);