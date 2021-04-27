// let allPinyin = [];
// let notone = {};
// let storage = {};

// function init(dict) {
//   allPinyin = Object.keys(dict);
//   notone = parseDict(dict);
//   return match;
// }

// function parseDict(dict) {
//   const parseDict = {};
//   for (const i in dict) {
//     const temp = dict[i];
//     for (let j = 0, len = temp.length; j < len; j++) {
//       if (!parseDict[temp[j]]) {
//         parseDict[temp[j]] = i;
//       } else {
//         parseDict[temp[j]] = `${parseDict[temp[j]]} ${i}`;
//       }
//     }
//   }
//   return parseDict;
// }

// function getPinyin(cn) {
//   const result = [];
//   for (let i = 0, len = cn.length; i < len; i++) {
//     const temp = cn.charAt(i);
//     result.push(notone[temp] || temp);
//   }
//   return result;
// }
// // 对输入拼音进行切分
// function wordBreak(s) {
//   const result = [];
//   const solutions = [];
//   const len = s.length;
//   const possible = [];
//   for (let i = 0; i <= s.length; i++) {
//     possible.push(true);
//   }
//   getAllSolutions(0, s, result, solutions, possible);
//   return solutions;
// }

// function getAllSolutions(start, s, result, solutions, possible) {
//   if (start === s.length) {
//     solutions.push(result.join(' '));
//     return;
//   }
//   for (let i = start; i < s.length; i++) {
//     const piece = s.substring(start, i + 1);
//     let match = false;
//     // 最后一个音特殊处理，不需要全部打完整
//     if (allPinyin.some((i) => i.indexOf(piece) === 0) && !s[i + 1] && possible[i + 1]) {
//       if (piece.length === 1) {
//         result.push(piece);
//       } else {
//         const s = [];
//         allPinyin.forEach((i) => {
//           if (i.indexOf(piece) === 0) {
//             s.push(i);
//           }
//         });
//         result.push(s);
//       }
//       match = true;
//     } else if (allPinyin.indexOf(piece) !== -1 && possible[i + 1]) {
//       result.push(piece);
//       match = true;
//     }
//     if (match) {
//       const beforeChange = solutions.length;
//       getAllSolutions(i + 1, s, result, solutions, possible);
//       if (solutions.length === beforeChange) {
//         possible[i + 1] = false;
//       }
//       result.pop();
//     }
//   }
// }
// // 获取输入拼音的所有组合（切分 + 首字母）
// function getFullKey(key) {
//   const result = [];
//   wordBreak(key).forEach((i) => {
//     const item = i.split(' ');
//     const last = item.length - 1;
//     if (item[last].indexOf(',')) {
//       const keys = item[last].split(',');
//       keys.forEach((j) => {
//         item.splice(last, 1, j);
//         result.push(JSON.parse(JSON.stringify(item)));
//       });
//     } else {
//       result.push(item);
//     }
//   });
//   if (result.length === 0 || result[0].length !== key.length) {
//     result.push(key.split(''));
//   }
//   // 缓存当前结果 避免重复计算
//   storage = { [key]: result };
//   return result;
// }
// function point2point(test, key, last, extend) {
//   if (!test) return false;
//   const a = test.split(' ');
//   a.forEach((i) => {
//     if (i.length > 0 && extend) {
//       a.push(i.charAt(0));
//     }
//   });
//   if (!last) {
//     return a.indexOf(key) !== -1;
//   }
//   return a.some((i) => i.indexOf(key) === 0);
// }

// function match(input, keys) {
//   if (!input || !keys) return false;
//   input = input.toLowerCase();
//   keys = keys.replace(/\s+/g, '').toLowerCase();
//   const indexOf = input.indexOf(keys);
//   if (indexOf !== -1) {
//     return [indexOf, indexOf + keys.length - 1];
//   }
//   // 原文匹配(带空格)
//   const noPyIndex = getIndex(input.split(''), [keys.split('')], keys);
//   if (noPyIndex) return noPyIndex;
//   // pinyin匹配
//   const py = getPinyin(input);
//   const fullString = storage[keys] || getFullKey(keys);
//   return getIndex(py, fullString, keys);
// }
// function getIndex(py, fullString, keys) {
//   for (let p = 0; p < py.length; p++) {
//     for (let k = 0; k < fullString.length; k++) {
//       const key = fullString[k];
//       const keyLength = key.length;
//       const extend = keyLength === keys.length;
//       let isMatch = true;
//       let i = 0;
//       let preSpaceNum = 0;
//       let spaceNum = 0;
//       if (keyLength <= py.length) {
//         for (; i < key.length; i++) {
//           if (i === 0 && py[p + i + preSpaceNum] === ' ') {
//             preSpaceNum += 1;
//             i -= 1;
//           } else if (py[p + i + spaceNum] === ' ') {
//             spaceNum += 1;
//             i -= 1;
//           } else if (!point2point(py[p + i + spaceNum], key[i], !(py[p + i + 1] && key[i + 1]), extend)) {
//             isMatch = false;
//             break;
//           }
//         }
//         if (isMatch) {
//           return [p + preSpaceNum, spaceNum + p + i - 1];
//         }
//       }
//     }
//   }
//   return false;
// }
// export default init;
