document.addEventListener('DOMContentLoaded', function () {
    const fs = require('fs');
    const filePath = "CSS_FILE_PATH";
    const IS_FOCUS_MODE = "isFocus";
    const head = document.querySelector("head");

    fs.readFile(filePath, {
        encoding: 'utf-8'
    }, function (err, css) {
        if (!err) {
            const styleEl = document.createElement("style");

            styleEl.innerHTML = css;

            if (localStorage.getItem(IS_FOCUS_MODE) === null) {
                localStorage.setItem(IS_FOCUS_MODE, true);
                window.location.reload(true);
            }

            if (JSON.parse(localStorage.getItem(IS_FOCUS_MODE))) {
                head.append(styleEl);
            }

            document.addEventListener("keydown", event => {
                // Enter Focus Mode
                if (event.ctrlKey && event.keyCode === 68) {
                    const focusing = JSON.parse(localStorage.getItem(IS_FOCUS_MODE));
                    focusing ? head.removeChild(styleEl) : head.append(styleEl);
                    localStorage.setItem(IS_FOCUS_MODE, !focusing);
                }

                // Toggle Dev Tools
                if (event.ctrlKey && event.keyCode === 73) {
                    require('electron').remote.getCurrentWindow().toggleDevTools();
                }

                // Move focus to a message
                for (i = 49; i <= 57; i++) {
                    if (event.ctrlKey && event.keyCode === i) {
                        document.activeElement.blur();
                        let posts = document.querySelectorAll(".p-workspace__primary_view .c-virtual_list__item[aria-expanded='false']");
                        let postSelected = posts[posts.length - (i - 48)];
                        postSelected.focus();
                    }
                }

                // Reacji Hotkey (opens on whichever post you are hovering on)
                if (event.ctrlKey && event.keyCode === 69) {
                    let react = document.querySelector("button[data-qa='add_reaction_action']");
                    react.click();
                }
                // Thread Hotkey (opens on whichever post you are hovering on)
                if (event.ctrlKey && event.keyCode === 84) {
                    let thread = document.querySelector("button[data-qa='start_thread']");
                    thread.click();
                }
            });
});
