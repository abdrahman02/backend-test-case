function reverseAlphabet(str) {
  let alphabets = str.match(/[a-zA-Z]/g) || [];
  let numbers = str.match(/\d+/g) || [];

  alphabets.reverse();

  return alphabets.join("") + numbers.join("");
}

const input = "NEGIE1";
console.log(reverseAlphabet(input));

function longestWord(sentence) {
  const words = sentence.split(" ");
  let longest = "";

  words.forEach((word) => {
    if (word.length > longest.length) {
      longest = word;
    }
  });

  return `${longest}: ${longest.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longestWord(sentence));

function queryCount(input, query) {
  return query.map((q) => input.filter((item) => item === q).length);
}

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
console.log(queryCount(INPUT, QUERY));

function diagonalDifference(matrix) {
  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][matrix.length - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonalDifference(matrix));
