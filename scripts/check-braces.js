const fs = require("fs");
const s = fs.readFileSync(
  "c:/Projects/Real-Estate/components/react-bits/CircularCarousel.jsx",
  "utf8",
);

let brace = 0;
let paren = 0;
let brack = 0;
let inStr = null;
let inLine = false;
let inBlock = false;
let inTmpl = 0;
let line = 1;
let col = 0;
const stack = [];

for (let i = 0; i < s.length; i++) {
  const c = s[i];
  const n = s[i + 1];
  if (c === "\n") {
    line++;
    col = 0;
  } else {
    col++;
  }

  if (inLine) {
    if (c === "\n") inLine = false;
    continue;
  }
  if (inBlock) {
    if (c === "*" && n === "/") {
      inBlock = false;
      i++;
    }
    continue;
  }
  if (inStr) {
    if (c === "\\") {
      i++;
      continue;
    }
    if (c === inStr) inStr = null;
    continue;
  }
  if (inTmpl > 0) {
    if (c === "\\") {
      i++;
      continue;
    }
    if (c === "`") {
      inTmpl--;
      continue;
    }
    if (c === "$" && n === "{") {
      stack.push({ t: "tmpl", line, col });
      brace++;
      i++;
      continue;
    }
    continue;
  }

  if (c === "/" && n === "/") {
    inLine = true;
    i++;
    continue;
  }
  if (c === "/" && n === "*") {
    inBlock = true;
    i++;
    continue;
  }
  if (c === '"' || c === "'") {
    inStr = c;
    continue;
  }
  if (c === "`") {
    inTmpl++;
    continue;
  }

  if (c === "{") {
    brace++;
    stack.push({ t: "{", line, col });
  } else if (c === "}") {
    brace--;
    const top = stack.pop();
    if (!top || (top.t !== "{" && top.t !== "tmpl")) {
      console.log("bad } at", line, col, top);
    }
  } else if (c === "(") {
    paren++;
    stack.push({ t: "(", line, col });
  } else if (c === ")") {
    paren--;
    const top = stack.pop();
    if (!top || top.t !== "(") console.log("bad ) at", line, col, top);
  } else if (c === "[") {
    brack++;
    stack.push({ t: "[", line, col });
  } else if (c === "]") {
    brack--;
    const top = stack.pop();
    if (!top || top.t !== "[") console.log("bad ] at", line, col, top);
  }
}

console.log("final", { brace, paren, brack, stackLeft: stack.slice(-10) });
if (stack.length) {
  console.log("unclosed:");
  for (const x of stack.slice(-20)) console.log(x);
}
