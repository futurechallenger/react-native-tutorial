const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const router = require('koa-router')();
const views = require('koa-views');

const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const path = require('path');
const extname = path.extname;

const BUNDLE_NAME = 'hot_reload.bundle';

const app = new Koa();

const REST_OBJ = {
  state: 0,
  message: 'sucess',
};

app.use(views(path.join(__dirname, '/views'), {extension: 'ejs'}));
app.use(koaBody({ multipart: true }));

router.get('/api/version/current', async (ctx) => {
  // return JSON.stringify(_.assign({}, REST_OBJ, ))
  ctx.body = JSON.stringify({ ...REST_OBJ, version: 3 });
});

router.get('/bundle/download', async (ctx) => {
  const fpath = path.join(__dirname, '/public');
  console.log(`===> download path ${fpath}`);
  const fstat = await stat(fpath);

  if (fstat.isFile()) {
    ctx.type = extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
})

app.use(async (ctx, next) => {
  await next();
  if (ctx.body || !ctx.idempotent) return;
  ctx.redirect('/404.html');
});

app.use(serve(path.join(__dirname, '/public')));
app.use(async (ctx, next) => {
  // ignore non-POSTs
  if ('POST' != ctx.method) return await next();

  const file = ctx.request.body.files.upload;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(__dirname, '/public', BUNDLE_NAME));
  reader.pipe(stream);
  console.log('uploading %s -> %s', BUNDLE_NAME, stream.path);

  ctx.redirect('/');
});
app.use(router.routes());

app.listen(3033);

const stat = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    })
  });
};