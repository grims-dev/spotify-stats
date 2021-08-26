export function convertMsToMinutes(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor(((ms % 60000) / 1000));
  const secondsFormatted = (seconds < 10 ? '0' : '') + seconds;
  return `${minutes} minutes, ${secondsFormatted} seconds`;
}

export function averageObjectValues(arrayOfObjects: Array<any>, keysToAverage?: Array<string>) {
  const newObject = arrayOfObjects.reduce((a, b) => {
    for (let property in b) {
      if (b.hasOwnProperty(property) && (keysToAverage.length && keysToAverage.includes(property))) {
        a[property] = (a[property] || 0) + b[property];
      }
    }
    return a;
  }, {});
  Object.keys(newObject).forEach(property => {
    newObject[property] = newObject[property] / arrayOfObjects.length;
  });
  return newObject;
}
