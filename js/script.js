// Function to display code examples in an iframe
function showExample(iframeIdPrefix, codeContent) {
    // Construct the full iframe ID
    const iframeId = iframeIdPrefix + '-iframe';
    const iframe = document.getElementById(iframeId);

    // Toggle display: if already visible, hide it; otherwise, show it
    if (iframe.style.display === 'block') {
        iframe.style.display = 'none';
        iframe.srcdoc = ''; // Clear content when hiding
    } else {
        iframe.style.display = 'block';
        // Set the iframe's content.
        // We wrap the codeContent in a full HTML document structure
        // to ensure proper rendering, especially for CSS examples.
        iframe.srcdoc = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Example Output</title>
                <style>
                    /* Basic styling for the iframe content to make examples readable */
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        margin: 10px;
                        background-color: #fff;
                        color: #333;
                    }
                    table, th, td {
                        border: 1px solid #ddd;
                        border-collapse: collapse;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    form {
                        padding: 10px;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    input[type="text"], input[type="email"], textarea, select {
                        width: calc(100% - 16px); /* Adjust for padding */
                        padding: 8px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                    }
                    input[type="submit"], button {
                        background-color: #0a9396;
                        color: white;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 1rem;
                    }
                    input[type="submit"]:hover, button:hover {
                        background-color: #007a82;
                    }
                </style>
            </head>
            <body>
                ${codeContent}
            </body>
            </html>
        `;
    }
}

// Optional: Implement syntax highlighting if you add a library like Prism.js
// document.addEventListener('DOMContentLoaded', (event) => {
//     // If you include Prism.js, uncomment the line below
//     // Prism.highlightAll();
// });
