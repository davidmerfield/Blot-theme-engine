var log = require('log');

require('./compile')(function(){
  log.info('All tests complete!');
  process.exit();
});
