var colors = require('colors/safe');
var kuromoji = require('kuromoji');
var striptags = require('striptags');

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

async function toot(params) {
  var url = "https://" + params['domain'] + "/api/v1/statuses";
  
  console.log(colors.magenta("genshijin : toot : POST ") + url);

  await fetch(url, {
    method : 'POST',
    body : JSON.stringify({
      status : params['status'],
      spoiler_text : params['spoiler_text'] == null ? "" : params['spoiler_text'],
      visibility : params['visibility'] == null ? "unlisted" : params['visibility'],
    }),
    headers : {
      Authorizations : `Bearer ${params['access_token']}`,
    },
  })
      .then(({ status }) => {
        console.log(colors.magenta("genshijin : toot : ") + colors.green("< " + status + " ") + url);
      })
      .catch((err) => {
        console.log(colors.magenta("genshijin : toot : ") + colors.red("ERROR ") + url + ' ' + colors.red(err.message));
      });
}

module.exports = function(text, domain, access_token) {

  text = striptags(text);

  if(!text) {
    console.log(colors.green("genshijin : convert : ") + colors.red("No text given."));
    return;
  }

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

    after = after.join(' ')

    console.log(colors.green("genshijin : convert : ") + before);
    console.log(colors.green("genshijin : convert : ") + " >> " + after);

    toot({
      'domain' : domain,
      'access_token' : access_token,
      'status' : after
    });
  })
};
