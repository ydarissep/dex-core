window.settings = []
if(localStorage.getItem("DEXsettings")){
    settings = JSON.parse(localStorage.getItem("DEXsettings"))
}

async function applySettings(){
    if(settings.includes("speciesPanelHistoryHide")){
        speciesPanelHistoryContainer.classList.add("hide")
    }
    else{
        speciesPanelHistoryContainer.classList.remove("hide")
    }

    if(settings.includes("speciesPanelHistorySticky")){
        speciesPanelHistoryContainer.classList.add("speciesPanelHistorySticky")
    }
    else{
        speciesPanelHistoryContainer.classList.remove("speciesPanelHistorySticky")
    }
}

function manageSettings(){
    const settingsMainContainer = document.createElement("div")

    const speciesPanelFieldset = document.createElement("fieldset"); speciesPanelFieldset.style.textAlign = "left"
    const speciesPanelLegend = document.createElement("legend"); speciesPanelLegend.innerText = "Species Panel"
    speciesPanelFieldset.append(speciesPanelLegend)
    speciesPanelFieldset.append(returnSettingEl("speciesPanelHistoryHide", "Hide History"))
    speciesPanelFieldset.append(returnSettingEl("speciesPanelHistorySticky", "Sticky History"))
    settingsMainContainer.append(speciesPanelFieldset)

    popup.append(settingsMainContainer)
}

function changeSetting(setting, enable = false){
    if(enable){
        if(!settings.includes(setting)){
            settings.push(setting)
        }
    }
    else{
        settings = settings.filter(value => value != setting)
    }
    localStorage.setItem("DEXsettings", JSON.stringify(settings))
    applySettings()
}

function addEventListenerSetting(el, setting){
    el.addEventListener("change", () => {
        changeSetting(setting, el.checked)
    })
}

function returnSettingEl(setting, settingText){
    const settingEl = document.createElement("div")
    const settingCheckbox = document.createElement("input"); settingCheckbox.setAttribute("type", "checkbox"); settingCheckbox.setAttribute("id", `${setting}Checkbox`)
    const settingLabel = document.createElement("label"); settingLabel.setAttribute("for", `${setting}Checkbox`); settingLabel.innerText = settingText
    settingEl.append(settingCheckbox)
    settingEl.append(settingLabel)
    if(settings.includes(setting)){
        settingCheckbox.checked = true
    }
    addEventListenerSetting(settingCheckbox, setting)

    return settingEl
}