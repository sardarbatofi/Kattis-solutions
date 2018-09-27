let array = [];
let rad = readline();
let index = 0;

let prevRad;
while (rad = readline()) {
  if (index % 2 !== 0) {
    array.push([
      prevRad,
      rad,
      rad.split('').reduce((acc, value, index) => (
        acc += value === prevRad[index] ? '.' : '*'
      ), ''),
      ''
    ]);
  }
  
  prevRad = rad;
  index += 1;
}

print(array.join('\n').replace(/\,/g, '\n'));
