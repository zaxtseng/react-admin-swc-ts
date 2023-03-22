import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, PluginOption, UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { useEnv } from './build';

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
	// 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
	const env = loadEnv(mode, process.cwd(), '') as ImportMetaEnv;
	const viteEnv = useEnv(env);

	// console.log('env:', env);

	return {
		base: './',
		// alias config
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src'),
				'#': path.join(__dirname, 'src/types'),
				'@build': path.join(__dirname, 'build')
			}
		},
		// global css
		css: {},
		// server config
		server: {
			// host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				'/api': {
					target: `https://localhost:${viteEnv.VITE_PORT}/api`,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, '')
				}
			}
		},
		// plugins
		plugins: [
			react(),
			vanillaExtractPlugin(),
			createHtmlPlugin({
				inject: {
					data: {
						title: env.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				//* 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				//* 指定symbolId格式
				symbolId: 'icon-[dir]-[name]'
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * 是否生成包预览
			viteEnv.VITE_REPORT &&
				(visualizer({
					gzipSize: true,
					brotliSize: true,
					emitFile: false,
					filename: 'test.html', //分析图生成的文件名
					open: true //如果存在本地服务端口，将在打包后自动展示
				}) as PluginOption),
			// * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
				viteCompression({
					verbose: true,
					disable: false,
					threshold: 10240,
					algorithm: 'gzip',
					ext: '.gz'
				})
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
		},
		// build configure
		build: {
			outDir: 'dist',
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: 'esbuild',
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	};
});
