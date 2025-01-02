import path from 'path'
import fs from 'fs'

export function getFilePathsFromDir(startDir: string): string[] {
	const files = [] as string[]

	;(function traverseDir(dir) {
		fs.readdirSync(dir).forEach((file) => {
			let fullPath = path.join(dir, file)

			if (fs.lstatSync(fullPath).isDirectory()) {
				traverseDir(fullPath)
			} else {
				files.push(fullPath)
			}
		})
	})(startDir)

	return files.map((path: string) => path.replaceAll('\\', '/')) // Fix Windows paths
}
