import fs from 'fs'
import { getFilePathsFromDir } from './_utils'

const fixHtml = () => {
	const filePaths = [...getFilePathsFromDir('./website/html'), './website/index.html']
	let homePath = ''

	filePaths.forEach((path: string) => {
		if (path.includes('/html/leadership-system')) {
			homePath = path.replace(/.*?\/html\//, './html/')
		}

		let code = fs.readFileSync(path, 'utf8')

		code = code // Fix Supernova code
			.replace(/<div class="container-footer small" "="">/g, '<div class="container-footer small">')
			.replace(/<script src="\.+\/scripts\/sandbox_v10.js"><\/script>/g, '')
			.replace(/fuse.js@6.5.3/g, 'fuse.js')
			.replace(/\sconst versionUrl =/g, `//const versionUrl =`)
			.replace(/\sloadVersions\(versionUrl\)/g, `//loadVersions(versionUrl)`)
			.replace(/\sconst sandboxConfigUrl =/g, `//const sandboxConfigUrl =`)
			.replace(/\sloadSandboxes\(sandboxConfigUrl\)/g, `//loadSandboxes(sandboxConfigUrl)`)
			.replace(/\s\| Made with Supernova/g, ``)
			.replace(/\s\| Design system documentation, made with ❤️ using Supernova/g, ``)
			.replace(/"og:url" content="\/latest\/.*\//g, `"og:url" content="../html/`)
			.replace(/"og:url" content="\/latest\//g, `"og:url" content="../html/`)
			.replace(/"twitter:url" content="\/latest\/.*\//g, `"twitter:url" content="../html/`)
			.replace(/"twitter:url" content="\/latest\//g, `"twitter:url" content="../html/`)

		code = code // Fix WebPageDownloader paths
			.replace(/href="\/css2"/g, `href="../styles/css2.css"`)

		if (path.includes('index.html')) {
			code = code.replace(/window.location.href = ''/, `window.location.href = '${homePath}'`)
		}

		fs.writeFileSync(path, code)
	})
}

const fixJs = () => {
	{
		const path = './website/scripts/si.js'
		let code = fs.readFileSync(path, 'utf8')

		code = code // Fix WebPageDownloader paths
			.replace(/\/latest\/leadership-system/g, '../html/leadership-system')
			.replace(/\/latest\/.*\//g, '../html/')
			.replace(/\/latest\//g, '../html/')

		fs.writeFileSync(path, code)
	}
	{
		const path = './website/scripts/functionality.js'
		let code = fs.readFileSync(path, 'utf8')

		code = code // Fix Supernova code
			.replace(/window.sandboxEngine.listener/g, 'window.sandboxEngine')
			.replace(/\r\n?/g, '\n') // Fix LF

		fs.writeFileSync(path, code)
	}
}

const renameFiles = () => {
	// Fix WebPageDownloader paths
	fs.rename('./website/styles/.css2', './website/styles/css2.css', () => {})
	fs.rename('./website/scripts/fuse.js6.5.3', './website/scripts/fuse.js', () => {})
}

const deleteFiles = () => {
	fs.unlink('./website/scripts/.js', () => {})
}

const copyAssets = () => {
	const filePaths = getFilePathsFromDir('./.tooling/assets')

	filePaths.forEach((path: string) => {
		fs.copyFile(path, path.replace('.tooling/assets', 'website'), () => {})
	})
}

copyAssets()
deleteFiles()
renameFiles()
fixHtml()
fixJs()
