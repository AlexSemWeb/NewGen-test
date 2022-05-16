type Prices = (null | number)[];

type TypeOfSorting = "fromLowToHigh" | "fromHighToLow";

interface ICourse {
  name: string;
  prices: Prices;
}

let courses: ICourse[] = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];

let requiredRange1: Prices = [null, 200];
let requiredRange2: Prices = [100, 350];
let requiredRange3: Prices = [200, null];

const transformNullToInfinity = (num: number): number =>
  num === null ? Infinity : num;

function isInRange(range: Prices, prices: Prices): boolean {
  return range
    .map((item, index): boolean => {
      let rangeItem = index ? transformNullToInfinity(item) : item;
      return (
        rangeItem >= prices[0] &&
        rangeItem <= transformNullToInfinity(prices[1])
      );
    })
    .some((item) => item);
}

function coursesFilter(courses: ICourse[], range: Prices): ICourse[] | [] {
  return courses.filter((item) => {
    return isInRange(range, item.prices);
  });
}

function coursesSort(courses: ICourse[], typeOfSorting?: ITypeOfSorting) {
  return courses.sort((a, b) => {
    if (typeOfSorting === "fromLowToHigh") {
      return a.prices[0] - b.prices[0];
    } else if (typeOfSorting === "fromHighToLow") {
      return b.prices[0] - a.prices[0];
    }
    return;
  });
}

console.log(coursesFilter(courses, requiredRange1));
console.log(coursesFilter(courses, requiredRange2));
console.log(coursesFilter(courses, requiredRange3));

console.log(coursesSort(courses));
