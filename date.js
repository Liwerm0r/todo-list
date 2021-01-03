// module.exports = {
//   generateDate: generateDate,
//   randomStuff: randomStuff
// }
//
//
//

exports.generateDate = () => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  return new Date().toLocaleDateString('en-EN', options);
}

exports.randomStuff = () => {
  console.log("Do some random stuff");
}
