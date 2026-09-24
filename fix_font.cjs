const fs = require('fs');

// Fix index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap" rel="stylesheet">',
  `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Special+Elite&display=swap" rel="stylesheet">`
);
fs.writeFileSync('index.html', html);

// Fix index.css
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(
  '--font-serif: "Special Elite", monospace;',
  '--font-serif: "Josefin Sans", sans-serif;'
);
fs.writeFileSync('src/index.css', css);

console.log("Done");
