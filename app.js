

const { app, BrowserWindow } = require("electron")
const path = require("path")
const { argv } = require("process")
const os = require("os")

app.on("ready", () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: argv[2] == "--test-mode",
        transparent: argv[2] != "--test-mode",
        title: "Chat Overlay",
        icon: path.join(__dirname, "/assets/icons/512x.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    if (argv[2] != "--test-mode") {
        win.setAlwaysOnTop(true)

        win.on("blur", () => {
            win.setIgnoreMouseEvents(true)
        })
        
        win.on("focus", () => {
            win.setIgnoreMouseEvents(false)
        })
    }

    win.on("close", () => {
        if (os.platform() == "darwin")
            app.quit()
    })

    win.loadFile("./src/index.htm")
})