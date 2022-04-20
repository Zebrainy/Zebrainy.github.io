const cheerio = require('cheerio')
var fs = require('fs/promises')

let [, , HTML_FILE] = process.argv

if (!HTML_FILE) {
    console.error(`File not provided`)
    process.exit(1)
}

;(async () => {
    try {
        const file = await fs.readFile(HTML_FILE, 'utf-8')
        var $ = cheerio.load(file)
        $('head').html($('head').html() + HEAD_EXTRA_STYLES)
        await fs.writeFile(HTML_FILE, $.html())
    } catch (error) {
        console.error(`Error: `, error)
    }
})()

const HEAD_EXTRA_STYLES = `<link rel="icon" href="data:;base64,=">
<style>
	* {
	margin: 0;
	padding: 0;
	}
	html,
	body {
	width: 100vw;
	max-width: 100vw;
	min-width: 100vw;
	height: 100vh;
	max-height: 100vh;
	min-height: 100vh;
	margin: 0;
	padding: 0;
	background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.75),
            rgba(255, 255, 255, 0.75)
        ),
        radial-gradient(
            95.6% 83.27% at 61.43% -27.05%,
            #afffec 50.83%,
            rgba(255, 255, 255, 0) 100%
        ),
        radial-gradient(
            72.02% 61.9% at 133.45% 16.48%,
            #2ee6ff 48.75%,
            rgba(255, 255, 255, 0) 100%
        ),
        radial-gradient(
            69.48% 59.81% at 133.87% 100.18%,
            #afd4ff 50.31%,
            rgba(255, 255, 255, 0) 100%
        ),
        radial-gradient(
            84.19% 84.96% at 61% 141.18%,
            #a79fff 38.85%,
            rgba(255, 255, 255, 0) 100%
        ),
        radial-gradient(
            72.87% 62.36% at -10.17% 100.18%,
            #e59cff 46.46%,
            rgba(255, 255, 255, 0) 100%
        ),
        radial-gradient(
            73.29% 63.94% at -10.17% 17.75%,
            #ffc803 32.29%,
            rgba(255, 255, 255, 0) 100%
        ),
        #e2f9ff !important;
	}
</style>`
