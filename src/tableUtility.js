async function displaySetup(){
    footerP("")

    if(Object.keys(strategies).length === 0){
        onlyShowStrategyPokemon.classList.add("hide")
    }
    if(Object.keys(locations).length === 0){
        locationsButton.classList.add("hide")
    }
    if(Object.keys(trainers).length === 0){
        trainersButton.classList.add("hide")
    }
    if(Object.keys(items).length === 0){
        itemsButton.classList.add("hide")
    }
    else{
        await setupItemsButtonFilters()
    }
    if(typeof innatesDefined !== "undefined"){
        document.getElementsByClassName("innatesHeader")[0].classList.remove("hide")
    }
    if(typeof showShinyToggle !== "undefined"){
        document.getElementById("shinyContainer").classList.remove("hide")
    }

    lazyLoading(true)

    await tableInput.classList.remove("hide")

    await tableButton.classList.remove("hide")

    await tableFilter.classList.remove("hide")

    await table.classList.remove("hide")

    await utilityButton.classList.remove("hide")
}





function allAreEqual(array) {
    if (array.length > 0) {
      const result = array.every(element => {
        if(element === array[0]){
          return true
        }
      })
      return result
    }
    return false
}





function sortTableByClassName(table, obj, key, classHeader, asc = true) {
    const dirModifier = asc ? 1 : -1

    tracker.sort((a, b) => {
        let stringA = ""
        let stringB = ""
        for(let i = 0; i < key.length; i++){
            stringA += obj[a["key"]][key[i]]
            stringB += obj[b["key"]][key[i]]
        }
        if(!isNaN(stringA)){
            stringA = parseInt(stringA)
        }
        if(!isNaN(stringB)){
            stringB = parseInt(stringB)
        }

        return stringA > stringB ? (1 * dirModifier) : (-1 * dirModifier)
    })

    lazyLoading(true)

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"))
    table.querySelector(`th.${classHeader}`).classList.toggle("th-sort-asc", asc)
    table.querySelector(`th.${classHeader}`).classList.toggle("th-sort-desc", !asc)
}







function sortTableByLearnsets(asc = true) {
    const dirModifier = asc ? 1 : -1
    const sortOrder = ["levelUpLearnsets", "eggMovesLearnsets", "TMHMLearnsets", "tutorLearnsets", "false"]

    speciesTracker.sort((a, b) => {
        let stringA = `${speciesCanLearnMove(species[a["key"]], speciesMoveFilter)}`
        let stringB = `${speciesCanLearnMove(species[b["key"]], speciesMoveFilter)}`
        
        if(Number(stringA) && Number(stringB)){
            return parseInt(stringA) > parseInt(stringB) ? (1 * dirModifier) : (-1 * dirModifier)
        }
        if(Number(stringA)){
            stringA = "levelUpLearnsets"
        }
        if(Number(stringB)){
            stringB = "levelUpLearnsets"
        }

        return sortOrder.indexOf(stringA) > sortOrder.indexOf(stringB) ? (1 * dirModifier) : (-1 * dirModifier)
    })

    lazyLoading(true)

    // Remember how the column is currently sorted
    speciesTable.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"))
    speciesTable.querySelector(`th.ID`).classList.toggle("th-sort-asc", asc)
    speciesTable.querySelector(`th.ID`).classList.toggle("th-sort-desc", !asc)
}









function filterTableInput(input, obj, keyArray){
    const sanitizedInput = input.trim().replaceAll(regexSpChar, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const regexInput = new RegExp(sanitizedInput, "i")

    for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        tracker[i]["filter"].push("input")
        for (let k = 0; k < keyArray.length; k++){
            if(keyArray[k] !== "innates" || typeof innatesDefined !== "undefined"){
                if(regexInput.test(sanitizeString("" + obj[tracker[i]["key"]][keyArray[k]]).replaceAll(regexSpChar, ""))){
                    tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
                    break
                }
            }
        }
    }

    lazyLoading(true)
}








function filterLocationsTableInput(input, obj, keyArray){
    const arraySanitizedInput = input.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(regexSpChar)

    mainLoop: for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        const zone = tracker[i]["key"].split("\\")[0].replaceAll(regexSpChar, "").toLowerCase()
        const method = tracker[i]["key"].split("\\")[1].replaceAll(regexSpChar, "").toLowerCase()
        const name = tracker[i]["key"].split("\\")[2]
        let compareString = `${zone},${method},`.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        if(name in species){
            for (let k = 0; k < keyArray.length; k++){
                compareString += (obj[name][keyArray[k]] + ",").replaceAll(regexSpChar, "").replace(/species/i, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            }
            for(splitInput of arraySanitizedInput){
                if(!compareString.includes(splitInput)){
                    tracker[i]["filter"].push("input")
                    continue mainLoop
                }
            }
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
        }
    }

    lazyLoading(true)
}





function filterTrainersTableInput(input){
    const arraySanitizedInput = input.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/ /g)

    mainLoop: for(let i = 0, j = trainersTracker.length; i < j; i++){
        delete trainersTracker[i]["show"]
        tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
        const zone = tracker[i]["key"].split("\\")[0]
        const trainer = tracker[i]["key"].split("\\")[1]
        const compareZone = zone.replaceAll(/ /g, "").toUpperCase()
        //const compareTrainer = trainer.replaceAll(/ /g, "").toUpperCase()
        let compareArray = [compareZone, /*compareTrainer, */trainers[zone][trainer]["ingameName"].toUpperCase()]
        
        const trainerDifficulty = checkTrainerDifficulty(zone, trainer)
        for(let k = 0; k < trainers[zone][trainer]["party"][trainerDifficulty].length; k++){
            compareArray.push(trainers[zone][trainer]["party"][trainerDifficulty][k]["name"])
        }
        for(let k = 0; k < arraySanitizedInput.length; k++){
            if(!compareArray.some(compareValue => compareValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(arraySanitizedInput[k].toUpperCase()))){
                delete trainers[zone][trainer]["match"]
                tracker[i]["filter"].push("input")
                continue mainLoop
            }
            if(trainersTracker[i]["filter"].length === 0){
                trainers[zone][trainer]["match"] = true
            }
        }
        if(input.trim().length === 0 && trainersFilterContainer.children.length === 0){
            delete trainers[zone][trainer]["match"]
        }
    }
    showRematch()
    
    lazyLoading(true)
}

function filterItemsTableInput(input, keyArray){
    const sanitizedInput = input.trim().replaceAll(regexSpChar, "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const regexInput = new RegExp(sanitizedInput, "i")

    for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        tracker[i]["filter"].push("input")
        for(let k = 0; k < keyArray.length; k++){
            if(regexInput.test(sanitizeString("" + items[tracker[i]["key"]][keyArray[k]]).replaceAll(regexSpChar, ""))){
                tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
                break
            }
        }
        Object.keys(items[tracker[i]["key"]]["locations"]).forEach(method => {
            if(regexInput.test(sanitizeString("" + items[tracker[i]["key"]]["locations"][method]).replaceAll(regexSpChar, ""))){
                if(!settings.includes(method)){
                    tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
                }
            }
        })
    }

    lazyLoading(true)
}




async function lazyLoading(reset = false){
    const activeTable = document.querySelectorAll(".activeTable > tbody")[0]
    if(activeTable && typeof tracker !== 'undefined')
    {
        if(reset){
            while (activeTable.firstChild) {
                activeTable.removeChild(activeTable.firstChild)
            }
            refreshURLParams()
        }
        let target = 75
        let counter = 0

        const displayFunction = `append${sanitizeString(activeTable.id).replace("tabletbody", "ToTable")}`
        if(displayFunction === "appendTrainersToTable"){
            target = 20
        }

        for(let i = 0, j = tracker.length; i < j; i++){
            if(counter < target){
                if(displayFunction === "appendTrainersToTable" && (tracker[i]["filter"].length === 0 || tracker[i]["show"]) && !document.getElementById(tracker[i]["key"])){
                    if(window[displayFunction](tracker[i]["key"])){
                        counter++
                    }
                }
                else if(tracker[i]["filter"].length === 0 && !document.getElementById(tracker[i]["key"])){
                    if(window[displayFunction](tracker[i]["key"])){
                        counter++
                    }
                }
            }
            else{
                if(displayFunction === "appendLocationsToTable"){
                    const map = tracker[i - 1]["key"].match(/.*?\\/)[0]
                    while(i < j && tracker[i]["key"].match(/.*?\\/)[0] == map){
                        if(tracker[i]["filter"].length === 0 && !document.getElementById(tracker[i]["key"])){
                            window[displayFunction](tracker[i]["key"])
                        }
                        i++
                    }
                }
                break
            }
        }
    }
}









async function tableButtonClick(input, fromDisplayParams = false){
    if(!fromDisplayParams){
        body.classList.remove("fixed", "fixedPanel", "fixedAbilities")
    }
    const activeTable = document.querySelectorAll(".activeTable")
    const activeButton = document.querySelectorAll(".activeButton")
    const activeInput = document.querySelectorAll(".activeInput")
    const activeFilter = document.querySelectorAll(".activeFilter")

    activeTable.forEach(table => {
        const tbody = table.querySelector("tbody")
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild)
        }
        
        table.classList.remove("activeTable")
        table.classList.add("hide")
    })

    activeButton.forEach(button => {
        button.classList.remove("activeButton")
    })

    activeInput.forEach(input => {
        input.classList.remove("activeInput")
        input.classList.add("hide")
    })

    activeFilter.forEach(filter => {
        filter.classList.remove("activeFilter")
        filter.classList.add("hide")
    })


    const targetTable = document.getElementById(`${input}Table`)
    const targetButton = document.getElementById(`${input}Button`)
    const targetInput = document.getElementById(`${input}Input`)
    const targetFilter = document.getElementById(`${input}Filter`)
    
    targetTable.classList.remove("hide")
    targetTable.classList.add("activeTable")

    targetButton.classList.add("activeButton")

    targetInput.classList.remove("hide")
    targetInput.classList.add("activeInput")

    targetFilter.classList.remove("hide")
    targetFilter.classList.add("activeFilter")

    tracker = window[`${input}Tracker`]

    await lazyLoading(true)
}

