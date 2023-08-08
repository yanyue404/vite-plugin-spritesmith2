import glob from 'glob';
import gaze from 'gaze';
import path from 'path';
import compile from './lib/compile';
import processOptions from './lib/processOption';

const handler = async (customOptions) => {
  const options = processOptions(customOptions);
  const { src, watch } = options;
  const init = () => {
    return new Promise(resolve => {
      glob(path.join(src.cwd, src.glob), (err, files) => {
        if (err) {
          throw err;
        }
        compile(
          files,
          options,
          'retina' in options
        ).then(resolve);
      });
    })

  };
  await init();
  if (watch) {
    gaze(src.glob, { cwd: src.cwd }, (err, watcher) => {
      watcher.on('all', init);
    });
  }
};

/**
 * entry of plugin
 * @param {{
 *    src: { cwd: string; glob: string; };
 *    target: { image: string; css: string | string[] };
 *    apiOptions: { cssImageRef: string; generateSpriteName: (image: string) => string; handlebarsHelpers: Record<string, (helperFn) => void> };
 *    spritesmithOptions: any;
 *    customTemplates: Record<string, string | () => string>;
 *    retina: { classifier: (imgpath: string) => { type: string; normalName: string; retinaName: string; }; targetImage: string; cssImageRef: string; }
 * }} customOptions
 * @returns
 */
const spritesmith = (customOptions) => {
  return {
    name: 'vite:spritesmith',
    async buildStart() {
      console.log('vite:spritesmith buildStart ');
      await handler(customOptions);
      console.log('vite:spritesmith buildStart end');
    },
  };
};

export default spritesmith;
