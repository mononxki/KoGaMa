    //this is so silly lol
    // Function to add Markdown formatting
    function addMarkdownFormatting(text) {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

          // Heading 1
        text = text.replace(/# (.*?)\n/g, '<h1>$1</h1>');

        // Strikethrough
text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

// Underline
text = text.replace(/__(.*?)__/g, '<u>$1</u>');


   // Link
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return '<a href="' + link + '" target="_blank">' + title + '</a>';
    } else {
      return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
    }
  });

        // Code
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');


        return text;
    }

    // Find and format Markdown on the page
    function formatMarkdown() {
        var elements = document.querySelectorAll('body *:not(script)'); // Select all elements except <script>

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                // Process only elements with a single text node child
                var formattedText = addMarkdownFormatting(element.innerHTML);
                element.innerHTML = formattedText;
            }
        }
    }

    // Check for changes periodically
    function checkForChanges() {
        formatMarkdown();

        setTimeout(checkForChanges, 1000); 
    }

    
    window.addEventListener('load', checkForChanges);
