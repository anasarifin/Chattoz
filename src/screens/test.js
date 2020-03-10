const datax = ['waw', 'wew', 'wow'];

function format(data) {
  let word = '';
  data.forEach((x, i) => {
    if (i < data.length - 1) {
      word += `"${x}",`;
    } else {
      word += `"${x}"`;
    }
  });
  return `(${word})`;
}

format(datax);
