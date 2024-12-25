function addRow(event) {
    // Prevent form submission
    event.preventDefault();

    // Get form input values
    const firstName = document.getElementById("fname").value.trim();
    const age = document.getElementById("age").value.trim();

    // Validate input
    if (!firstName || isNaN(age) || age <= 0) {
        alert("Please provide valid data.");
        return;
    }

    // Get table body
    const tableBody = document.getElementById("userTable").querySelector("tbody");

    // Create a new row
    const row = document.createElement("tr");

    // Add cells
    row.innerHTML = `
        <td>${firstName}</td>
        <td>${age}</td>
        <td class="action-buttons">
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Append the row to the table body
    tableBody.appendChild(row);

    // Clear form
    document.getElementById("userForm").reset();
}

function editRow(button) {
    // Get the current row
    const row = button.parentElement.parentElement;

    // Get current values
    const firstName = row.cells[0].textContent;
    const age = row.cells[1].textContent;

    // Replace cells with input fields
    row.cells[0].innerHTML = `<input type="text" value="${firstName}">`;
    row.cells[1].innerHTML = `<input type="text" value="${age}">`;
    row.cells[2].innerHTML = `
        <button onclick="updateRow(this)">Update</button>
        <button onclick="cancelEdit(this)">Cancel</button>
    `;
}

function updateRow(button) {
    // Get the current row
    const row = button.parentElement.parentElement;

    // Get updated values from input fields
    const firstName = row.cells[0].querySelector("input").value.trim();
    const age = row.cells[1].querySelector("input").value.trim();

    // Validate input
    if (!firstName || isNaN(age) || age <= 0) {
        alert("Please provide valid data.");
        return;
    }

    // Update the row with new values
    row.cells[0].textContent = firstName;
    row.cells[1].textContent = age;
    row.cells[2].innerHTML = `
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
    `;
}

function cancelEdit(button) {
    // Get the current row
    const row = button.parentElement.parentElement;

    // Get original values from the row (stored temporarily)
    const firstName = row.cells[0].querySelector("input").defaultValue;
    const age = row.cells[1].querySelector("input").defaultValue;

    // Restore original values
    row.cells[0].textContent = firstName;
    row.cells[1].textContent = age;
    row.cells[2].innerHTML = `
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
    `;
}

function deleteRow(button) {
    // Remove the row
    const row = button.parentElement.parentElement;
    row.remove();
}
