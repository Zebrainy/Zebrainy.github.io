const dirTree = require("directory-tree")
const crypto = require('crypto')
const fs = require('fs')

let [,, DIRECTORY, GAME_NAME, VERSION] = process.argv

if (!DIRECTORY)
	(console.error(`please provide directory with files!`), process.exit(1))

if (!GAME_NAME)
	(console.error(`please provide game name!`), process.exit(1))

if (!VERSION)
	(console.error(`please provide version!`), process.exit(1))

let manifest = {
	name: GAME_NAME,
	version: VERSION,
	files: {}
}

dirTree(`./${DIRECTORY}`, undefined, (item, path, stats) =>
{
	let textToReplace = new RegExp(`^${DIRECTORY}\\/`.split('.').join('\\.'))
	// console.log(`GAME_NAME = ${GAME_NAME}`)
	// console.log(`text to replace = ${textToReplace}`)
	// console.log(`text to path = ${item.path}`)
	let fname = item.path.replace(textToReplace, '')
	console.log(`fname = ${fname}`)
	let fcont = fs.readFileSync(item.path)
	manifest.files[fname] = {
		"hash": crypto.createHash('sha256').update(fcont).digest('hex'),
		"size": stats.size
	}
})

fs.writeFileSync(`./${DIRECTORY}/manifest.json`, JSON.stringify(manifest))