// Function to display code examples in an iframe using Blob URLs for better compatibility
function showExample(iframeIdPrefix, codeContent) {
    console.log('showExample called for:', iframeIdPrefix);
    console.log('Code content length:', codeContent.length);

    const iframeId = iframeIdPrefix + '-iframe';
    const iframe = document.getElementById(iframeId);

    if (!iframe) {
        console.error('Iframe with ID ' + iframeId + ' not found.');
        return;
    }

    // Revoke any existing object URL to prevent memory leaks if content is being updated
    if (iframe.src && iframe.src.startsWith('blob:')) {
        URL.revokeObjectURL(iframe.src);
        console.log('Revoked old Blob URL for', iframeIdPrefix);
    }

    // Toggle display: if already visible, hide it and clear content; otherwise, show it
    if (iframe.style.display === 'block') {
        iframe.style.display = 'none';
        iframe.src = 'about:blank'; // Clear src to stop content and release resources
        console.log('Hiding iframe for', iframeIdPrefix);
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
                        font-size: 14px; /* Default font size for iframe content */
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
                        margin-top: 5px; /* Add some margin for buttons */
                    }
                    input[type="submit"]:hover, button:hover {
                        background-color: #007a82;
                    }
                    /* Specific styles for HTML course examples */
                    .box-model-example {
                        width: 150px;
                        height: 70px;
                        background-color: #a7d9de;
                        padding: 10px;
                        border: 3px solid #0a9396;
                        margin: 15px;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: 70px;
                        font-weight: bold;
                        color: #003049;
                    }
                    .inline-block-example {
                        background-color: #005f73;
                        color: white;
                        padding: 10px;
                        margin: 8px;
                        width: 100px;
                        height: 50px;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                    }
                    .responsive-box {
                        width: 90%;
                        padding: 15px;
                        margin: 10px auto;
                        background-color: #a7d9de;
                        text-align: center;
                        font-size: 1em;
                        border: 1px solid #0a9396;
                    }
                    @media (max-width: 600px) {
                        .responsive-box { background-color: #ffc300; }
                    }
                </style>
            </head>
            <body>
                ${codeContent}
            </body>
            </html>
        `;

        // Create a Blob from the HTML string
        const blob = new Blob([fullHtmlContent], { type: 'text/html' });

        // Create an object URL for the Blob
        const objectURL = URL.createObjectURL(blob);

        // Set the iframe's src to the Blob URL
        iframe.src = objectURL;
        iframe.style.display = 'block'; // Show the iframe
        console.log('Loading Blob URL for', iframeIdPrefix);

        // Optional: Add an onload event to revoke the URL once the iframe has loaded
        iframe.onload = () => {
            console.log('Iframe loaded for', iframeIdPrefix);
            // You might revoke the URL here if you don't expect the user to toggle it
            // URL.revokeObjectURL(objectURL);
        };
        iframe.onerror = () => {
            console.error('Error loading iframe for', iframeIdPrefix);
        };
    }
}
