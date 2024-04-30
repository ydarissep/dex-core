window.locationsMoveFilter = null

function appendLocationsToTable(key){

    const location = key.split("\\")[0]
    const method = key.split("\\")[1]
    const speciesKey = key.split("\\")[2]

    if(!(speciesKey in species)){
        return false
    }

    let table = document.getElementById(`${location}${method}`)
    let tableThead = document.createElement("thead")
    let tableTbody = document.createElement("tbody")
    if(table){
        tableThead = table.children[0]
        tableTbody = table.children[1]
    }
    else{
        const table = document.createElement("table")
        
        let locationTableHeader = createRowHeader(location, method)
        table.setAttribute("id", `${location}${method}`)
        tableThead.append(locationTableHeader)
        table.append(tableThead)
        table.append(tableTbody)
        locationsTableTbody.append(table)
        table.classList = "locationsTable"
    }

    let row = document.createElement("tr")
    row.setAttribute("id", `${key}`)

    if(!locationsMoveFilter){
        for(let i = 0; i < locationsFilterContainer.children.length; i++){
            if(locationsFilterContainer.children[i].innerText.split(":")[0] == "Move"){
                if(Number.isInteger(locationsMoveFilter)){
                    locationsMoveFilter = null
                    break
                }
                locationsMoveFilter = i
            }
        }
        if(Number.isInteger(locationsMoveFilter)){
            locationsMoveFilter = locationsFilterContainer.children[locationsMoveFilter].innerText.replace(" ", "").split(":")[1]
            Object.keys(moves).forEach(moveName => {
                if(moves[moveName]["ingameName"] === locationsMoveFilter){
                    locationsMoveFilter = moveName
                }
            })
        }
    }

    let spriteContainer = document.createElement("td")
    spriteContainer.className = "sprite"
    let sprite = document.createElement("img")
    sprite.src = getSpeciesSpriteSrc(speciesKey)
    sprite.className = `sprite${speciesKey} miniSprite3`
    spriteContainer.append(sprite)
    row.append(spriteContainer)

    let speciesContainer = document.createElement("td")
    let speciesName = document.createElement("div")
    speciesName.className = "key hide"
    speciesName.innerText = speciesKey
    speciesContainer.innerText = sanitizeString(speciesKey)
    speciesContainer.append(speciesName)
    row.append(speciesContainer)

    let rarity = document.createElement("td")
    if(locationsMoveFilter){
        moveMethod = speciesCanLearnMove(species[speciesKey], locationsMoveFilter)
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
        rarity.append(moveFilter)
    }
    else{
        let locationsInfo = document.createElement("div")
        rarity.className = "rarity"
        rarity.innerText = `${locations[location][method][speciesKey]}%`
        rarity.style.color = `hsl(${locations[location][method][speciesKey]*2},85%,45%)`
        locationsInfo.innerText = `${location} ${method}`
        locationsInfo.className = "locationsInfo hide"
        rarity.append(locationsInfo)
    }
    row.append(rarity)

    row.addEventListener("click", () => {
        createSpeciesPanel(speciesKey)
        document.getElementById("speciesPanelMainContainer").scrollIntoView(true)
    })
    
    tableTbody.append(row)
    return true
}

function createRowHeader(location, method){
    let locationTableHeader = document.createElement("tr")
    locationTableHeader.className = "locationTableHeader"

    let spriteHeaderContainer = document.createElement("th")
    let spriteHeader = document.createElement("img")
    spriteHeaderContainer.className = "sprite"
    spriteHeader.src = `https://raw.githubusercontent.com/ydarissep/dex-core/main/sprites/${returnMethodSprite(method).replaceAll(" ", "_")}.png`
    spriteHeaderContainer.append(spriteHeader)
    locationTableHeader.append(spriteHeaderContainer)

    let headerContainer = document.createElement("th")
    headerContainer.innerText = `${location} ${method}`
    headerContainer.colSpan = "2"
    headerContainer.className = "headerContainer"
    locationTableHeader.append(headerContainer)

    return locationTableHeader
}




function returnMethodSprite(method){
    if(method.match(/raid/i)){
        return "Raid"
    }
    else if(method.match(/shard/i)){
        return "Egg"
    }
    else if(method.match(/headbutt/i)){
        return "Headbutt"
    }
    else if(method.match(/hidden/i)){
        return "Hidden"
    }
    else if(method.match(/sprouted|taller|flowering|berries/i)){
        return "Berry"
    }
    else if(method.match(/surfing/i)){
        return "Surfing"
    }
    else if(method.match(/rock smash/i)){
        return "Rock Smash"
    }
    else if(method.match(/old rod/i)){
        return "Old Rod"
    }
    else if(method.match(/good rod/i)){
        return "Good Rod"
    }
    else if(method.match(/super rod/i)){
        return "Super Rod"
    }
    else if(method.match(/Morning/i)){
        return "Morning"
    }
    else if(method.match(/day/i)){
        return "Day"
    }
    else if(method.match(/evening/i)){
        return "Evening"
    }
    else if(method.match(/Night/i)){
        return "Night"
    }
    else if(method.match(/shard/i)){
        return "Egg"
    }
    else{
        return method
    }
}