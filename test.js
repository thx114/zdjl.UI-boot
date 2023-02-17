require('https').get('https://raw.githubusercontent.com/thx114/zdjl.UI-boot/master/just.js', (res) => {
    let data = '';
res.on('data', (chunk) => {data += chunk;});
res.on('end', () => {
    zdjl.runActionAsync({type: "运行JS代码", jsCode: data })
    });
}).on('error', (err) => {console.log('Error: ' + err.message);});
