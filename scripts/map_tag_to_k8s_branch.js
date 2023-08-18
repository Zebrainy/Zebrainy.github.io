let [, , GITHUB_TAG, ENV] = process.argv

if (!GITHUB_TAG) console.error(`please provide github tag!`), process.exit(1)
if (!ENV) console.error(`please provide env!`), process.exit(1)

GITHUB_TAG = GITHUB_TAG.replace(/refs\/[^\/]*\//, "")

const tags = {
	dev: {
		"dev-yc-v": "dev",
		"yc-v": "dev",
		"v": "dev",
		"dev-v": "dev",
	},
	prod: {
		"dev-yc-v": "",
		"v": "master",
		"yc-v": "master",
		"dev-do-v": "",
	},
}

const obj = tags[ENV]
const find = Object.keys(obj).find((key) => GITHUB_TAG.startsWith(key))
console.log(obj[find])
process.exit(0)
