function data (size){
    var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var len = chars.length;
    var random_data = [];

    while (size--) {
        random_data.push(chars[Math.random()*len | 0]);
    }

    return random_data.join('');
}

module.exports = {
  label: 'Ignore template files that are too large.',
  folder: {'/too-large.html': data(2.5*1000*1000)}, // 2.5mb
  expected: {"templates": {}, "routes": [], "ignored": {"/too-large.html": "TOOLARGE"}}
};