function ccw(d1, d2, d3) {
  return (d2.x - d1.x) * (d3.y - d1.y) - (d2.y - d1.y) * (d3.x - d1.x);
}

function norm(vect) {
  return Math.sqrt(vect.x * vect.x + vect.y * vect.y);
}

function buildPoly(points) {
  var s = points.length;
  points.sort((a, b) => {
    if (a.y < b.y) return -1;
    if (a.y > b.y) return 1;
    return a.x - b.x;
  });

  var start = points[0];
  points.sort((a, b) => {
    if (a === start) return -1;
    if (b === start) return 1;

    var vect1 = { x: a.x - start.x, y: a.y - start.y };
    var vect2 = { x: b.x - start.x, y: b.y - start.y };
    var cos1 = vect1.x / norm(vect1);
    var cos2 = vect2.x / norm(vect2);

    return cos2 - cos1;
  });
  var end = points[s - 1];
  points.splice(0, 0, end);

  var d = 1;
  for (var i = 2; i <= s; i++) {
    while (ccw(points[d - 1], points[d], points[i]) <= 0) {
      if (d > 1) {
        d -= 1;
        continue;
      }
      if (i === s) {
        break;
      }
      i++;
    }

    d += 1;
    points[d] = points[i];
  }

  return points.slice(1, d + 1);
}

function calcArea(poly) {
  if (poly.length <= 2) return 0;

  var s = poly.length;
  var sum = 0;
  for (var i = 0; i < s - 1; i++) {
    sum += poly[i].x * poly[i + 1].y - poly[i + 1].x * poly[i].y;
  }
  sum += poly[s - 1].x * poly[0].y - poly[0].x * poly[s - 1].y;
  return sum / 2;
}

function solve(points) {
  var area = calcArea(buildPoly(points));
  var str = area.toString();
  if (str.indexOf('.') === -1) {
    return str + '.0';
  }
  return str;
}



var s;
while (s = parseInt(readline())) {
  var points = [];
  for (var i = 0; i < s; i++) {
    var point = readline().split(' ');
    points.push({ x: parseInt(point[0]), y: parseInt(point[1]) });
  }
  print(solve(points));
}