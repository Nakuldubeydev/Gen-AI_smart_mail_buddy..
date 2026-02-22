
console.log("Email writer loaded");

// Get original email content

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }

    return '';
}

// Find compose toolbar

function findComposeToolbar() {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return null;

    const toolbars = dialog.querySelectorAll('div[role="toolbar"]');

    // Compose toolbar is usually the last one
    return toolbars[toolbars.length - 1] || null;
}


// Create AI Button

function createAIButton() {
    const button = document.createElement('div');

    button.innerHTML = `
        <span style="font-size:14px; margin-right:6px;">✦</span>
        <span>AI Reply</span>
    `;

    button.classList.add("ai-reply-button");

    // --- Layout ---
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.height = "32px";              // slightly smaller than Send
    button.style.padding = "0 14px";
    button.style.borderRadius = "16px";
    button.style.cursor = "pointer";

    // --- Typography ---
    button.style.fontSize = "13px";
    button.style.fontWeight = "500";
    button.style.fontFamily = "Google Sans, Roboto, Arial, sans-serif";

    // --- Professional Neutral Styling ---
    button.style.backgroundColor = "#ffffff";
    button.style.color = "#1f1f1f";
    button.style.border = "1px solid #dadce0";
    button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.06)";
    button.style.transition = "all 0.15s ease";

    // --- Hover ---
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#f8f9fa";
        button.style.boxShadow = "0 2px 4px rgba(0,0,0,0.08)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#ffffff";
        button.style.boxShadow = "0 1px 2px rgba(0,0,0,0.06)";
    });

    return button;
}

// -------------------------
// Inject Button Into Compose
// -------------------------
function injectButton() {
    const dialog = document.querySelector('div[role="dialog"]');
    if (!dialog) return;

    const existingButton = dialog.querySelector('.ai-reply-button');
    if (existingButton) return;

    const toolbar = findComposeToolbar();
    if (!toolbar) return;

    const button = createAIButton();
    button.classList.add('ai-reply-button');

    // Button Click Logic
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.style.pointerEvents = 'none';

            const emailContent = getEmailContent();

            if (!emailContent) {
                alert("Could not detect original email content.");
                return;
            }

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const generatedReply = await response.text();

            const composeBox = dialog.querySelector(
                '[role="textbox"][contenteditable="true"]'
            );

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                alert("Compose box not found.");
            }

        } catch (error) {
            console.error("AI Reply Error:", error);
            alert("Something went wrong while generating reply.");
        } finally {
            button.innerHTML = 'AI Reply';
            button.style.pointerEvents = 'auto';
        }
    });

    /* =========================
   CLEAR EMAIL BODY ON RELOAD
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const dialogs = document.querySelectorAll('div[role="dialog"]');

        dialogs.forEach(dialog => {
            const editor = dialog.querySelector(
                'div[contenteditable="true"].editable'
            );

            if (editor) {
                editor.innerHTML = "";
            }
        });

        console.log("Active compose windows cleared");

    }, 1200);

});

    toolbar.insertBefore(button, toolbar.firstChild);

    console.log("AI Button Injected");
}

// -------------------------
// Observe Gmail DOM Changes
// -------------------------
// Check every 1 second for compose window
setInterval(() => {

    const editors = document.querySelectorAll(
        'div[contenteditable="true"].editable'
    );

    editors.forEach((editor) => {

        const parent = editor.parentElement;
        if (!parent) return;

        if (parent.querySelector('.ai-reply-button')) return;

        const button = createAIButton();
        button.className = "ai-reply-button";
        button.style.marginBottom = "8px";
        button.style.padding = "6px 10px";
        button.style.cursor = "pointer";

        button.addEventListener('click', async () => {
            try {
                button.innerText = "Generating...";
                button.disabled = true;

                const emailContent = getEmailContent();

                const response = await fetch('http://localhost:8080/api/email/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        emailContent,
                        tone: "professional"
                    })
                });

                const generatedReply = await response.text();

                editor.focus();
                document.execCommand('insertText', false, generatedReply);

            } catch (err) {
                console.error(err);
            } finally {
                button.innerText = "AI Reply";
                button.disabled = false;
            }
        });

        const sendButtonArea = editor.closest("div").querySelector(".dC"); 
        if (sendButtonArea) {
            sendButtonArea.appendChild(button);
        } else {
            editor.parentElement.insertBefore(button, editor);
            }

        console.log("AI Button Injected");

    });

}, 1000);