async function displaySetup(){    
    await footerP("")

    if(Object.keys(strategies).length === 0){
        onlyShowStrategyPokemon.classList.add("hide")
    }
    if(Object.keys(locations).length === 0){
        locationsButton.classList.add("hide")
    }
    if(Object.keys(trainers).length === 0){
        trainersButton.classList.add("hide")
    }
    if(typeof innatesDefined !== "undefined"){
        document.getElementsByClassName("innatesHeader")[0].classList.remove("hide")
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







function filterTableInput(input, obj, keyArray){
    const sanitizedInput = input.trim().replaceAll(/-|'| |_/g, "").toLowerCase()
    const regexInput = new RegExp(sanitizedInput, "i")

    for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        tracker[i]["filter"].push("input")
        for (let k = 0; k < keyArray.length; k++){
            if(keyArray[k] !== "innates" || typeof innatesDefined !== "undefined"){
                if(regexInput.test(sanitizeString("" + obj[tracker[i]["key"]][keyArray[k]]).replaceAll(/-|'| |_/g, ""))){
                    tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
                    break
                }
            }
        }
    }

    lazyLoading(true)
}








function filterLocationsTableInput(input, obj, keyArray){
    const arraySanitizedInput = input.trim().split(/-|'| |,|_/g)

    mainLoop: for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        const zone = tracker[i]["key"].split("\\")[0].replaceAll(/-|'| |_/g, "").toLowerCase()
        const method = tracker[i]["key"].split("\\")[1].replaceAll(/-|'| |_/g, "").toLowerCase()
        const name = tracker[i]["key"].split("\\")[2]
        let compareString = `${zone},${method},`
        if(name in species){
            for (let k = 0; k < keyArray.length; k++){
                compareString += (obj[name][keyArray[k]] + ",").replaceAll(/-|'| |_|species/gi, "").toLowerCase()
            }
            for(splitInput of arraySanitizedInput){
                if(!compareString.includes(splitInput.toLowerCase())){
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
    const arraySanitizedInput = input.trim().split(/ /g)

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
            if(!compareArray.some(compareValue => compareValue.includes(arraySanitizedInput[k].toUpperCase()))){
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

        let displayFunction = ""
        if(tracker === speciesTracker){
            displayFunction = "appendSpeciesToTable"
        }
        else if(tracker === abilitiesTracker){
            displayFunction = "appendAbilitiesToTable"
        }
        else if(tracker === movesTracker){
            displayFunction = "appendMovesToTable"
        }
        else if(tracker === locationsTracker){
            displayFunction = "appendLocationsToTable"
        }
        else if(tracker === trainersTracker){
            displayFunction = "appendTrainersToTable"
            target = 20
        }
        else{
            return
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
                break
            }
        }
    }
}









async function tableButtonClick(input){
    body.classList.remove("fixed", "fixedPanel", "fixedAbilities")
    const activeTable = await document.querySelectorAll(".activeTable")
    const activeButton = await document.querySelectorAll(".activeButton")
    const activeInput = await document.querySelectorAll(".activeInput")
    const activeFilter = await document.querySelectorAll(".activeFilter")

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


    const targetTable = await document.getElementById(`${input}Table`)
    const targetButton = await document.getElementById(`${input}Button`)
    const targetInput = await document.getElementById(`${input}Input`)
    const targetFilter = await document.getElementById(`${input}Filter`)
    
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

