/*
    Copyright (C) 2021  zani

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const fs = require("fs")
const os = require("os")
const path = require("path")
const LogReader = require("./js/LogReader")
const { shell } = require("electron")

const colors = {
    "DARK_RED": "#AA0000",
    "RED": "#FF5555",
    "GOLD": "#FFAA00",
    "YELLOW": "#FFFF55",
    "DARK_GREEN": "#00AA00",
    "GREEN": "#55FF55",
    "AQUA": "#55FFFF",
    "DARK_AQUA": "#00AAAA",
    "DARK_BLUE": "#0000AA",
    "BLUE": "#5555FF",
    "LIGHT_PURPLE": "#FF55FF",
    "DARK_PURPLE": "#AA00AA",
    "WHITE": "#FFFFFF",
    "GRAY": "#AAAAAA",
    "DARK_GRAY": "#555555",
    "BLACK": "#000000"
}

const ranks = {
    "SUPERSTAR": `<span style="color: {monthly_color}">[MVP</span>{plus_color}{plus_color}<span style="color: {monthly_color}">] `,
    "MVP_PLUS": `<span style="color: ${colors["AQUA"]}">[MVP</span>{plus_color}<span style="color: ${colors["AQUA"]}">] `,
    "MVP": `<span style="color: ${colors["AQUA"]}">[MVP] `,
    "VIP_PLUS": `<span style="color: ${colors["GREEN"]}">[VIP</span><span style="color: ${colors["GOLD"]}">+</span><span style="color: ${colors["GREEN"]}">] `,
    "VIP": `<span style="color: ${colors["GREEN"]}">[VIP] `,
    "NON": `<span style="color: ${colors["GRAY"]}">`
}

const threatColors = [
    "GREEN",
    "YELLOW",
    "RED",
    "DARK_PURPLE"
]

const threatNames = [
    "BAD",
    "OK",
    "GOOD",
    "VERY GOOD"
]

window.addEventListener("load", () => {
    const userList = document.querySelector("#users")

    userList.style.visibility = "visible"

    const folderPath = path.join(os.homedir(), "/duels_overlay")
    const configPath = path.join(folderPath, "config.json")


    let lastLog = []
    let changedLogs = []
    let logs = []
    let users = []

    let config = {
        user: "",
        minecraftPath: require("minecraft-folder-path")
    }


    let logPath = ""

    if (fs.existsSync(folderPath)) {
        config = JSON.parse(fs.readFileSync(configPath, { encoding: "utf8" }))

        console.log(config)
        logPath = path.join(config.minecraftPath, "latest.log")

        const logReader = new LogReader(logPath)

        logReader.on("server_change", () => {
            users = []
            for (const element of document.querySelectorAll(".user")) {
                element.remove()
            }
        })

        logReader.on("join", (name) => {
            console.log(name)
           

            const userElement = document.createElement("tr")
            const nameElement = document.createElement("td")
          
            nameElement.innerHTML = ""

                    nameElement.innerHTML += `<span id="nameElement" style="color: ${colors["WHITE"]};">${name}</span>`
                    

                  
                    userElement.append(nameElement)
                    
                   
              

                    userElement.className = "user"
                    userElement.id = `user-${name}`

                    userList.append(userElement)

                    users.push(name)
               
            
        })


    } 
    
})