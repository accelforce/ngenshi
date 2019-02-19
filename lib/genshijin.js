var colors = require('colors/safe');
var kuromoji = require('kuromoji');


var builder = kuromoji.builder({
  dicPath : 'node_modules/kuromoji/dict'
});

var posColor = {
  '名詞' : colors.yellow,
  '動詞' : colors.green,
  '形容詞' : colors.cyan,
  '副詞' : colors.magenta,
  '助詞' : colors.red,
  '助動詞' : colors.magenta,
  '連体詞' : colors.magenta,
  '感動詞' : colors.yellow
};

module.exports = function(text) {
  builder.build(function(err, tokenizer) {
    if(err) {
      throw err;
    }

    var tokens = tokenizer.tokenize(text);

    var before = "";
    var after = [];
    for(var token of tokens) {
      var pos = token['pos']
      before += (posColor[pos] == null ? colors.white : posColor[pos])(token['surface_form']);
      if(pos !== '助詞') {
        after.push(token['reading'] ? token['reading'] : token['surface_form']);
      }
    }

    console.log(colors.green("genshijin : convert : ") + before);
    console.log(" >> " + after.join(' '));
  })
};
