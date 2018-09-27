let rad = readline();
const ress = [];

while (typeof(rad) === 'string') {
  if (rad.match(/problem/i) === null) {
    ress.push('no');
  } else {
    ress.push('yes');
  }
  rad = readline();
}

print(ress.join('\n'));