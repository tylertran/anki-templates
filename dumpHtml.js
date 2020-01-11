let source = document.documentElement.outerHTML
//now we need to escape the html special chars, javascript has escape
//but this does not do what we want
source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
//now we add <pre> tags to preserve whitespace
source = "<pre>" + source + "</pre>";
document.documentElement.innerHTML = source