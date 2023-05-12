import { getListTables } from '../stalingrad-ecomm/src/pages/api/myDBquery.ts';

export function codeToNumber(codeRaw) {
  const code = codeRaw.toLowerCase();
  if (code.length === 1) {
    return code.charCodeAt(0) - 96;
  }
  if (code.length === 2) {
    return (code.charCodeAt(0) - 96) * 26 + (code.charCodeAt(1) - 96);
  }
  throw new Error("@codeToNumber() - Wrong code format ");
}

export function numberToCode(numberRaw) {
  if (numberRaw < 26 && numberRaw >= 0) {
    return String.fromCharCode(numberRaw + 97).toUpperCase();
  }
  if (numberRaw >= 26) {
    const firstLetter = Math.floor(numberRaw / 26 + 96);
    return `${String.fromCharCode(firstLetter).toUpperCase()}${String.fromCharCode(numberRaw % 26 + 97).toUpperCase()}`
  }
  throw new Error('@numberToCode() number out of range ');
}

const allTables = await getListTables();
console.log(allTables);

// console.log(codeToNumber("AZ"));
// console.log(numberToCode(5));
