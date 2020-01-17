const HIDE_HTML_BUTTON = '<button onclick="hideHTML()">Hide HTML</button>';

const SHOW_HTML_BUTTON = document.createElement('button');
SHOW_HTML_BUTTON.setAttribute('id', 'show-html');
SHOW_HTML_BUTTON.setAttribute('onclick', 'showHTML()');
SHOW_HTML_BUTTON.innerHTML = "Show HTML";

document.body.appendChild(SHOW_HTML_BUTTON);

// This value for some reason is being captured as some value < 1, which
// screws up restoring the page after hiding the HTML view
document.getElementById('qa').style.setProperty('opacity', '1');

const ROOT_NODE = document.documentElement;
const BACKUP_SRC = ROOT_NODE.innerHTML;

// Adapated from https://stackoverflow.com/a/1815227
const DISPLAY_SRC = '<pre>' + BACKUP_SRC.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';

function showHTML() {
    document.body.innerHTML = HIDE_HTML_BUTTON + DISPLAY_SRC;
}

function hideHTML() {
    ROOT_NODE.innerHTML = BACKUP_SRC;
}