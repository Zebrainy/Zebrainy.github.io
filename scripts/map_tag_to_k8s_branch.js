let [, , GITHUB_TAG, ENV] = process.argv

if (!GITHUB_TAG) console.error(`please provide github tag!`), process.exit(1)
if (!ENV) console.error(`please provide env!`), process.exit(1)

const tags = {
	dev: {
		"dev-yc-v": "dev-yc",
		"yc-v": "dev-yc",
		"do-v": "dev",
		"dev-do-v": "dev",
	},
	prod: {
		"dev-yc-v": "",
		"yc-v": "prod-yc",
		"do-v": "master",
		"dev-do-v": "",
	},
}

const find = Object.keys(tags[ENV]).find((key) => key.startsWith(GITHUB_TAG))
console.log(console.log(find))
process.exit(0)
