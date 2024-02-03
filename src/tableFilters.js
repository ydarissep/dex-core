function filterSpeciesForm(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(value === "Mega"){
            if(!/_MEGA$|_MEGA_Y$|_MEGA_X$/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(value === "Alolan"){
            if(!/_A$/i.test(name) || /UNOWN/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Galarian"){
            if(!/_G$|PERRSERKER$|SIRFETCHD$|MR_RIME$|CURSOLA$|OBSTAGOON$|RUNERIGUS$/i.test(name) || /UNOWN/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Hisuian"){
            if(!/_H$|OVERQWIL$|SNEASLER$|BASCULEGION$/i.test(name) || /UNOWN/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
        else if(value === "Seviian"){
            if(!/_S$|_SEVI$|_S_MEGA$/i.test(name) || /UNOWN|ORICORIO|WISHIWASHI_S$/i.test(name)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
    }
}

function filterSpeciesItem(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["item1"]) === value) && !(sanitizeString(species[name]["item2"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterSpeciesAbility(value, label){
    let abilityName = null
    Object.keys(abilities).forEach(ability => {
        if(abilities[ability]["ingameName"] === value){
            abilityName = ability
        }
    })
    if(abilityName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!species[name]["abilities"].includes(abilityName)){
                if(typeof innatesDefined !== "undefined"){
                    if(!species[name]["innates"].includes(abilityName)){
                        tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
                    }
                }
                else{
                    tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
                }
            }
        }
    }
}

function filterSpeciesMove(value, label){
    speciesMoveFilter = null
    let moveName = null
    Object.keys(moves).forEach(move => {
        if(moves[move]["ingameName"] === value){
            moveName = move
        }
    })
    if(moveName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!speciesCanLearnMove(species[name], moveName)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
    }
}

function filterSpeciesEggGroup(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["eggGroup1"]) === value) && !(sanitizeString(species[name]["eggGroup2"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterType(value, label){
    const table = document.getElementsByClassName("activeTable")[0]
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(table === speciesTable || table === locationsTable){
            if(typeof species[name]["type3"] !== "undefined"){
                if(!(sanitizeString(species[name]["type1"]) === value) && !(sanitizeString(species[name]["type2"]) === value) && !(sanitizeString(species[name]["type3"]) === value)){
                    tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
                }
            }
            else if(!(sanitizeString(species[name]["type1"]) === value) && !(sanitizeString(species[name]["type2"]) === value)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }
        }
        else if(table === movesTable){
            if(!(sanitizeString(moves[name]["type"]) === value)){
                tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
            }   
        }
    }
}

function filterMovesSplit(value, label){
    for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]

        if(!(sanitizeString(moves[name]["split"]) === value)){
            tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
        }
    }
}

function filterMovesFlags(value, label){
    mainLoop: for(let i = 0, j = tracker.length; i < j; i++){
        let name = tracker[i]["key"]

        for(let k = 0; k < moves[name]["flags"].length; k++){
            if((sanitizeString(moves[name]["flags"][k]) === value)){
                continue mainLoop
            }   
        }
        tracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
    }
}

function filterBaseStats(value, label){
    if(value === "HP"){
        value = "baseHP"
        label = "HP"
    }
    else if(value === "Atk"){
        value = "baseAttack"
        label = "Atk"
    }
    else if(value === "Def"){
        value = "baseDefense"
        label = "Def"
    }
    else if(value === "SpA"){
        value = "baseSpAttack"
        label = "SpA"
    }
    else if(value === "SpD"){
        value = "baseSpDefense"
        label = "SpD"
    }
    else if(value === "Spe"){
        value = "baseSpeed"
        label = "Speed"
    }
    else if(value === "BST"){
        value = "BST"
        label = "BST"
    }

    filterOperators(value, label, species)
}





































function selectFilter(value, label){
    if(label === "Item"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesItem(value, label)
        }
    }
    else if(label === "Move"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesMove(value, label)
        }
    }
    else if(label === "Type"){
        filterType(value, label)
    }
    else if(label === "Ability"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesAbility(value, label)   
        }
    }
    else if(label === "Egg Group"){
        filterSpeciesEggGroup(value, label)   
    }
    else if(label === "Form"){
        filterSpeciesForm(value, label)   
    }
    else if(label === "Split"){
        filterMovesSplit(value, label)
    }
    else if(label === "Base Stats"){
        filterBaseStats(value, label)
    }
    else if(label === "Flag"){
        filterMovesFlags(value, label)
    }
}






async function setFilters(){
    footerP("clear tableFilter")
    document.querySelectorAll(".tableFilter").forEach(el => {
        el.remove()
    })

    footerP("createFilterGroup Form")
    createFilterGroup(["Mega", "Alolan", "Galarian", "Hisuian", "Seviian"], "Form", [speciesFilterList, locationsFilterList])
    footerP("createFilterGroup Type")
    createFilterGroup(createFilterArray(["type"], moves), "Type", [speciesFilterList, movesFilterList, locationsFilterList])
    footerP("createFilterGroup Split")
    createFilterGroup(createFilterArray(["split"], moves), "Split", [movesFilterList])
    footerP("createFilterGroup Flags")
    createFilterGroup(createFilterArray(["flags"], moves), "Flag", [movesFilterList])
    footerP("createFilterGroup Item")
    createFilterGroup(createFilterArray(["item1", "item2"], species), "Item", [speciesFilterList, locationsFilterList])
    footerP("createFilterGroup Item Trainers")
    try{
        createFilterGroup(Array.from(new Set(JSON.stringify(trainers).match(/ITEM_\w+/g).map(value => sanitizeString(value)))), "Item", [trainersFilterList])
    }
    catch{
        
    }
    footerP("createFilterGroup Ability")
    createFilterGroup(createFilterArray(["ingameName"], abilities, false), "Ability", [speciesFilterList, locationsFilterList, trainersFilterList])
    footerP("createFilterGroup Move")
    createFilterGroup(createFilterArray(["ingameName"], moves, false), "Move", [speciesFilterList, locationsFilterList, trainersFilterList])
    footerP("createFilterGroup Egg Group")
    createFilterGroup(createFilterArray(["eggGroup1", "eggGroup2"], species), "Egg Group", [speciesFilterList, locationsFilterList])
    footerP("createFilterGroup Base Stats")
    createFilterGroup(["HP", "Atk", "Def", "SpA", "SpD", "Spe", "BST"], "Base Stats", [speciesFilterList, locationsFilterList], true)
}











































function filterList(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const filters = activeFilter.getElementsByClassName("tableFilter")
    
    for(let i = 0; i < filters.length; i++){
        filters[i].classList.add("hide")
    }

    document.getElementsByClassName("activeInput")[0].value = ""


    for(let i = 0, j = Object.keys(tracker).length; i < j; i++){
        tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "input")
    }
}






function createFilterGroup(values, labelValue, tableFilterListArray, operator = false){
    for(let i = 0; i < tableFilterListArray.length; i++){
        const mainContainer = document.createElement("div")
        values.forEach(value => {
            const container = document.createElement("span")
            const label = document.createElement("span")
            const valueContainer = document.createElement("span")

            label.innerText = `${labelValue}: `
            label.className = `${labelValue.replaceAll(" ", "")}`

            container.className = `tableFilter hide`

            valueContainer.innerText = value
            valueContainer.className = "filterValue"
            if(labelValue.includes("Type")){
                valueContainer.className = `TYPE_${value.toUpperCase()} background filterValue`
            }

            container.append(label)
            container.append(valueContainer)

            mainContainer.append(container)
            mainContainer.className = "filterListContainer"

            if(operator){
                container.classList.add("operator")
                container.addEventListener("click", () => {
                    selectFilter(value, labelValue)
                })
            }
            else{
                container.addEventListener("click", () => {
                    createFilter(value, labelValue)
                })
            }
        })
        tableFilterListArray[i].append(mainContainer)
    }
}





function filterFilters(input){
    const sanitizedInput = input.replaceAll(/-|'| |_/g, "").toLowerCase()
    const activeFilter = document.getElementsByClassName("activeFilter")
    if(activeFilter.length > 0){
        const filters = activeFilter[0].getElementsByClassName("tableFilter")
        for(let i = 0; i < filters.length; i++){
            const filterValue = filters[i].getElementsByClassName("filterValue")
            if(filters[i].classList.contains("operator") && /\d+/.test(input)){
                filters[i].classList.remove("hide")
            }
            else if(sanitizedInput.length >= 3 && filterValue[0].innerText.replaceAll(/-|'| |_/g, "").toLowerCase().includes(sanitizedInput) && !filters[i].classList.contains("operator")){
                filters[i].classList.remove("hide")
            }
            else{
                filters[i].classList.add("hide")   
            }
        }
    }
}






function createFilterArray(objInputArray, obj, sanitize = true){
    let list = []
    for (const name of Object.keys(obj)){
        for (let i = 0; i < objInputArray.length; i++){
            let value = obj[name][objInputArray[i]]
            if(Array.isArray(value)){
                for(let j = 0; j < value.length; j++){
                    if(sanitize){
                        value[j] = sanitizeString(value[j])
                    }
                    if(!list.includes(value[j])){
                        list.push(value[j])
                    }
                }
            }
            else{
                if(sanitize){
                    value = sanitizeString(value)
                }
                if(!list.includes(value)){
                    list.push(value)
                }
            }
        }
    }
    return list
}



function createFilter(value, label){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    const newFilter = document.createElement("div")
    newFilter.innerText = `${label}: ${value}`
    newFilter.classList = "filter crossOnHover newFilter"
    tableFilterContainer.append(newFilter)
    selectFilter(value, label)

    newFilter.addEventListener("click", () => {
        for(let i = 0, j = tracker.length; i < j; i++){
            for(let k = 0; k < tracker[i]["filter"].length; k++){
                if(tracker[i]["filter"][k] == `filter${label}${value}`.replaceAll(" ", "")){
                    tracker[i]["filter"].splice(k, 1)
                }
            }
        }
        newFilter.remove()
        speciesMoveFilter = null
        if(trainersFilter === activeFilter){
            trainerSpeciesMatchFilter(false)
        }
        lazyLoading(true)
    })

    filterList()
    lazyLoading(true)
}



function createOperatorFilter(label, operator, number){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    const newFilter = document.createElement("div")
    newFilter.innerText = `${label} ${operator} ${number}`
    newFilter.classList = "filter crossOnHover newFilter"
    tableFilterContainer.append(newFilter)

    newFilter.addEventListener("click", () => {
        for(let i = 0, j = tracker.length; i < j; i++){
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== `filter${label}${operator}${number}`.replaceAll(" ", ""))
        }
        newFilter.remove()
        lazyLoading(true)
    })

    filterList()
    lazyLoading(true)
}



function deleteFiltersFromTable(){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    speciesMoveFilter = null

    for(let i = 0, j = tracker.length; i < j; i++){
        for(let k = tracker[i]["filter"].length - 1; k >= 0; k--){
            if(tracker[i]["filter"][k].includes("filter")){
                tracker[i]["filter"].splice(k, 1)
            }
        }
    }

    while(tableFilterContainer.firstChild)
        tableFilterContainer.removeChild(tableFilterContainer.firstChild)
}




function trainerSpeciesMatchFilter(resetInput = true){
    const trainersFilter = trainersFilterContainer.children
    trainersTrackerLoop: for(let i = 0, j = trainersTracker.length; i < j; i++){
        delete trainersTracker[i]["show"]
        if(resetInput){
            trainersTracker[i]["filter"] = []
        }
        else{
            trainersTracker[i]["filter"] = trainersTracker[i]["filter"].filter(filter => filter === "input")
        }
        const zone = trainersTracker[i]["key"].split("\\")[0]
        const trainer = trainersTracker[i]["key"].split("\\")[1]
        const difficulty = checkTrainerDifficulty(zone, trainer)
        delete trainers[zone][trainer]["match"]
        delete trainersTracker[i]["show"]



        let ignoreTrainerTeamIndex = []
        filterContainer: for(let k = 0; k < trainersFilter.length; k++){



            const label = trainersFilter[k].innerText.split(":")[0]
            const value = trainersFilter[k].innerText.replace(" ", "").split(":")[1]
            let trainerTeam = trainers[zone][trainer]["party"][difficulty]
            let trainerMatch = false


            trainerTeamLoop: for(let l = 0; l < trainerTeam.length; l++){
                if(ignoreTrainerTeamIndex.includes(l)){
                    continue trainerTeamLoop
                }
                const speciesObj = trainerTeam[l]
                if(label === "Ability"){
                    let abilityName = null
                    Object.keys(abilities).forEach(ability => {
                        if(abilities[ability]["ingameName"] === value){
                            abilityName = ability
                        }
                    })
                    if(abilityName){
                        if(species[speciesObj["name"]]["abilities"][speciesObj["ability"]] === abilityName){
                            trainerMatch = true
                            continue trainerTeamLoop
                        }
                        else if(typeof innatesDefined !== "undefined"){
                            if(species[speciesObj["name"]]["innates"].includes(abilityName)){
                                trainerMatch = true
                                continue trainerTeamLoop
                            }
                        }
                    }
                }
                else if(label === "Move"){
                    let moveName = null
                    Object.keys(moves).forEach(move => {
                        if(moves[move]["ingameName"] === value){
                            moveName = move
                        }
                    })
                    if(moveName){
                        if(speciesObj["moves"].includes(moveName)){
                            trainerMatch = true
                            continue trainerTeamLoop
                        }
                    }
                }
                else if(label === "Item"){
                    if(sanitizeString(speciesObj["item"]) === value){
                        trainerMatch = true
                        continue trainerTeamLoop
                    }
                }
                ignoreTrainerTeamIndex.push(l)
            }
            if(!trainerMatch){
                trainersTracker[i]["filter"].push(`filter${label}${value}`.replaceAll(" ", ""))
                continue trainersTrackerLoop
            }
        }
        if(trainersTracker[i]["filter"].length === 0){
            trainers[zone][trainer]["match"] = true
        }
        if(trainersInput.value.trim().length === 0 && trainersFilter.length === 0){
            delete trainers[zone][trainer]["match"]
        }
    }

    showRematch()
}





























































function filterOperators(value, label, obj){
    let operator = document.getElementsByClassName("activeInput")[0].value.match(/>=|<=|=>|=<|=|>|</)
    if(!operator){
        operator = ">="
    }
    else{
        operator = operator[0]   
    }
    const number = document.getElementsByClassName("activeInput")[0].value.match(/\d+/)[0]

    for(let i = 0, j = tracker.length; i < j; i++){
        
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }

        if(operator === ">=" || operator === "=>"){
            if(!(obj[name][value] >= number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "<=" || operator === "=<"){
            if(!(obj[name][value] <= number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "="){
            if(!(obj[name][value] == number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === ">"){
            if(!(obj[name][value] > number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
        else if(operator === "<"){
            if(!(obj[name][value] < number)){
                tracker[i]["filter"].push(`filter${label}${operator}${number}`.replaceAll(" ", ""))
            }
        }
    }

    createOperatorFilter(label, operator, number)
}