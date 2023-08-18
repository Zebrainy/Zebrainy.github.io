let [, , GITHUB_REF] = process.argv

if (!GITHUB_REF) console.error(`please provide github ref!`), process.exit(1)

const tags = {
	"dev-yc": "dev-v",
	"main-yc": "v",
	"master-yc": "v",
	main: "v",
	master: "v",
	dev: "dev-v",
}

let [, , ...rest] = GITHUB_REF.split("/")
console.log(tags[rest.join("/")])
