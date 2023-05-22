let [, , GITHUB_REF] = process.argv

if (!GITHUB_REF) console.error(`please provide github ref!`), process.exit(1)

const tags = {
	"dev-yc": "dev-yc-v",
	"main-yc": "yc-v",
	main: "do-v",
	dev: "dev-do-v",
}

let [, , ...rest] = GITHUB_REF.split("/")
console.log(tags[rest.join("/")])
