import fs from 'fs'
import { getFilePathsFromDir } from './_utils'

const fixHtml = () => {
	const filePaths = [...getFilePathsFromDir('./website/html'), './website/index.html']

	filePaths.forEach((path: string) => {
		const dots = path.includes('index.html') ? '.' : '..'
		let code = fs.readFileSync(path, 'utf8')

		code = code // Fix Supernova code
			.replace(/<div class="container-footer small" "="">/g, '<div class="container-footer small">')
			.replace(/<script src="\.+\/scripts\/sandbox_v10.js"><\/script>/g, '')
			.replace(/fuse.js@6.5.3/g, 'fuse.js')
			.replace(/\sconst versionUrl =/g, `//const versionUrl =`)
			.replace(/\sloadVersions\(versionUrl\)/g, `//loadVersions(versionUrl)`)
			.replace(/\sconst sandboxConfigUrl =/g, `//const sandboxConfigUrl =`)
			.replace(/\sloadSandboxes\(sandboxConfigUrl\)/g, `//loadSandboxes(sandboxConfigUrl)`)

		code = code // Fix WebPageDownloader paths
			.replace(/href="\/css2"/g, `href="${dots}/styles/css2.css"`)

		fs.writeFileSync(path, code)
	})
}

const fixJs = () => {
	{
		const path = './website/scripts/si.js'
		let code = fs.readFileSync(path, 'utf8')

		code = code // Fix WebPageDownloader paths
			.replace(/\/latest\/leadership-system/g, '/leadership-system')
			.replace(/\/latest\/.*?\//g, '/html/')

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

const copyAssets = () => {
	const filePaths = getFilePathsFromDir('./.tooling/assets')

	filePaths.forEach((path: string) => {
		fs.copyFile(path, path.replace('.tooling/assets', 'website'), () => {})
	})
}

fixHtml()
fixJs()
renameFiles()
copyAssets()
