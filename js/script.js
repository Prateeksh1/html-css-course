// Function to display code examples in an iframe using Blob URLs for better compatibility
function showExample(iframeIdPrefix, codeContent) {
    const iframeId = iframeIdPrefix + '-iframe';
    const iframe = document.getElementById(iframeId);

    if (!iframe) {
        console.error('Iframe with ID ' + iframeId + ' not found.');
        return;
    }

    // Revoke any existing object URL to prevent memory leaks if content is being updated
    if (iframe.src && iframe.src.startsWith('blob:')) {
        URL.revokeObjectURL(iframe.src);
    }

    // Toggle display: if already visible, hide it and clear content; otherwise, show it
    if (iframe.style.display === 'block') {
        iframe.style.display = 'none';
        iframe.src = ''; // Clear src to stop content
    } else {
        // Wrap the codeContent in a full HTML document structure
        // This ensures proper rendering, especially for CSS examples, and provides a base for the iframe
        const fullHtmlContent = `
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

        // Create a Blob from the HTML string
        // The type 'text/html' tells the browser it's an HTML document
        const blob = new Blob([fullHtmlContent], { type: 'text/html' });

        // Create an object URL for the Blob
        // This URL can be used as the src for the iframe
        const objectURL = URL.createObjectURL(blob);

        // Set the iframe's src to the Blob URL
        iframe.src = objectURL;
        iframe.style.display = 'block'; // Show the iframe

        // Optional: Add an onload event to revoke the URL once the iframe has loaded
        // This helps with memory management, though modern browsers are good at garbage collection
        iframe.onload = () => {
            // URL.revokeObjectURL(objectURL); // Revoke after load if you don't need to keep it in memory
            // However, for 'Try It Yourself' where the user might toggle, keeping it until hidden is better.
        };
    }
}
