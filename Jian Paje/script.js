// Function to load XML data
function loadXMLDoc(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Parse the XML response
                const parser = new DOMParser();
                const xml = parser.parseFromString(this.responseText, "application/xml");

                // Check for parsing errors
                if (xml.getElementsByTagName("parsererror").length > 0) {
                    console.error("Error parsing XML");
                    return;
                }

                // Call the function to display students
                displayStudents(xml);
            } else {
                console.error("Error loading XML: " + this.status);
            }
        }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();
}

// Function to display students from XML
function displayStudents(xml) {
    const tableBody = document.getElementById("student-table-body");
    const students = xml.getElementsByTagName("student");

    // Clear existing rows
    tableBody.innerHTML = '';

    // Loop through each student and create a new row in the table
    for (let i = 0; i < students.length; i++) {
        const studentID = students[i].getElementsByTagName("studentID")[0].childNodes[0].nodeValue;
        const lastName = students[i].getElementsByTagName("lastName")[0].childNodes[0].nodeValue;
        const firstName = students[i].getElementsByTagName("firstName")[0].childNodes[0].nodeValue;
        const age = students[i].getElementsByTagName("age")[0].childNodes[0].nodeValue;
        const course = students[i].getElementsByTagName("course")[0].childNodes[0].nodeValue;
        const email = students[i].getElementsByTagName("email")[0].childNodes[0].nodeValue;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${studentID}</td>
            <td>${lastName}</td>
            <td>${firstName}</td>
            <td>${age}</td>
            <td>${course}</td>
            <td>${email}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Load the XML file when the page loads
window.onload = function() {
    loadXMLDoc("students.xml");
};