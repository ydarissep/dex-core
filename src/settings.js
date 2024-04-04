window.settings = []

async function applySettings(settingsArg = []){
    if(settingsArg.length > 0){
        settings = settingsArg
    }
    else if(localStorage.getItem("DEXsettings")){
        settings = JSON.parse(localStorage.getItem("DEXsettings"))
    }

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

    const speciesPanelHistoryHide = document.createElement("div")
    const speciesPanelHistoryHideCheckbox = document.createElement("input"); speciesPanelHistoryHideCheckbox.setAttribute("type", "checkbox"); speciesPanelHistoryHideCheckbox.setAttribute("id", "speciesPanelHistoryHide")
    const speciesPanelHistoryHideLabel = document.createElement("label"); speciesPanelHistoryHideLabel.setAttribute("for", "speciesPanelHistoryHideCheckbox"); speciesPanelHistoryHideLabel.innerText = "Hide last seen history"
    speciesPanelHistoryHide.append(speciesPanelHistoryHideCheckbox)
    speciesPanelHistoryHide.append(speciesPanelHistoryHideLabel)
    speciesPanelFieldset.append(speciesPanelHistoryHide)
    if(settings.includes("speciesPanelHistoryHide")){
        speciesPanelHistoryHideCheckbox.checked = true
    }
    addEventListenerSetting(speciesPanelHistoryHideCheckbox, "speciesPanelHistoryHide")

    const speciesPanelHistorySticky = document.createElement("div")
    const speciesPanelHistoryStickyCheckbox = document.createElement("input"); speciesPanelHistoryStickyCheckbox.setAttribute("type", "checkbox"); speciesPanelHistoryStickyCheckbox.setAttribute("id", "speciesPanelHistoryHide")
    const speciesPanelHistoryStickyLabel = document.createElement("label"); speciesPanelHistoryStickyLabel.setAttribute("for", "speciesPanelHistoryHideCheckbox"); speciesPanelHistoryStickyLabel.innerText = "Last seen history always visible (sticky)"
    speciesPanelHistorySticky.append(speciesPanelHistoryStickyCheckbox)
    speciesPanelHistorySticky.append(speciesPanelHistoryStickyLabel)
    speciesPanelFieldset.append(speciesPanelHistorySticky)
    if(settings.includes("speciesPanelHistorySticky")){
        speciesPanelHistoryStickyCheckbox.checked = true
    }
    addEventListenerSetting(speciesPanelHistoryStickyCheckbox, "speciesPanelHistorySticky")

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
    applySettings(settings)
}

function addEventListenerSetting(el, setting){
    el.addEventListener("change", () => {
        if(el.checked){
            changeSetting(setting, true)
        }
        else{
            changeSetting(setting, false)
        }
    })
}