import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Spritesmith from 'vite-plugin-spritesmith2';
import Spritesmith from '../';
import path from 'path';

const resolve = (dir) => path.join(process.cwd(), dir);

// 雪碧图处理模板
const templateFunction = function (data) {
  let shared =
    '[class*="i-icon-"] { display:inline-block; background-image: url(I); background-size:WSMpx HSMpx; }'
      .replace('I', data.sprites[0].image)
      .replace('WSM', data.spritesheet.width)
      .replace('HSM', data.spritesheet.height);

  let perSprite = data.sprites
    .map(function (sprite) {
      return '.i-icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y);
    })
    .join('\n');

  return shared + '\n' + perSprite;
};

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Spritesmith({
      watch: process.env.NODE_ENV !== 'production',
      src: {
        cwd: resolve('./src/assets/icon'), // 图标根路径
        glob: '*.png', // 匹配任意 png 图标
      },
      target: {
        image: resolve('./src/sprite/img/sprite_normal.png'), // 生成雪碧图目标路径与名称
        // 设置生成CSS背景及其定位的文件或方式
        css: [
          [
            resolve('./src/sprite/style/sprite_normal.scss'),
            {
              format: 'function_based_template',
            },
          ],
        ],
      },
      customTemplates: {
        function_based_template: templateFunction,
      },
      apiOptions: {
        cssImageRef: resolve('./src/sprite/img/sprite_normal.png'), // css文件中引用雪碧图的相对位置路径配置
      },
      spritesmithOptions: {
        padding: 10,
      },
    }),
  ],
});
