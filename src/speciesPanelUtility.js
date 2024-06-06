if(localStorage.getItem("speciesPanelHistory")){
    window.speciesPanelHistory = JSON.parse(localStorage.getItem("speciesPanelHistory"))
}
else{
    window.speciesPanelHistory = []
}

async function createSpeciesPanel(name){
    panelSpecies = name
    speciesPanel("show")

    if(typeof refreshURLParams !== "undefined"){
        refreshURLParams()
    }

    await manageSpeciesPanelHistory(name)

    speciesName.innerText = sanitizeString(name)
    speciesID.innerText = `#${species[name]["ID"]}`

    speciesSprite.className = `sprite${name}`
    handleShiny()
    speciesSprite.src = getSpeciesSpriteSrc(name)

    speciesType1.innerText = sanitizeString(species[name]["type1"])
    speciesType2.innerText = sanitizeString(species[name]["type2"])
    speciesType1.className = `${species[name]["type1"]} background`
    speciesType2.className = `${species[name]["type2"]} background`

    if(speciesType1.innerText === speciesType2.innerText)
        speciesType2.classList.add("hide")
    else
        speciesType2.classList.remove("hide")


    if(typeof species[name]["type3"] !== "undefined"){
        if(species[name]["type3"] !== species[name]["type1"] && species[name]["type3"] !== species[name]["type2"]){
            speciesType3.innerText = sanitizeString(species[name]["type3"])
            speciesType3.className = `${species[name]["type3"]} background`
            speciesType3.classList.remove("hide")
        }
    }
    else{
        speciesType3.classList.add("hide")
    }



    while (speciesAbilities.firstChild)
        speciesAbilities.removeChild(speciesAbilities.firstChild)

    for (let i = 0; i < species[name]["abilities"].length; i++){
        const ability = species[name]["abilities"][i]
        if(i === 1 && ability === species[name]["abilities"][0]){
            continue
        }
        else if(i === 2 && (ability === species[name]["abilities"][0] || ability === "ABILITY_NONE") && (ability === species[name]["abilities"][1] || ability === "ABILITY_NONE")){
            continue
        }
        if(ability !== "ABILITY_NONE" && abilities[ability]){
            const abilityContainer = document.createElement("div")
            const abilityName = document.createElement("span")
            const abilityDescription = document.createElement("span")

            abilityName.innerText = abilities[ability]["ingameName"]
            abilityDescription.innerText = abilities[ability]["description"]

            if(i === 2){
                abilityName.className = "bold"
            }

            abilityName.classList.add("hyperlink")

            abilityDescription.className = "speciesPanelAbilitiesDescriptionPadding"
            abilityContainer.className = "flex wrap"

            abilityName.addEventListener("click", async() => {
                if(!speciesButton.classList.contains("activeButton")){
                    tracker = speciesTracker
                    await tableButtonClick("species")
                }
                deleteFiltersFromTable()

                createFilter(abilities[ability]["ingameName"], "Ability")
                speciesPanel("hide")
                window.scrollTo({ top: 0})
            })

            abilityContainer.append(abilityName)
            abilityContainer.append(abilityDescription)
            speciesAbilities.append(abilityContainer)
        }
    }
    if(speciesAbilities.children.length > 0){
        speciesAbilitiesMainContainer.classList.remove("hide")
    }
    else{
        speciesAbilitiesMainContainer.classList.add("hide")
    }
    

    if(typeof innatesDefined !== "undefined"){
        while (speciesInnates.firstChild)
            speciesInnates.removeChild(speciesInnates.firstChild)

        for (let i = 0; i < species[name]["innates"].length; i++){
            const ability = species[name]["innates"][i]
            if(species[name]["innates"][i] !== "ABILITY_NONE"){
                const abilityContainer = document.createElement("div")
                const abilityName = document.createElement("span")
                const abilityDescription = document.createElement("span")

                abilityName.innerText = abilities[ability]["ingameName"]
                abilityDescription.innerText = abilities[ability]["description"]

                abilityName.classList.add("hyperlink")

                abilityDescription.className = "speciesPanelAbilitiesDescriptionPadding"
                abilityContainer.className = "flex wrap"

                abilityName.addEventListener("click", async() => {
                    if(!speciesButton.classList.contains("activeButton")){
                        tracker = speciesTracker
                        await tableButtonClick("species")
                    }
                    deleteFiltersFromTable()

                    createFilter(abilities[ability]["ingameName"], "Ability")
                    speciesPanel("hide")
                    window.scrollTo({ top: 0})
                })

                abilityContainer.append(abilityName)
                abilityContainer.append(abilityDescription)
                speciesInnates.append(abilityContainer)
            }
        }
        if(species[name]["innates"].length == 0){
            speciesInnatesMainContainer.classList.add("hide")
        }
        else{
            speciesInnatesMainContainer.classList.remove("hide")
        }
    }
    






    let monStats = [species[name]["baseHP"], 
    species[name]["baseAttack"], 
    species[name]["baseDefense"], 
    species[name]["baseSpAttack"], 
    species[name]["baseSpDefense"], 
    species[name]["baseSpeed"],
    species[name]["BST"]]

    
    graphStats.forEach ((stat, index) => {
        statDisplays[index].innerText = monStats[index]

        if(index !== 6){
            stat.style.width = `${(monStats[index] / 255) * graph.offsetWidth}px`
            stat.style.background = `hsl(${monStats[index]*0.7},85%,45%)`
        }
        else{
            stat.style.width = `${(monStats[index] / 255) * graph.offsetWidth/6}px`
            stat.style.background = `hsl(${(monStats[index]*1)/6},85%,45%)`   
        }
    })



    while(speciesEvoTable.firstChild){
        speciesEvoTable.removeChild(speciesEvoTable.firstChild)
    }

    if(species[name]["evolutionLine"].length > 1){
        let speciesArray = [species[name]["evolutionLine"][0]]
        let targetSpeciesArray = []
        const rootContainer = document.createElement("td")
        rootContainer.append(createClickableImgAndName(species[name]["evolutionLine"][0], false, false, false))
        speciesEvoTable.append(rootContainer)

        mainLoop: while(speciesArray.length > 0){

            let speciesEvoTableContainer = document.createElement("td")

            for(let i = 0; i < speciesArray.length; i++){
                const targetSpecies = speciesArray[i]
                for(let j = 0; j < species[targetSpecies]["evolution"].length; j++){
                    if(species[targetSpecies]["evolutionLine"].indexOf(targetSpecies) >= species[targetSpecies]["evolutionLine"].indexOf(species[targetSpecies]["evolution"][j][2])){ // prevent infinite loop (dialga)
                        break mainLoop
                    }
                    if(species[species[targetSpecies]["evolution"][j][2]]["baseSpeed"] > 0){
                        speciesEvoTableContainer.append(createClickableImgAndName(species[targetSpecies]["evolution"][j][2], species[targetSpecies]["evolution"][j], false, false))
                        speciesEvoTable.append(speciesEvoTableContainer)

                        targetSpeciesArray.push(species[targetSpecies]["evolution"][j][2])
                    }
                }
            }

            targetSpeciesArray =  Array.from(new Set(targetSpeciesArray))

            speciesArray = targetSpeciesArray
            targetSpeciesArray = []
        }
    }
    if(speciesEvoTable.children.length <= 1){
        speciesEvolutionsMainContainer.classList.add("hide")
    }
    else{
        speciesEvolutionsMainContainer.classList.remove("hide")
    }

    speciesEvoTable.removeAttribute("class")
    if(speciesEvoTable.children.length > 3){
        speciesEvoTable.classList.add("evoLongLineLength")
    }



    

    while (speciesFormes.firstChild){
        speciesFormes.removeChild(speciesFormes.firstChild)
    }


    if(species[name]["forms"].length > 1){
        for (let i = 0; i < species[name]["forms"].length; i++){
            if((!species[name]["evolutionLine"].includes(species[name]["forms"][i]) || species[name]["forms"][i] === name) && species[species[name]["forms"][i]]["baseSpeed"] > 0){
                speciesFormes.append(createClickableImgAndName(species[name]["forms"][i]))
            }
        }
    }
    if(speciesFormes.children.length <= 1){
        speciesFormesContainer.classList.add("hide")
    }
    else{
        speciesFormesContainer.classList.remove("hide")
    }



















    while (speciesEggGroups.firstChild) 
        speciesEggGroups.removeChild(speciesEggGroups.firstChild)
    while (speciesHeldItems.firstChild)
        speciesHeldItems.removeChild(speciesHeldItems.firstChild)
    while (speciesChanges.firstChild)
        speciesChanges.removeChild(speciesChanges.firstChild)




    const eggGroup1 = document.createElement("div")
    const eggGroup2 = document.createElement("div")
    eggGroup1.innerText = sanitizeString(species[name]["eggGroup1"])
    eggGroup2.innerText = sanitizeString(species[name]["eggGroup2"])
    speciesEggGroups.append(eggGroup1)
    if(species[name]["eggGroup1"] !== species[name]["eggGroup2"])
        speciesEggGroups.append(eggGroup2)





    if(species[name]["item1"] !== "ITEM_NONE" && species[name]["item1"] !== ""){
        const heldItem1 = document.createElement("div")
        heldItem1.innerText = `50% ${sanitizeString(species[name]["item1"])}`
        speciesHeldItems.append(heldItem1)
    }
    if(species[name]["item2"] !== "ITEM_NONE" && species[name]["item2"] !== ""){
        const heldItem2 = document.createElement("div")
        heldItem2.innerText = `5% ${sanitizeString(species[name]["item2"])}`
        speciesHeldItems.append(heldItem2)
    }

    if(speciesHeldItems.firstChild)
        speciesHeldItemsContainer.classList.remove("hide")
    else
        speciesHeldItemsContainer.classList.add("hide")







    if(species[name]["changes"].length !== 0){
        for (let i = 0; i < species[name]["changes"].length; i++){
            const stat = species[name]["changes"][i][0]
            const oldStat = species[name]["changes"][i][1]
            const newStat = species[name][stat]
            createChange(stat, oldStat, newStat, speciesChanges)
        }
    }
    if(speciesChanges.firstChild)
        speciesChangesContainer.classList.remove("hide")
    else
        speciesChangesContainer.classList.add("hide")









    while (speciesDefensiveTypeChart.firstChild)
        speciesDefensiveTypeChart.removeChild(speciesDefensiveTypeChart.firstChild)

    Object.keys(typeChart).forEach(type => {
        const defensiveTypeEffectivenessContainer = document.createElement("span")
        const checkType = document.createElement("span")
        const defensiveTypeEffectivenessValue = document.createElement("span")
        defensiveTypeEffectivenessContainer.className = "flex flexCenter flexColumn speciesDefensiveTypeChartMarginTop"
        checkType.innerText = sanitizeString(type)
        if(type === "TYPE_FIGHTING"){
            checkType.innerText = "Fight"
        }
        else if(type === "TYPE_ELECTRIC"){
            checkType.innerText = "Electr"
        }
        checkType.className = `backgroundSmall ${type}`

        defensiveTypeEffectivenessValue.innerText = getPokemonResistanceValueAgainstType(species[name], type)

        defensiveTypeEffectivenessValue.className = `typeChartDefensive${defensiveTypeEffectivenessValue.innerText} backgroundSmall`
        defensiveTypeEffectivenessContainer.append(checkType)
        defensiveTypeEffectivenessContainer.append(defensiveTypeEffectivenessValue)
        speciesDefensiveTypeChart.append(defensiveTypeEffectivenessContainer)
    })







    while (speciesOffensiveTypeChart.firstChild)
        speciesOffensiveTypeChart.removeChild(speciesOffensiveTypeChart.firstChild)

    try{
        Object.keys(typeChart).forEach(type => {
            const offensiveTypeEffectivenessContainer = document.createElement("span")
            const checkType = document.createElement("span")
            const offensiveTypeEffectivenessValue = document.createElement("span")
            offensiveTypeEffectivenessContainer.className = "flex flexCenter flexColumn speciesOffensiveTypeChartMarginTop"
            checkType.innerText = sanitizeString(type)
            if(type === "TYPE_FIGHTING"){
                checkType.innerText = "Fight"
            }
            else if(type === "TYPE_ELECTRIC"){
                checkType.innerText = "Electr"
            }
            checkType.className = `backgroundSmall ${type}`
    
            offensiveTypeEffectivenessValue.innerText = getPokemonEffectivenessValueAgainstType(species[name], type)
    
            offensiveTypeEffectivenessValue.className = `typeChartOffensive${offensiveTypeEffectivenessValue.innerText} backgroundSmall`
            offensiveTypeEffectivenessContainer.append(checkType)
            offensiveTypeEffectivenessContainer.append(offensiveTypeEffectivenessValue)
            speciesOffensiveTypeChart.append(offensiveTypeEffectivenessContainer)
        })
    }
    catch{
        console.log(`Couldn't calc offensiveTypeEffectivenessValue for ${name}`)
    }














    if(strategies[name]){
        speciesStrategiesContainer.classList.remove("hide")
        while(speciesStrategies.firstChild){
            speciesStrategies.removeChild(speciesStrategies.firstChild)
        }
        for(let i = 0; i < strategies[name].length; i++){
            speciesStrategies.append(createSpeciesStrategy(strategies[name][i], name))
        }
    }
    else{
        speciesStrategiesContainer.classList.add("hide")
    }













    [[speciesPanelLevelUpTable, "levelUpLearnsets"], [speciesPanelTMHMTable, "TMHMLearnsets"], [speciesPanelTutorTable, "tutorLearnsets"], [speciesPanelEggMovesTable, "eggMovesLearnsets"]].forEach(learnsets => {
        try{
            if(typeof species[name][learnsets[1]][0] == "string"){
                buildSpeciesPanelSingleLearnsetsTable(learnsets[0], name, [learnsets[1]])
            }
            else{
                buildSpeciesPanelDoubleLearnsetsTable(learnsets[0], name, [learnsets[1]])
            }
        }
        catch{
            console.log(`Error building ${learnsets[1]} for ${name}`)
        }
    })
    buildSpeciesPanelLevelUpFromPreviousEvoTable(speciesPanelLevelUpFromPreviousEvoTable, name)
}







function createClickableImgAndName(speciesName, evoConditions = false, showName = true, miniSprite = true){
    const container = document.createElement("div")
    const sprite = document.createElement("img")
    const name = document.createElement("span")

    container.className = "flexCenter flex flexRow hyperlink"

    sprite.src = getSpeciesSpriteSrc(speciesName)
    sprite.className = `sprite${returnTargetSpeciesSprite(speciesName)}`
    if(miniSprite){
        sprite.classList.add("miniSprite")
    }
    else{
        sprite.classList.add("miniSprite3")
    }

    if(evoConditions){
        const evoCondition = document.createElement("span")
        if(evoConditions[0].includes("EVO_MEGA")){
            evoCondition.innerText = `Mega`
        }
        else if(evoConditions[0].includes("EVO_GIGA")){
            evoCondition.innerText = `Giga`
        }
        else if(evoConditions[0].includes("MAPSEC")){
            evoCondition.innerText = `Level Up (${sanitizeString(evoConditions[1]).replace(/Mapsec */i, "")})`
        }
        else{
            evoCondition.innerText = `${sanitizeString(evoConditions[0])} (${sanitizeString(evoConditions[1])})`
        }
        evoCondition.className = "evoMethod"
        container.append(evoCondition)
    }
    if(showName){
        name.innerText = sanitizeString(species[speciesName]["name"])
        name.className = "underline"
    }

    container.append(sprite)
    container.append(name)

    container.addEventListener("click", () => {
        createSpeciesPanel(speciesName)
    })

    return container
}






function fetchShinySprite(clicked = false){
    const targetSpecies = returnTargetSpeciesSprite(panelSpecies)
    if(clicked){
        shinyToggle.classList.toggle("toggled")
    }
    if(!shinyToggle.classList.contains("toggled")){
        speciesSprite.src = sprites[targetSpecies]
    }
    else{
        applyShinyVar(targetSpecies)
    }
}



function handleShiny(){
    if(shinyToggle.classList.contains("toggled")){
        fetchShinySprite()
    }
}



async function applyShinyVar(speciesName){
    let sprite = new Image()
    let canvas = document.createElement("canvas")

    sprite.src = sprites[speciesName]

    canvas.width = sprite.width
    canvas.height = sprite.height

    let rawNormalPal = await fetch(`${species[speciesName]["sprite"].replace(/\w+\.png/, "normal.pal")}`)
    if(rawNormalPal.status === 404){
        if(species[speciesName]["forms"].length > 1){
            rawNormalPal = await fetch(`${species[species[speciesName]["forms"][0]]["sprite"].replace(/\w+\.png/, "normal.pal")}`)
        }
    }
    const textNormalPal = await rawNormalPal.text()

    let normalPal = textNormalPal.split("\n").toSpliced(0, 3)

    let rawShinyPal = await fetch(`${species[speciesName]["sprite"].replace(/\w+\.png/, "shiny.pal")}`)
    if(rawShinyPal.status === 404){
        if(species[speciesName]["forms"].length > 1){
            rawShinyPal = await fetch(`${species[species[speciesName]["forms"][0]]["sprite"].replace(/\w+\.png/, "shiny.pal")}`)
        }
    }
    const textShinyPal = await rawShinyPal.text()

    let shinyPal = textShinyPal.split("\n").toSpliced(0, 3)

    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(sprite, 0, 0)

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    for(let i = 0; i < imageData.data.length; i += 4) {
        if(normalPal.includes(`${imageData.data[i]} ${imageData.data[i + 1]} ${imageData.data[i + 2]}`)){
            const index = normalPal.indexOf(`${imageData.data[i]} ${imageData.data[i + 1]} ${imageData.data[i + 2]}`)
            const shinyPalArray = shinyPal[index].split(" ")
            imageData.data[i] = shinyPalArray[0]
            imageData.data[i + 1] = shinyPalArray[1]
            imageData.data[i + 2] = shinyPalArray[2]
        }
    }
    
    context.putImageData(imageData, 0, 0)
    speciesSprite.src = canvas.toDataURL()
}







async function manageSpeciesPanelHistory(speciesName){
    for(let i = 0; i < speciesPanelHistory.length; i++){
        if(!(speciesPanelHistory[i][0] in species) || species[speciesPanelHistory[i][0]]["baseSpeed"] == 0){
            speciesPanelHistory.splice(i, 1)
            i--
        }
    }

    if(speciesPanelHistoryContainer.children.length != speciesPanelHistory.length){
        displaySpeciesPanelHistory()
    }

    for(let i = 0; i < speciesPanelHistoryContainer.children.length; i++){
        speciesPanelHistoryContainer.children[i].classList.remove("historyActive")
        if(speciesPanelHistoryContainer.children[i].querySelector(`.sprite${speciesName}`)){
            speciesPanelHistoryContainer.children[i].classList.add("historyActive")
        }
    }

    const maxHistory = 12
    let index = -1
    let locked = 0
    for(let i = 0; i < speciesPanelHistory.length; i++){
        if(speciesPanelHistory[i][1] == true){
            locked++
        }
        else if(index < 0){
            index = i
        }
    }

    if(locked >= maxHistory || speciesPanelHistory.some(el => el[0] == speciesName)){
        return
    }

    for(let i = 0; i < speciesPanelHistory.length; i++){
        if(species[speciesPanelHistory[i][0]]["evolutionLine"].includes(speciesName) || species[speciesPanelHistory[i][0]]["forms"].includes(speciesName)){
            speciesPanelHistory[i][0] = speciesName
            for(let j = i; j > locked; j--){
                const temp = speciesPanelHistory[j - 1]
                speciesPanelHistory[j - 1] = speciesPanelHistory[j]
                speciesPanelHistory[j] = temp
            }
            displaySpeciesPanelHistory()
            localStorage.setItem("speciesPanelHistory", JSON.stringify(speciesPanelHistory))
            return
        }
    }

    if(index < 0){
        index = locked
    }

    speciesPanelHistory.splice(index, 0, [speciesName, false])
    while(speciesPanelHistory.length > maxHistory){
        speciesPanelHistory.splice(-1, 1)
    }
    displaySpeciesPanelHistory()
    localStorage.setItem("speciesPanelHistory", JSON.stringify(speciesPanelHistory))
}

function displaySpeciesPanelHistory(){
    while(speciesPanelHistoryContainer.firstChild){
        speciesPanelHistoryContainer.removeChild(speciesPanelHistoryContainer.firstChild)
    }

    for(let i = 0; i < speciesPanelHistory.length; i++){
        const spriteContainer = document.createElement("span")
        const sprite = document.createElement("img")
        const speciesName = speciesPanelHistory[i][0]

        spriteContainer.className = "historyAnimation"
        sprite.src = getSpeciesSpriteSrc(speciesName)
        sprite.className = `sprite${returnTargetSpeciesSprite(speciesName)}`
        if(speciesPanelHistory[i][1] == true){
            spriteContainer.classList.add("locked")
        }
        if(speciesName == panelSpecies){
            spriteContainer.classList.add("historyActive")
        }

        spriteContainer.append(sprite)
        speciesPanelHistoryContainer.append(spriteContainer)






        let lockTimer = 0
        let clickTimer = 0
        function historyHandler(event, preventDefault = true){
            if(preventDefault){
                event.preventDefault()
            }
            if(event.type == "mousedown" || event.type == "mouseup"){
                if(event.which == 2 || event.which == 3){ // if right click or mousewheel
                    return false
                }
            }
            if(event.type == "mousedown" || event.type == "touchstart"){
                spriteContainer.classList.add("clicked")
                spriteContainer.classList.add("emulateClick")
                lockTimer = setTimeout(lockSpecies,750)
                clickTimer = setTimeout(emulateClick, 300)
            }
            else if(event.type == "mouseup" || event.type == "touchend"){
                spriteContainer.classList.remove("clicked")
                clearTimeout(lockTimer)
                if(spriteContainer.classList.contains("emulateClick") && panelSpecies != speciesName){
                    createSpeciesPanel(speciesName)
                }
            }
        }

        function lockSpecies(){
            spriteContainer.classList.toggle("locked")
            if(speciesPanelHistory[i][1] == false){
                speciesPanelHistory[i][1] = true
            }
            else{
                speciesPanelHistory[i][1] = false
            }
            updateSpeciesPanelHistoryOrder()
        }

        function emulateClick(){
            spriteContainer.classList.remove("emulateClick")
        }
        
        spriteContainer.addEventListener("touchstart", (event) => {historyHandler(event)})
        spriteContainer.addEventListener("touchend", (event) => {historyHandler(event)})
        spriteContainer.addEventListener("mousedown", (event) => {historyHandler(event)})
        spriteContainer.addEventListener("mouseup", (event) => {historyHandler(event)})
        document.body.addEventListener("mouseup", (event) => {historyHandler(event, false)})
    }
}


function updateSpeciesPanelHistoryOrder(){
    for(let i = 0; i < speciesPanelHistory.length; i++){
        if(speciesPanelHistory[i][1] == true){
            for(let j = i; j > 0; j--){
                if(speciesPanelHistory[j - 1][1] == true){
                    break
                }
                else{
                    const temp = speciesPanelHistory[j - 1]
                    speciesPanelHistory[j - 1] = speciesPanelHistory[j]
                    speciesPanelHistory[j] = temp
                }
            }
        }
    }
    localStorage.setItem("speciesPanelHistory", JSON.stringify(speciesPanelHistory))
    displaySpeciesPanelHistory()
}




function createChange(stat, oldStat = [""], newStat = [""], obj){

    if(typeof newStat == "object"){
        for (let i = 0; i < newStat.length; i++){


            const changeMainContainer = document.createElement("div")
            const changeContainer = document.createElement("span")
            const statContainer = document.createElement("span")

            const oldStatContainer = document.createElement("span")
            const newStatContainer = document.createElement("span")

            statContainer.innerText = replaceStatString(`${stat}${i}`)


            if(newStat[i] !== oldStat[i]){
                if(oldStat[i] in abilities){
                    oldStatContainer.innerText = abilities[oldStat[i]]["ingameName"]
                }
                else{
                    oldStatContainer.innerText = `${sanitizeString(oldStat[i])}`
                }
                if(newStat[i] in abilities){
                    newStatContainer.innerText = abilities[newStat[i]]["ingameName"]
                }
                else{
                    newStatContainer.innerText = `${sanitizeString(newStat[i])}`
                }
                appendChangesToObj(changeMainContainer, statContainer, changeContainer, oldStatContainer, newStatContainer, obj)   
            }


        }
    }
    else if(newStat !== oldStat){


        const changeMainContainer = document.createElement("div")
        const changeContainer = document.createElement("span")
        const statContainer = document.createElement("span")

        const oldStatContainer = document.createElement("span")
        const newStatContainer = document.createElement("span")

        statContainer.innerText = replaceStatString(stat)


        oldStatContainer.innerText = `${sanitizeString(oldStat)}`
        newStatContainer.innerText = `${sanitizeString(newStat)}`
        if(!isNaN(newStat)){
            if(newStat > oldStat){
                changeContainer.classList.add("buff")
            }
            else{
                changeContainer.classList.add("nerf")
            }
        }
        else if(stat === "type1" || stat === "type2"){
            oldStatContainer.className = `${oldStat} background`
            newStatContainer.className = `${newStat} background`
        }
        appendChangesToObj(changeMainContainer, statContainer, changeContainer, oldStatContainer, newStatContainer, obj)   
    }
}



function appendChangesToObj(changeMainContainer, statContainer, changeContainer, oldStatContainer, newStatContainer, obj){
    changeMainContainer.className = "flex flexAlign"
    changeContainer.classList.add("textAlign")
    changeContainer.classList.add("changeTextAlignFlex")
    statContainer.classList.add("speciesPanelStatPadding")
    statContainer.classList.add("bold")
    oldStatContainer.classList.add("reduceOpacity")
    newStatContainer.classList.add("bold")

    const changeContainerTransition = document.createElement("span")
    changeContainerTransition.innerText = " ➝ "

    changeContainer.append(oldStatContainer, changeContainerTransition, newStatContainer)

    changeMainContainer.append(statContainer, changeContainer)
    obj.append(changeMainContainer)
}







function replaceStatString(stat){
    const replaceStringObject = {
        "type1": "Type 1",
        "type2": "Type 2",
        "eggGroup1": "Egg Group 1",
        "eggGroup2": "Egg Group 2",
        "abilities": "Ability",
        "abilities0": "Ability 1",
        "abilities1": "Ability 2",
        "abilities2": "HA",
        "baseHP": "HP",
        "baseAttack": "Atk",
        "baseDefense": "Def",
        "baseSpAttack": "SpA",
        "baseSpDefense": "SpD",
        "baseSpeed": "Spe",
    }
    if(stat in replaceStringObject){
        return replaceStringObject[stat]
    }
    else{
        return stat
    }
}




















function createSpeciesStrategy(strategy, speciesName){
    const strategyContainer = document.createElement("div")
    const strategyName = document.createElement("h3"); strategyName.className = "strategyName"
    const strategySpriteContainer = document.createElement("span"); strategySpriteContainer.className = "strategySpriteContainer"
    const strategySprite = document.createElement("img"); strategySprite.className = `miniSprite sprite${speciesName} strategySprite`
    const strategyTagsContainer = document.createElement("div"); strategyTagsContainer.className = "strategyTagsContainer"
    const strategyInfo = document.createElement("div"); strategyInfo.className = "strategyInfo"
    const strategyMoves = document.createElement("div"); strategyMoves.className = "strategyTableContainer"
    const strategyMovesTable = document.createElement("table"); strategyMovesTable.className = "strategyTable"
    const strategyMovesTbody = document.createElement("Tbody")
    const strategyMisc = document.createElement("div"); strategyMisc.className = "strategyTableContainer"
    const strategyMiscTable = document.createElement("table"); strategyMiscTable.className = "strategyTable"
    const strategyMiscTbody = document.createElement("Tbody")
    const strategyCommentContainer = document.createElement("div"); strategyCommentContainer.className = "strategyCommentContainer"
    const strategyExportButton = document.createElement("button"); strategyExportButton.className = "strategyExportButton"; strategyExportButton.type = "button"
    
    strategyName.innerText = strategy["name"]
    strategySpriteContainer.append(strategySprite)
    strategySprite.src = sprites[speciesName]
    strategySpriteContainer.append(strategyName)
    strategyContainer.append(strategySpriteContainer)

    if(strategy["tags"].length > 0){
        for(let i = 0; i < strategy["tags"].length; i++){
            const strategyTag = document.createElement("span"); strategyTag.className = "strategyTag"
            strategyTag.innerText = strategy["tags"][i].trim()
            strategyTagsContainer.append(strategyTag)
            if(i >= 2){
                break
            }
        }
        strategyContainer.append(strategyTagsContainer)
    }

    strategyMoves.append(strategyMovesTable)
    strategyMovesTable.append(strategyMovesTbody)
    strategyMisc.append(strategyMiscTable)
    strategyMiscTable.append(strategyMiscTbody)

    for(let i = 0; i < strategy["moves"].length; i++){
        strategyMovesTbody.append(createStrategyMove(i, strategy["moves"][i]))
    }
    strategyMiscTbody.append(createStrategyMisc("Item", strategy["item"], speciesName))
    strategyMiscTbody.append(createStrategyMisc("Ability", strategy["ability"], speciesName))
    strategyMiscTbody.append(createStrategyMisc("Nature", strategy["nature"], speciesName))
    strategyMiscTbody.append(createStrategyMisc("EVs", strategy["evs"], speciesName))

    for(let i = 0; i < strategy["comment"].length; i++){
        const strategyComment = document.createElement("div")
        if(strategy["comment"][i] === ""){
            strategyComment.append(document.createElement("br"))
        }
        else{
            strategyComment.innerText = strategy["comment"][i]
        }
        strategyCommentContainer.append(strategyComment)
    }

    strategyExportButton.innerText = "Export"

    strategyInfo.append(strategyMoves)
    strategyInfo.append(strategyMisc)
    strategyInfo.append(strategyCommentContainer)
    strategyContainer.append(strategyInfo)

    if(strategy["paste"].length > 0){
        strategyContainer.append(strategyExportButton)

        strategyExportButton.addEventListener("click", () => {
            let paste = ""

            for(let i = 0; i < strategy["paste"].length; i++){
                if(strategy["paste"][i] !== ""){
                    paste += `${strategy["paste"][i]}\n`
                }
            }

            try{
                navigator.clipboard.writeText(paste).then(() => {
                    strategyExportButton.classList.add("exportSuccess")
                    strategyExportButton.innerText = "Exported"
                })
                setTimeout(() => {
                    strategyExportButton.classList.remove("exportSuccess")
                    strategyExportButton.innerText = "Export"
                }, "3000");
            }
            catch(e){
                try{
                    copyToClipboard(paste)
                    strategyExportButton.classList.add("exportSuccess")
                    strategyExportButton.innerText = "Exported"
                    setTimeout(() => {
                        strategyExportButton.classList.remove("exportSuccess")
                        strategyExportButton.innerText = "Export"
                    }, "3000");
                }
                catch(e){
                    strategyExportButton.classList.add("exportFailure")
                    strategyExportButton.innerText = "Nuh uh"
                    console.log(e)
                }
            }
            
        })
    }

    return strategyContainer
}









function createStrategyMove(num, move){
    const moveContainer = document.createElement("tr"); moveContainer.className = "strategyTr"
    const moveNum = document.createElement("td"); moveNum.className = "strategyLabel"
    const moveName = document.createElement("td"); moveName.className = "strategyData"

    moveNum.innerText = `Move ${num + 1}:`
    if(/\/|\(|\)/.test(move)){
        moveName.innerText = move.trim()
    }
    else{
        moveName.innerText = sanitizeString(move)
    }
    moveContainer.append(moveNum)
    moveContainer.append(moveName)
    return moveContainer
}







function createStrategyMisc(label, value, speciesName){
    const miscContainer = document.createElement("tr"); miscContainer.className = "strategyTr"
    const miscLabel = document.createElement("td"); miscLabel.className = "strategyLabel"
    const miscValue = document.createElement("td"); miscValue.className = "strategyData"

    miscLabel.innerText = `${label}:`
    if(label === "EVs"){
        if(value){
            for(let i = 0; i < value.length; i++){
                if(value[i] > 0){
                    if(!miscValue.innerText == ""){
                        miscValue.innerText += " / "
                    }
                    if(i === 0)
                        miscValue.innerText += `${value[i]} HP`
                    else if(i === 1)
                        miscValue.innerText += `${value[i]} Atk`
                    else if(i === 2)
                        miscValue.innerText += `${value[i]} Def`
                    else if(i === 3)
                        miscValue.innerText += `${value[i]} SpA`
                    else if(i === 4)
                        miscValue.innerText += `${value[i]} SpD`
                    else if(i === 5)
                        miscValue.innerText += `${value[i]} Spe`
                }
            }
        }
        else{
            miscValue.innerText = `0`
        }
    }
    else{
        if(/\/|\(|\)/.test(value)){
            miscValue.innerText = value.trim()
        }
        else{
            miscValue.innerText = sanitizeString(value)
        }
    }
    miscContainer.append(miscLabel)
    miscContainer.append(miscValue)
    return miscContainer
}




















function buildSpeciesPanelLevelUpFromPreviousEvoTable(table, name, label = "", asc = 0){

    let evolutionLineArray = [name]
    for(let i = species[name]["evolutionLine"].indexOf(name) - 1; i >= 0; i--){
        const targetSpecies = species[name]["evolutionLine"][i]
        for(let j = 0; j < species[targetSpecies]["evolution"].length; j++){
            if(evolutionLineArray.includes(species[targetSpecies]["evolution"][j][2]) && !evolutionLineArray.includes(targetSpecies)){
                evolutionLineArray.push(targetSpecies)
            }
        }
    }

    const Tbody = table.querySelector("tbody")
    const THead = table.querySelector("thead")

    if(!Tbody || !THead){
        return
    }

    while(Tbody.firstChild){
        Tbody.removeChild(Tbody.firstChild)
    }

    let movesArray = []

    for(let i = 1; i < evolutionLineArray.length; i++){
        sortLearnsetsArray(THead, species[evolutionLineArray[i]]["levelUpLearnsets"], label, asc).forEach(move => {
            if(speciesCanLearnMove(species[name], move[0]) === false && !movesArray.includes(move[0])){

                movesArray.push(move[0])

                const row = document.createElement("tr")
    
                const moveName = document.createElement("td")
                moveName.innerText = moves[move[0]]["ingameName"]
                moveName.className = "bold"
                row.append(moveName)
    
                const typeContainer = document.createElement("td")
                const type = document.createElement("div")
                type.innerText = sanitizeString(moves[move[0]]["type"]).slice(0,3)
                type.className = `${moves[move[0]]["type"]} backgroundSmall`
                typeContainer.append(type)
                row.append(typeContainer)
    
                const splitContainer = document.createElement("td")
                const splitIcon = document.createElement("img")
                splitIcon.src = `src/moves/${moves[move[0]]["split"]}.png`
                splitIcon.className = `${sanitizeString(moves[move[0]]["split"])} splitIcon`
                splitContainer.append(splitIcon)
                row.append(splitContainer)
    
                const power = document.createElement("td")
                power.className = "speciesPanelLearnsetsPower"
                if(moves[move[0]]["power"] > 0){
                    power.innerText = moves[move[0]]["power"]
                }
                else{
                    power.innerText = "-"   
                }
                row.append(power)
    
                const accuracy = document.createElement("td")
                accuracy.className = "speciesPanelLearnsetsAccuracy"
                if(moves[move[0]]["accuracy"] > 0){
                    accuracy.innerText = moves[move[0]]["accuracy"]
                }
                else{
                    accuracy.innerText = "-"   
                }
                row.append(accuracy)
    
                const PP = document.createElement("td")
                PP.className = "speciesPanelLearnsetsPP"
                PP.innerText = moves[move[0]]["PP"]
                row.append(PP)
    
                const movedescription = document.createElement("td")
                movedescription.className = "speciesPanelLearnsetsEffect"
                movedescription.innerText = moves[move[0]]["description"].join("")
    
                row.addEventListener('click', function () {
                    createPopupForMove(moves[move[0]])
                    overlay.style.display = 'block'
                }) 
    
                row.append(movedescription)
    
                Tbody.append(row)
            }
        })
    }

    if(Tbody.children.length > 0){
        table.classList.remove("hide")
    }
    else{
        table.classList.add("hide")
    }
}


function buildSpeciesPanelDoubleLearnsetsTable(table, name, input, label = "", asc = 0){

    const Tbody = table.querySelector("tbody")
    const THead = table.querySelector("thead")

    if(!Tbody || !THead){
        return
    }

    while(Tbody.firstChild){
        Tbody.removeChild(Tbody.firstChild)
    }

    sortLearnsetsArray(THead, species[name][input], label, asc).forEach(move => {
        const row = document.createElement("tr")

        const level = document.createElement("td")
        level.innerText = move[1]
        row.append(level)

        const moveName = document.createElement("td")
        moveName.innerText = moves[move[0]]["ingameName"]
        moveName.className = "bold"
        row.append(moveName)

        const typeContainer = document.createElement("td")
        const type = document.createElement("div")
        type.innerText = sanitizeString(moves[move[0]]["type"]).slice(0,3)
        type.className = `${moves[move[0]]["type"]} backgroundSmall`
        typeContainer.append(type)
        row.append(typeContainer)

        const splitContainer = document.createElement("td")
        const splitIcon = document.createElement("img")
        splitIcon.src = `src/moves/${moves[move[0]]["split"]}.png`
        splitIcon.className = `${sanitizeString(moves[move[0]]["split"])} splitIcon`
        splitContainer.append(splitIcon)
        row.append(splitContainer)

        const power = document.createElement("td")
        power.className = "speciesPanelLearnsetsPower"
        if(moves[move[0]]["power"] > 0){
            power.innerText = moves[move[0]]["power"]
        }
        else{
            power.innerText = "-"   
        }
        row.append(power)

        const accuracy = document.createElement("td")
        accuracy.className = "speciesPanelLearnsetsAccuracy"
        if(moves[move[0]]["accuracy"] > 0){
            accuracy.innerText = moves[move[0]]["accuracy"]
        }
        else{
            accuracy.innerText = "-"   
        }
        row.append(accuracy)

        const PP = document.createElement("td")
        PP.className = "speciesPanelLearnsetsPP"
        PP.innerText = moves[move[0]]["PP"]
        row.append(PP)

        const movedescription = document.createElement("td")
        movedescription.className = "speciesPanelLearnsetsEffect"
        movedescription.innerText = moves[move[0]]["description"].join("")

        row.addEventListener('click', function () {
            createPopupForMove(moves[move[0]])
            overlay.style.display = 'block'
        }) 

        row.append(movedescription)

        Tbody.append(row)
    })
}


function buildSpeciesPanelSingleLearnsetsTable(table, name, input, label = "", asc = 0){

    const Tbody = table.querySelector("tbody")
    const THead = table.querySelector("thead")

    if(!Tbody || !THead){
        return
    }

    while(Tbody.firstChild){
        Tbody.removeChild(Tbody.firstChild)
    }

    sortLearnsetsArray(THead, species[name][input], label, asc).forEach(move => {
        const row = document.createElement("tr")

        const moveName = document.createElement("td")
        moveName.innerText = moves[move]["ingameName"]
        moveName.className = "bold"
        row.append(moveName)

        const typeContainer = document.createElement("td")
        const type = document.createElement("div")
        type.innerText = sanitizeString(moves[move]["type"]).slice(0,3)
        type.className = `${moves[move]["type"]} backgroundSmall`
        typeContainer.append(type)
        row.append(typeContainer)

        const splitContainer = document.createElement("td")
        const splitIcon = document.createElement("img")
        splitIcon.src = `src/moves/${moves[move]["split"]}.png`
        splitIcon.className = `${sanitizeString(moves[move]["split"])} splitIcon`
        splitContainer.append(splitIcon)
        row.append(splitContainer)

        const power = document.createElement("td")
        power.className = "speciesPanelLearnsetsPower"
        if(moves[move]["power"] > 0){
            power.innerText = moves[move]["power"]
        }
        else{
            power.innerText = "-"   
        }
        row.append(power)

        const accuracy = document.createElement("td")
        accuracy.className = "speciesPanelLearnsetsAccuracy"
        if(moves[move]["accuracy"] > 0){
            accuracy.innerText = moves[move]["accuracy"]
        }
        else{
            accuracy.innerText = "-"   
        }
        row.append(accuracy)

        const PP = document.createElement("td")
        PP.className = "speciesPanelLearnsetsPP"
        PP.innerText = moves[move]["PP"]
        row.append(PP)

        const movedescription = document.createElement("td")
        movedescription.className = "speciesPanelLearnsetsEffect"
        movedescription.innerText += moves[move]["description"].join("")

        row.addEventListener('click', function () {
            createPopupForMove(moves[move])
            overlay.style.display = 'block'
        }) 

        row.append(movedescription)

        Tbody.append(row)
    })
}



function sortLearnsetsArray(thead, learnsetsArray, label, asc){
    let index = ""

    if(asc == 0){
        thead.querySelectorAll("th").forEach(th => {
            if(th.classList.contains("th-sort-asc")){
                asc = 1
                label = th.innerText
            }
            else if(th.classList.contains("th-sort-desc")){
                asc = -1
                label = th.innerText
            }
        })
    }


    if(asc == 0){
        return learnsetsArray
    }

    if(label === "Name" || label === "Type" || label === "Split" || label === "Power"){
        index = label.toLowerCase()
    }
    else if(label === "Level"){
        index = "level"
    }
    else if(label === "Acc"){
        index = "accuracy"
    }
    else if(label === "Effect"){
        index = "description"
    }
    else if(label === "PP"){
        index = label.toUpperCase()
    }
    else{
        return learnsetsArray
    }

    learnsetsArray.sort((a, b) => {
        let stringA = ""
        let stringB = ""

        if(index === "level"){
            stringA = parseInt(a[1])
            stringB = parseInt(b[1])
        }
        else if(Array.isArray(a)){
            stringA += moves[a[0]][index]
            stringB += moves[b[0]][index]
    
            if(!isNaN(stringA)){
                stringA = parseInt(moves[a[0]][index])
            }
            if(!isNaN(stringB)){
                stringB = parseInt(moves[b[0]][index])
            }
        }
        else{
            stringA += moves[a][index]
            stringB += moves[b][index]
    
            if(!isNaN(stringA)){
                stringA = parseInt(moves[a][index])
            }
            if(!isNaN(stringB)){
                stringB = parseInt(moves[b][index])
            }
        }

        return stringA > stringB ? (1 * asc) : (-1 * asc)
    })

    thead.querySelectorAll("th").forEach(th => {
        th.classList.remove("th-sort-asc", "th-sort-desc")
        if(th.innerText === label){
            th.classList.toggle("th-sort-asc", asc > 0)
            th.classList.toggle("th-sort-desc", asc < 0)
        }
    })

    return learnsetsArray
}




let interval = setInterval(function() {
    if (document.querySelectorAll("#speciesPanelLevelUpFromPreviousEvoTableTHead, #speciesPanelLevelUpTableTHead, #speciesPanelTMHMTableTHead, #speciesPanelTutorTableTHead, #speciesPanelEggMovesTableTHead").length == 0){
        return
    }
    clearInterval(interval);

    document.querySelectorAll("#speciesPanelLevelUpFromPreviousEvoTableTHead, #speciesPanelLevelUpTableTHead, #speciesPanelTMHMTableTHead, #speciesPanelTutorTableTHead, #speciesPanelEggMovesTableTHead").forEach(thead => {
        thead.querySelectorAll("th").forEach(th => {
            th.addEventListener("click", () => {
                const offset = window.scrollY
                if(th.classList.contains("th-sort-desc")){
                    [[speciesPanelLevelUpTable, "levelUpLearnsets"], [speciesPanelTMHMTable, "TMHMLearnsets"], [speciesPanelTutorTable, "tutorLearnsets"], [speciesPanelEggMovesTable, "eggMovesLearnsets"]].forEach(learnsets => {
                        try{
                            if(typeof species[panelSpecies][learnsets[1]][0] == "string"){
                                buildSpeciesPanelSingleLearnsetsTable(learnsets[0], panelSpecies, [learnsets[1]], th.innerText, 1)
                            }
                            else{
                                buildSpeciesPanelDoubleLearnsetsTable(learnsets[0], panelSpecies, [learnsets[1]], th.innerText, 1)
                            }
                        }
                        catch{
                            console.log(`Error building ${learnsets[1]} for ${panelSpecies}`)
                        }
                    })
                    buildSpeciesPanelLevelUpFromPreviousEvoTable(speciesPanelLevelUpFromPreviousEvoTable, panelSpecies, th.innerText, 1)
                }
                else{
                    [[speciesPanelLevelUpTable, "levelUpLearnsets"], [speciesPanelTMHMTable, "TMHMLearnsets"], [speciesPanelTutorTable, "tutorLearnsets"], [speciesPanelEggMovesTable, "eggMovesLearnsets"]].forEach(learnsets => {
                        try{
                            if(typeof species[panelSpecies][learnsets[1]][0] == "string"){
                                buildSpeciesPanelSingleLearnsetsTable(learnsets[0], panelSpecies, [learnsets[1]], th.innerText, -1)
                            }
                            else{
                                buildSpeciesPanelDoubleLearnsetsTable(learnsets[0], panelSpecies, [learnsets[1]], th.innerText, -1)
                            }
                        }
                        catch{
                            console.log(`Error building ${learnsets[1]} for ${panelSpecies}`)
                        }
                    })
                    buildSpeciesPanelLevelUpFromPreviousEvoTable(speciesPanelLevelUpFromPreviousEvoTable, panelSpecies, th.innerText, -1)
                }
                window.scroll({top: offset})
            })
        })
    })
}, 100) 



async function speciesPanel(param){  
    if(typeof speciesPanelMainContainer !== "undefined"){
        if(param === "hide" || species[panelSpecies]["baseSpeed"] <= 0){
            body.classList.remove("fixedPanel")
            overlaySpeciesPanel.style.display = "none"
            speciesPanelMainContainer.classList.add("hide")
            if(typeof refreshURLParams !== "undefined"){
                refreshURLParams()
            }
            if(table.getBoundingClientRect().top < 0){
                utilityButton.innerText = "↑"
            }
            else{
                utilityButton.innerText = "☰"
            }
        }
        else if(param === "show"){
            utilityButton.innerText = "X"
            body.classList.add("fixedPanel")
            overlaySpeciesPanel.style.display = "block"
            speciesPanelMainContainer.classList.remove("hide")
        }
        else{
            speciesPanelMainContainer.classList.toggle("hide")
            if(speciesPanelMainContainer.classList.contains("hide")){
                overlaySpeciesPanel.style.display = "none"
                body.classList.remove("fixedPanel")
                if(typeof refreshURLParams !== "undefined"){
                    refreshURLParams()
                }
                if(table.getBoundingClientRect().top < 0){
                    utilityButton.innerText = "↑"
                }
                else{
                    utilityButton.innerText = "☰"
                }
            }
            else {
                utilityButton.innerText = "X"
                overlaySpeciesPanel.style.display = "block"
                body.classList.add("fixedPanel")
            }
        }
    }
}
