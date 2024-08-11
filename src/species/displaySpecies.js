window.speciesMoveFilter = null

function appendSpeciesToTable(speciesName){
    if(species[speciesName]["baseSpeed"] <= 0){
        return false
    }
    let moveMethod = null

    const tBody = speciesTableTbody

    const row = document.createElement("tr")
    row.setAttribute("id", `${speciesName}`)
    tBody.append(row)

    if(!speciesMoveFilter){
        for(let i = 0; i < speciesFilterContainer.children.length; i++){
            if(speciesFilterContainer.children[i].innerText.split(":")[0] == "Move"){
                if(Number.isInteger(speciesMoveFilter)){
                    speciesMoveFilter = null
                    break
                }
                speciesMoveFilter = i
            }
        }
        if(Number.isInteger(speciesMoveFilter)){
            speciesMoveFilter = speciesFilterContainer.children[speciesMoveFilter].innerText.replace(" ", "").split(":")[1]
            Object.keys(moves).forEach(moveName => {
                if(moves[moveName]["ingameName"] === speciesMoveFilter){
                    speciesMoveFilter = moveName
                    sortTableByLearnsets(true)
                }
            })
        }
    }
    let IDcontainer = document.createElement("td")
    let ID = document.createElement("div")
    IDcontainer.className = "ID"
    if(speciesMoveFilter){
        moveMethod = speciesCanLearnMove(species[speciesName], speciesMoveFilter)
        let moveFilter = document.createElement("div")
        moveFilter.className = "bold"
        if(Number.isInteger(moveMethod)){
            moveFilter.innerText = `Lv ${moveMethod}`
            moveFilter.classList.add("levelUpLearnsets")
        }
        else if(moveMethod === "eggMovesLearnsets"){
            moveFilter.innerText = "Egg"
            moveFilter.classList.add("eggMovesLearnsets")
        }
        else if(moveMethod === "TMHMLearnsets"){
            moveFilter.innerText = "TM"
            moveFilter.classList.add("TMHMLearnsets")
        }            
        else if(moveMethod === "tutorLearnsets"){
            moveFilter.innerText = "Tutor"
            moveFilter.classList.add("tutorLearnsets")
        }
        IDcontainer.append(moveFilter)
    }
    else{
        ID.innerText = species[speciesName]["ID"]
    }
    IDcontainer.append(ID)
    row.append(IDcontainer)

    let spriteContainer = document.createElement("td")
    spriteContainer.className = "sprite"
    let sprite = document.createElement("img"); sprite.setAttribute("width", 64); sprite.setAttribute("height", 64)
    sprite.className = `sprite${returnTargetSpeciesSprite(speciesName)}`
    sprite.src = getSpeciesSpriteSrc(speciesName)
    spriteContainer.append(sprite)
    row.append(spriteContainer)
        


    let nameContainer = document.createElement("td")
    let name = document.createElement("div")
    let ingameName = document.createElement("div")
    nameContainer.className = "nameContainer"
    name.className = "key hide"
    name.innerText = species[speciesName]["name"]
    ingameName.className = "species"
    ingameName.innerText = sanitizeString(species[speciesName]["name"])
    nameContainer.append(ingameName)
    nameContainer.append(name)
    row.append(nameContainer)


    let typesContainer = document.createElement("td")
    let types = document.createElement("div")
    let type1 = document.createElement("div")
    let type2 = document.createElement("div")
    let type3 = document.createElement("div")
    typesContainer.className = "types"
    type1.innerText = `${sanitizeString(species[speciesName]["type1"])} `
    type2.innerText = `${sanitizeString(species[speciesName]["type2"])} `
    type1.className = `${species[speciesName]["type1"]} background`
    type2.className = `${species[speciesName]["type2"]} background`

    for (let k = 0; k < species[speciesName]["changes"].length; k++){
        if(species[speciesName]["changes"][k][0] === "type1"){
            if(species[speciesName]["type1"] !== species[speciesName]["changes"][k][1] && changelogMode.classList.contains("activeSetting")){
                type1.classList.add("typeChanged")
            }
        }
        else if(species[speciesName]["changes"][k][0] === "type2"){
            if(species[speciesName]["type2"] !== species[speciesName]["changes"][k][1] && changelogMode.classList.contains("activeSetting")){
                type2.classList.add("typeChanged")
            }
        }
    }

    types.append(type1)
    if(species[speciesName]["type1"] !== species[speciesName]["type2"]){
        types.append(type2)
    }
    if(typeof species[speciesName]["type3"] !== "undefined"){
        if(species[speciesName]["type3"] !== species[speciesName]["type1"] && species[speciesName]["type3"] !== species[speciesName]["type2"]){
            type3.innerText = `${sanitizeString(species[speciesName]["type3"])} `
            type3.className = `${species[speciesName]["type3"]} background`
            types.append(type3)
        }
    }
    typesContainer.append(types)
    row.append(typesContainer)

        
    let abilitiesContainer = document.createElement("td")
    abilitiesContainer.className = "abilities"
    for (let j = 0; j < species[speciesName]["abilities"].length; j++){
        let ability = document.createElement("div")
        let abilityName = species[speciesName]["abilities"][j]
        if(j === 1 && abilityName === species[speciesName]["abilities"][0]){
            continue
        }
        else if(j === 2 && (abilityName === species[speciesName]["abilities"][0] || abilityName === "ABILITY_NONE") && (abilityName === species[speciesName]["abilities"][1] || abilityName === "ABILITY_NONE")){
            continue
        }
        if(abilityName !== "ABILITY_NONE" && abilities[abilityName]){
            ability.innerText = `${abilities[abilityName]["ingameName"]} `
            if(j === 2){
                ability.style.fontWeight = "bold"
            }

            for (let k = 0; k < species[speciesName]["changes"].length; k++){
                if(species[speciesName]["changes"][k][0] === "abilities"){
                    if(species[speciesName]["abilities"][j] !== species[speciesName]["changes"][k][1][j] && changelogMode.classList.contains("activeSetting")){
                        const changelogAbilities = document.createElement("span")
                        changelogAbilities.className = "changelogAbilities"
                        changelogAbilities.innerText = "new"
                        ability.append(changelogAbilities)
                    }
                }
            }

            abilitiesContainer.append(ability)
        }
    }
    row.append(abilitiesContainer)

    if(typeof innatesDefined !== "undefined"){
        let innatesContainer = document.createElement("td")
        innatesContainer.className = "innates"
        for (let j = 0; j < species[speciesName]["innates"].length; j++){
            let innates = document.createElement("div")
            let innatesName = species[speciesName]["innates"][j]

            if(innatesName !== "ABILITY_NONE"){
                innates.innerText = `${sanitizeString(innatesName)} `

                innatesContainer.append(innates)
            }
        }
        row.append(innatesContainer)
    }
    else{
        row.classList.add("noInnates")
    }

    [["HP", "baseHP"], ["Atk", "baseAttack"], ["Def", "baseDefense"], ["SpA", "baseSpAttack"], ["SpD", "baseSpDefense"], ["Spe", "baseSpeed"], ["BST", "BST"]].forEach(statInfo => {
        row.append(createBaseStatsContainer(statInfo[0], statInfo[1], species[speciesName]))    
    })

    row.addEventListener("click", () => {
        if(panelSpecies == speciesName){
            speciesPanel("show")
        }
        else{
            createSpeciesPanel(speciesName)
            document.getElementById("speciesPanelMainContainer").scrollIntoView(true)
        }
    })

    return true
}



function createBaseStatsContainer(headerText, stats, speciesObj){
    let baseStatsContainer = document.createElement("td")
    let baseStats = document.createElement("div")
    let baseStatsHeader = document.createElement("div"); baseStatsHeader.className = "italic"


    baseStatsHeader.innerText = headerText

    baseStats.className = `baseStatsBold ${stats}`

    baseStats.innerText = speciesObj[stats]


    for (let k = 0; k < speciesObj["changes"].length; k++){
        if(speciesObj["changes"][k][0] === stats && changelogMode.classList.contains("activeSetting")){
            if(speciesObj[stats] > speciesObj["changes"][k][1]){
                baseStats.classList.add("buff", "bold")
                baseStatsHeader.classList.add("buff", "bold")
            }
            else{
                baseStats.classList.add("nerf", "bold")
                baseStatsHeader.classList.add("nerf", "bold")
            }
        }
    }

    baseStatsContainer.append(baseStatsHeader)
    baseStatsContainer.append(baseStats)
    baseStatsContainer.className = `${stats}Container`

    return baseStatsContainer
}



async function spriteRemoveBgReturnBase64(speciesName, species){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    sprite.crossOrigin = 'anonymous'
    sprite.src = species[speciesName]["sprite"]

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = async () => {
        context.drawImage(sprite, 0, 0)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const backgroundColor = []
        for (let i = 0; i < 4; i++) {
          backgroundColor.push(imageData.data[i])
        }
        let spriteDataString = "", repeat = 1, pal = []
        for (let i = 0; i < imageData.data.length; i += 4) {
            if(imageData.data[i] === backgroundColor[0] && imageData.data[i + 1] === backgroundColor[1] && imageData.data[i + 2] === backgroundColor[2]){
                imageData.data[i + 3] = 0
            }

            if(!pal.includes(`${imageData.data[i]},${imageData.data[i + 1]},${imageData.data[i + 2]},${imageData.data[i + 3]}`)){
                pal.push(`${imageData.data[i]},${imageData.data[i + 1]},${imageData.data[i + 2]},${imageData.data[i + 3]}`)
            }

            if(imageData.data[i] === imageData.data[i + 4] && imageData.data[i + 1] === imageData.data[i + 5] && imageData.data[i + 2] === imageData.data[i + 6] && (imageData.data[i + 3] === imageData.data[i + 7] || imageData.data[i + 3] === 0)){
                repeat++
            }
            else{
                spriteDataString += `&${pal.indexOf(`${imageData.data[i]},${imageData.data[i + 1]},${imageData.data[i + 2]},${imageData.data[i + 3]}`)}*${repeat}`
                repeat = 1
            }
        }
        context.putImageData(imageData, 0, 0)

        spriteDataString = `${canvas.width}&${canvas.height}&[${pal}]${spriteDataString}`

        if(!localStorage.getItem(speciesName)){
            localStorage.setItem(speciesName, LZString.compressToUTF16(spriteDataString))
            sprites[speciesName] = canvas.toDataURL()
        }
        const els = document.getElementsByClassName(`sprite${speciesName}`)
        if(els.length > 0){
            for(let i = 0; i < els.length; i++){
                els[i].src = canvas.toDataURL()
            }
        }
    }
}






function decodeSpriteDataString(spriteDataString){
    let canvas = document.createElement("canvas")

    const spriteData = spriteDataString.split("&")
    canvas.width = spriteData[0]
    canvas.height = spriteData[1]
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const pal = JSON.parse(spriteData[2])
    let counter = 0

    for(let i = 1; i < spriteData.length; i++){
        const spriteDataSplit = spriteData[i].split("*")
        for(let j = 0; j < spriteDataSplit[1]; j++){
            imageData.data[counter] = pal[spriteDataSplit[0] * 4]
            imageData.data[counter + 1] = pal[spriteDataSplit[0] * 4 + 1]
            imageData.data[counter + 2] = pal[spriteDataSplit[0] * 4 + 2]
            imageData.data[counter + 3] = pal[spriteDataSplit[0] * 4 + 3]
            counter += 4
        }
    }

    context.putImageData(imageData, 0, 0)

    return canvas.toDataURL()
}