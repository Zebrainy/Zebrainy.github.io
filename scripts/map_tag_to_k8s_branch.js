let [, , GITHUB_TAG, ENV] = process.argv

if (!GITHUB_TAG) console.error(`please provide github tag!`), process.exit(1)
if (!ENV) console.error(`please provide env!`), process.exit(1)

const dev = {
    "dev-yc-v": "dev-yc",
    "yc-v": "dev-yc",
    "do-v": "dev",
    "dev-do-v": "dev",
}
const prod = {
    "dev-yc-v": "",
    "yc-v": "prod-yc",
    "do-v": "master",
    "dev-do-v": "",
}
if (ENV === "dev") {
    console.log(dev[GITHUB_TAG])
    process.exit(0)
}
if (ENV === "prod") {
    console.log(prod[GITHUB_TAG])
    process.exit(0)
}

console.log(branches[GITHUB_TAG])
