import readFile from 'fs-readfile-promise';

if (process.argv.length !== 4) {
  console.log('Both script name and input name are required');
  process.exit();
}

const scriptpath = `${__dirname}/${process.argv[2]}`;
const inputpath = `${__dirname}/${process.argv[3]}`;

(async () => {
  const input = await readFile(inputpath, 'utf8');
  const script = await import(scriptpath);
  const result = script.default(input.split('\n').filter(Boolean));

  if (result) {
    console.log(result);
  }
})();
