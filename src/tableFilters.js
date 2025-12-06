function returnAllORfilterValuefromLabel(label){
    let activeORfilterArray = []
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const labelFilterContainer = activeFilter.getElementsByClassName(`${activeFilter.id}${label}Container`.replaceAll(" ", ""))[0]
    for (let i = 0; i < labelFilterContainer.children.length; i++){
        if (labelFilterContainer.children[i].children[0].value == "OR"){
            activeORfilterArray.push((labelFilterContainer.children[i].children[1].innerText.split(":")[1].replaceAll(" ", "")))
        }
    }

    return activeORfilterArray
}

function reverseFilter(filterString, trackerFilter){
    if (trackerFilter.includes(filterString)){
        for(let k = 0; k < trackerFilter.length; k++){
            if(trackerFilter[k] == filterString){
                trackerFilter.splice(k, 1)
            }
        }
    }
    else{
        trackerFilter.push(filterString)
    }

    return trackerFilter
}

function filterLogicalConnector(trackerFilter, value, label, operator, passed){
    if (operator == "OR"){
        let i = 0
        for (i = 0; i < trackerFilter.length; i++){
            if (new RegExp(`^OR_${label}`).test(trackerFilter[i])){
                if (!passed){
                    trackerFilter[i] += `/${value}@FAIL`
                }
                else{
                    trackerFilter[i] += `/${value}@OK`
                }
                break
            }
        }

        if (i == trackerFilter.length){
            trackerFilter.push(`OR_${label}`)
            if (!passed){
                trackerFilter[i] += `/${value}@FAIL`
            }
            else{
                trackerFilter[i] += `/${value}@OK`
            }
        }
    }
    else if ((!passed && operator == "AND") || (passed && operator == "NOT")){
        trackerFilter.push(`filter${label}${value}`)
    }
    else if (!passed && operator == "NOT"){
        for(let k = 0; k < trackerFilter.length; k++){
            if(trackerFilter[k] == `filter${label}${value}`){
                trackerFilter.splice(k, 1)
            }
        }
    }

    return trackerFilter
}

function updateORinTracker(value, label){
    const activeORfilterArray = returnAllORfilterValuefromLabel(label)
    for (let i = 0; i < tracker.length; i++){
        for (let j = 0; j < tracker[i]["filter"].length; j++){
            if (new RegExp(`^OR_${label}`).test(tracker[i]["filter"][j])){
                if (activeORfilterArray.length == 0){
                    tracker[i]["filter"].splice(j, 1)
                }
                else{
                    tracker[i]["filter"][j] = tracker[i]["filter"][j].replaceAll(new RegExp(`/${value}@FAIL|/${value}@OK`, "g"), "")
                }
            }
        }
    }
}

function passAllFilters(filterArray){
    for (let i = 0; i < filterArray.length; i++){
        if (!filterArray[i].includes("@OK")){
            return false
        }
    }

    return true
}







function filterSpeciesForm(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = true
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(value === "Mega"){
            if(!/_MEGA$|_MEGA_Y$|_MEGA_X$/i.test(name)){
                passed = false
            }
        }
        else if(value === "Alolan"){
            if(!/_A$/i.test(name) || /UNOWN/i.test(name)){
                passed = false
            }   
        }
        else if(value === "Galarian"){
            if(!/_G$|PERRSERKER$|SIRFETCHD$|MR_RIME$|CURSOLA$|OBSTAGOON$|RUNERIGUS$/i.test(name) || /UNOWN/i.test(name)){
                passed = false
            }   
        }
        else if(value === "Hisuian"){
            if(!/_H$|OVERQWIL$|SNEASLER$|BASCULEGION$/i.test(name) || /UNOWN/i.test(name)){
                passed = false
            }   
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterSpeciesItem(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = true
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["item1"]) === value) && !(sanitizeString(species[name]["item2"]) === value)){
            passed = false
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterSpeciesAbility(value = "Placeholder", label = "Placeholder", operator){
    let abilityName = null
    Object.keys(abilities).forEach(ability => {
        if(abilities[ability]["ingameName"] === value){
            abilityName = ability
        }
    })
    if(abilityName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let passed = true
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(!species[name]["abilities"].includes(abilityName)){
                if(typeof innatesDefined !== "undefined"){
                    if(!species[name]["innates"].includes(abilityName)){
                        passed = false
                    }
                }
                else{
                    passed = false
                }
            }

            tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
        }
    }
}

function filterSpeciesMove(value, label, operator){
    let moveName = null
    Object.keys(moves).forEach(move => {
        if(moves[move]["ingameName"] === value){
            moveName = move
        }
    })
    if(moveName){
        for(let i = 0, j = tracker.length; i < j; i++){
            let passed = true
            let name = tracker[i]["key"]
            if(tracker === locationsTracker){
                name = tracker[i]["key"].split("\\")[2]
            }
            if(speciesCanLearnMove(species[name], moveName) === false){
                passed = false
            }

            tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
        }
    }

    if (tracker == speciesTracker){
        let sortTable = false
        if (speciesMoveFilter == null){
            sortTable = true
        }
        updateSpeciesMoveFilter(sortTable)
    }
    else if (tracker == locationsTracker){
        updateLocationsMoveFilter()
    }
}

function filterSpeciesEggGroup(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = true
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(!(sanitizeString(species[name]["eggGroup1"]) === value) && !(sanitizeString(species[name]["eggGroup2"]) === value)){
            passed = false
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterType(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = true
        let name = tracker[i]["key"]
        if(tracker === locationsTracker){
            name = tracker[i]["key"].split("\\")[2]
        }
        if(tracker == speciesTracker || tracker == locationsTracker){
            if(typeof species[name]["type3"] !== "undefined"){
                if(!(sanitizeString(species[name]["type1"]) === value) && !(sanitizeString(species[name]["type2"]) === value) && !(sanitizeString(species[name]["type3"]) === value)){
                    passed = false
                }
            }
            else if(!(sanitizeString(species[name]["type1"]) === value) && !(sanitizeString(species[name]["type2"]) === value)){
                passed = false
            }
        }
        else if(tracker == movesTracker){
            if(!(sanitizeString(moves[name]["type"]) === value)){
                passed = false
            }   
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterMovesSplit(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = true
        let name = tracker[i]["key"]
        if(!(sanitizeString(moves[name]["split"]) === value)){
            passed = false
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterMovesFlags(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = false
        let name = tracker[i]["key"]
        for(let k = 0; k < moves[name]["flags"].length; k++){
            if(sanitizeString(moves[name]["flags"][k]) === value){
                passed = true
                break
            }   
        }

        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
    }
}

function filterMovesTarget(value, label, operator){
    for(let i = 0, j = tracker.length; i < j; i++){
        let passed = false
        let name = tracker[i]["key"]
        if(sanitizeString(moves[name]["target"]) === value){
            passed = true
        }   
        
        tracker[i]["filter"] = filterLogicalConnector(tracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
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




























function selectFilter(value, label, operator = "AND"){
    if(label === "Item"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesItem(value, label, operator)
        }
    }
    else if(label === "Move"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesMove(value, label, operator)
        }
    }
    else if(label === "Type"){
        filterType(value, label, operator)
    }
    else if(label === "Ability"){
        if(tracker === trainersTracker){
            trainerSpeciesMatchFilter(true)
        }
        else{
            filterSpeciesAbility(value, label, operator)
        }
    }
    else if(label === "Egg Group"){
        filterSpeciesEggGroup(value, label, operator)
    }
    else if(label === "Form"){
        filterSpeciesForm(value, label, operator)
    }
    else if(label === "Split"){
        filterMovesSplit(value, label, operator)
    }
    else if(label === "Base Stats"){
        filterBaseStats(value, label, operator)
    }
    else if(label === "Flag"){
        filterMovesFlags(value, label, operator)
    }
    else if(label === "Target"){
        filterMovesTarget(value, label, operator)
    }
    else if(label === "Pocket"){
        filterPocket(value, label, operator)
    }
}






async function setFilters(){
    document.querySelectorAll(".tableFilter").forEach(el => {
        el.remove()
    })

    createFilterGroup(["Mega", "Alolan", "Galarian", "Hisuian"], "Form", [speciesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["type"], moves), "Type", [speciesFilterList, movesFilterList, locationsFilterList])
    createFilterGroup(createFilterArray(["split"], moves), "Split", [movesFilterList])
    createFilterGroup(createFilterArray(["flags"], moves), "Flag", [movesFilterList])
    createFilterGroup(createFilterArray(["target"], moves), "Target", [movesFilterList])
    createFilterGroup(createFilterArray(["item1", "item2"], species), "Item", [speciesFilterList, locationsFilterList])
    try{
        createFilterGroup(Array.from(new Set(JSON.stringify(trainers).match(/ITEM_\w+/g).map(value => sanitizeString(value)))), "Item", [trainersFilterList])
    }
    catch{
        
    }
    createFilterGroup(createFilterArray(["ingameName"], abilities, false), "Ability", [speciesFilterList, locationsFilterList, trainersFilterList])
    createFilterGroup(createFilterArray(["ingameName"], moves, false), "Move", [speciesFilterList, locationsFilterList, trainersFilterList])
    createFilterGroup(createFilterArray(["eggGroup1", "eggGroup2"], species), "Egg Group", [speciesFilterList, locationsFilterList])
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

            if(operator == true){
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
    const sanitizedInput = input.replaceAll(regexSpChar, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    const inputLength = input.replaceAll(regexSpChar, "").length
    const activeFilter = document.getElementsByClassName("activeFilter")
    if(activeFilter.length > 0){
        const filters = activeFilter[0].getElementsByClassName("tableFilter")
        for(let i = 0; i < filters.length; i++){
            const filterValue = filters[i].getElementsByClassName("filterValue")[0].innerText.replaceAll(regexSpChar, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            if(filters[i].classList.contains("operator") && /\d+/.test(input)){
                filters[i].classList.remove("hide")
            }
            else if(inputLength >= 3 && filterValue.includes(sanitizedInput) && !filters[i].classList.contains("operator")){
                filters[i].classList.remove("hide")
            }
            else if(sanitizedInput === filterValue && inputLength > 0){
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



function createFilter(value, label, operator = "AND"){
    const activeFilter = document.getElementsByClassName("activeFilter")[0]
    const tableFilterContainer = activeFilter.getElementsByClassName("filterContainer")[0]
    let labelFilterContainer = tableFilterContainer.getElementsByClassName(`${activeFilter.id}${label}Container`.replaceAll(" ", ""))[0]
    if (!labelFilterContainer){
        labelFilterContainer = document.createElement("div"); labelFilterContainer.classList.add(`${activeFilter.id}${label}Container`.replaceAll(" ", ""))
        tableFilterContainer.append(labelFilterContainer)
    }

    labelFilterContainer.append(createFilterElement(label, value, operator, activeFilter))
    selectFilter(value, label, operator)

    filterList()
    lazyLoading(true)
}



function createFilterElement(label, value, operator = "AND", activeFilter){
    const newFilter = document.createElement("span"); newFilter.classList.add("newFilterContainer")
    const filterText = document.createElement("span"); filterText.innerText = `${label}: ${value}`; filterText.classList = "filter crossOnHover newFilter"
    const filterOperator = document.createElement("select"); filterOperator.classList.add("logicalConnector")
    filterOperator.innerHTML = `
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT</option>`
    filterOperator.value = operator
    let previousOperator = operator

    newFilter.append(filterOperator)
    newFilter.append(filterText)

    filterText.addEventListener("click", () => {
        newFilter.remove()

        if (filterOperator.value == "OR"){
            updateORinTracker(value.replaceAll(" ", ""), label.replaceAll(" ", ""))
        }
        else{
            for(let i = 0, j = tracker.length; i < j; i++){
                for(let k = 0; k < tracker[i]["filter"].length; k++){
                    if(tracker[i]["filter"][k] == `filter${label}${value}`.replaceAll(" ", "")){
                        tracker[i]["filter"].splice(k, 1)
                    }
                }
            }
        }


        if (tracker == speciesTracker){
            updateSpeciesMoveFilter()
        }
        else if (tracker == locationsTracker){
            updateLocationsMoveFilter()
        }
        if(trainersFilter === activeFilter){
            trainerSpeciesMatchFilter(false)
        }
        lazyLoading(true)

        const labelFilterContainer = document.getElementsByClassName(`${activeFilter.id}${label}Container`.replaceAll(" ", ""))
        if (labelFilterContainer){
            if (labelFilterContainer[0].children.length == 0){
                labelFilterContainer[0].remove()
            }
        }
    })

    filterOperator.addEventListener("focus", () => {
        previousOperator = filterOperator.value
    })

    filterOperator.addEventListener("change", () => {
        if (previousOperator == "OR"){
            updateORinTracker(value.replaceAll(" ", ""), label.replaceAll(" ", ""))
        }
        else{
            for(let i = 0, j = tracker.length; i < j; i++){
                for(let k = 0; k < tracker[i]["filter"].length; k++){
                    if(tracker[i]["filter"][k] == `filter${label}${value}`.replaceAll(" ", "")){
                        tracker[i]["filter"].splice(k, 1)
                    }
                }
            }
        }

        selectFilter(value, label, filterOperator.value)

        if (filterOperator.value == "NOT" && label == "Move"){
            if (tracker == speciesTracker){
                updateSpeciesMoveFilter()
            }
            else if (tracker == locationsTracker){
                updateLocationsMoveFilter()
            }
        }
        if(trainersFilter == activeFilter){
            trainerSpeciesMatchFilter(false)
        }

        lazyLoading(true)
        previousOperator = filterOperator.value
    })

    return newFilter
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

    for(let i = 0, j = tracker.length; i < j; i++){
        for(let k = tracker[i]["filter"].length - 1; k >= 0; k--){
            if(/filter|^OR_/.test(tracker[i]["filter"][k])){
                tracker[i]["filter"].splice(k, 1)
            }
        }
    }

    while(tableFilterContainer.firstChild)
        tableFilterContainer.removeChild(tableFilterContainer.firstChild)

    if (tracker == speciesTracker){
        updateSpeciesMoveFilter()
    }
    else if (tracker == locationsTracker){
        updateLocationsMoveFilter()
    }
}



function trainerSpeciesMatchFilter(resetInput = true){
    const trainersFilter = trainersFilterContainer.getElementsByClassName("filter")
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


        filterContainer: for(let k = 0; k < trainersFilter.length; k++){
            let ignoreTrainerTeamIndex = []
            const label = trainersFilter[k].innerText.split(":")[0]
            const value = trainersFilter[k].innerText.replace(" ", "").split(":")[1]
            const operator = trainersFilter[k].parentNode.children[0].value
            let trainerTeam = trainers[zone][trainer]["party"][difficulty]
            let passed = false
            

            trainerTeamLoop: for(let l = 0; l < trainerTeam.length; l++){
                if(ignoreTrainerTeamIndex.includes(l)){
                    continue trainerTeamLoop
                }
                passed = false
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
                            continue trainerTeamLoop
                        }
                        else if(typeof innatesDefined !== "undefined"){
                            if(species[speciesObj["name"]]["innates"].includes(abilityName)){
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
                            continue trainerTeamLoop
                        }
                    }
                }
                else if(label === "Item"){
                    if(sanitizeString(speciesObj["item"]) === value){
                        continue trainerTeamLoop
                    }
                }
                ignoreTrainerTeamIndex.push(l)
            }
            passed = trainerTeam.length != ignoreTrainerTeamIndex.length
            trainersTracker[i]["filter"] = filterLogicalConnector(trainersTracker[i]["filter"], value.replaceAll(" ", ""), label.replaceAll(" ", ""), operator, passed)
            if (!passed && operator == "AND"){
                continue trainersTrackerLoop
            }
        }
        if(passAllFilters(trainersTracker[i]["filter"])){
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