var p='pacman',c='ciego',l='listillo',a='asesino',o='bola',O = 'bolon', x='esp';
var pantalla = [
[
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, c, x, l, x, x, a, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, l, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, c, x, x, l, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, p, x, x, x, c, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, c, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, c, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ o, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]]

,[
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, a],
[ x, x, x, x, x, x, x, x, x, O, x, x, x, x, x, x, x, x, 1, l],
[ x, x, x, x, o, 1, x, x, x, 1, x, x, x, x, x, x, x, x, 1, c],
[ x, x, x, x, o, 1, x, x, 2,10, 2, 2, 8, 2, O, x, x, x, 1, x],
[ x, x, x, 1, o, 1, x, x, x, x, x, x, 1, x, x, x, x, x, 1, x],
[ x, x, 6,10, 2, 4, x, x, x, x, x, x,11, 2, o, x, x, x, 1, x],
[ x, x, 1, x, x, x, x, 6, 2, x, x, 6, 4, x, o, x, x, x, 1, x],
[ x, x, p, x, x, 2, 2, 9, O, x, x, x, x, x, o, x, x, x, x, x],
[ x, x, 1, x, x, x, x, 5, 2, x, x, 5, 3, x, o, x, x, x, 1, x],
[ x, x, 5, 8, 2, 3, x, x, x, x, x, x,11, 2, o, x, x, x, 1, x],
[ x, x, x, 1, o, 1, x, x, x, x, x, x, 1, x, x, x, x, x, 1, x],
[ x, x, x, x, o,11, x, x, 2, 8, 2, 2,10, 2, O, x, x, x, 1, x],
[ x, x, x, x, o,11, x, x, x, 1, x, x, x, x, x, x, x, x, 1, c],
[ x, x, x, x, x, x, x, x, x, O, x, x, x, x, x, x, x, x, 1, l],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, a]]

,[
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, c, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, o, l, p, x, x, x, x, x, x, o, x, O, x, x, x, x, x, x],
[ x, x, x, x, c, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, a, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]]

,[
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ p, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, o, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, o, o, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, o, o, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, x, x, x, o, o, x, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, x, x, x, x, x, o, x, x, x, x, x],
[ x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, o, o, x, x, x],
[ x, x, x, x, 1, 1, x, x, x, x, x, x, x, x, x, x, x, o, o, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
[ x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x]]
];