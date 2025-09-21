const nestedArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const nestedArray2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, [8, 9]],
];

const nestedObject = {
  a: 1,
  b: {
    b1: 2,
    b2: {
      b2a: 3,
      b2b: 4,
    },
  },
  c: 5,
};

let str = "";
function Flatten(input) {
  if (Array.isArray(input)) {
    // arr
    input.forEach((item) => {
      if (Array.isArray(item) || typeof item === "object") {
        Flatten(item);
      } else {
        str += item;
      }
    });
  } else if (typeof input === "object" && input !== null) {
    // obj
    Object.values(input).forEach((value) => {
      if (typeof value === "object" || Array.isArray(value)) {
        Flatten(value);
      } else {
        str += value;
      }
    });
  } else {
    // number
    str += input;
  }

  return str;
}
