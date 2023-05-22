let [, , GITHUB_REF] = process.argv

if (!GITHUB_REF) console.error(`please provide github ref!`), process.exit(1)

let [, , ...rest] = GITHUB_REF.split("/")
console.log(rest.join("/"))
