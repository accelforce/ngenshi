import colors from 'colors/safe.js';
import kuromoji from 'kuromoji';
import striptags from 'striptags';

const builder = kuromoji.builder({
    dicPath: 'node_modules/kuromoji/dict',
});

const posColor = {
    '名詞': colors.yellow,
    '動詞': colors.green,
    '形容詞': colors.cyan,
    '副詞': colors.magenta,
    '助詞': colors.red,
    '助動詞': colors.magenta,
    '連体詞': colors.magenta,
    '感動詞': colors.yellow,
};

const toot = async (params) => {
    const url = `"https://${params['domain']}/api/v1/statuses`;

    console.log(`${colors.magenta('genshijin : toot : POST')} ${url}`);

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            status: params['status'],
            spoiler_text: params['spoiler_text'] || '',
            visibility: params['visibility'] || 'unlisted',
        }),
        headers: {
            Authorizations: `Bearer ${params['access_token']}`,
        },
    })
        .then(({status}) => {
            console.log(`${colors.magenta('genshijin : toot :')} ${colors.green(`< ${status}`)} ${url}`);
        })
        .catch((err) => {
            console.log(`${colors.magenta('genshijin : toot :')} ${colors.red('ERROR')} ${url} ${colors.red(err.message)}`);
        });
};

const genshijin = async (text, domain, access_token) => {
    text = striptags(text);

    if (!text) {
        console.log(`${colors.green('genshijin : convert :')} ${colors.red('No text given.')}`);
        return;
    }

    const status = await new Promise((resolve, reject) => {
        builder.build((err, tokenizer) => {
            if (err) {
                reject(err);
            }

            const tokens = tokenizer.tokenize(text);

            const arr = tokens.map(({pos, surface_form, reading}) => ({
                before: (posColor[pos] || colors.white)(surface_form),
                after: pos === '助詞' ? null : (reading || surface_form),
            }));

            const before = arr.map(({before}) => before).join('');
            const after = arr.map(({after}) => after).filter((x) => x).join(' ');

            console.log(`${colors.green('genshijin : convert :')} ${before}`);
            console.log(`${colors.green('genshijin : convert :')} >> ${after}`);

            resolve(after);
        });
    });

    await toot({
        domain,
        access_token,
        status,
    });
};

export default genshijin;
