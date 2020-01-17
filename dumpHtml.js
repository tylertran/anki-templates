const HIDE_HTML_BUTTON = '<button onclick="hideHTML()">Hide HTML</button>';

const SHOW_HTML_BUTTON = document.createElement('button');
SHOW_HTML_BUTTON.setAttribute('id', 'show-html');
SHOW_HTML_BUTTON.setAttribute('onclick', 'showHTML()');
SHOW_HTML_BUTTON.innerHTML = "Show HTML";

document.body.appendChild(SHOW_HTML_BUTTON);

const ROOT_NODE = document.documentElement;
let backup_src = '';

function showHTML() {
	// Adapated from https://stackoverflow.com/a/1815227
	backup_src = ROOT_NODE.innerHTML;
	const display_src = '<pre>' + backup_src.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
    document.body.innerHTML = HIDE_HTML_BUTTON + display_src;
}

function hideHTML() {
    ROOT_NODE.innerHTML = backup_src;
}