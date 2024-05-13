window.locationsMoveFilter = null

function appendLocationsToTable(key){
    const timeRegex = /Day|Night|Morning|Evening|Dusk|Dawn/i
    const location = key.split("\\")[0]
    const method = key.split("\\")[1]
    const speciesKey = key.split("\\")[2]

    if(!(speciesKey in species)){
        return false
    }

    let time = method.match(timeRegex)
    if(time){
        time = time[0]
    }
    else{
        time = "Anytime"
    }

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

    let locationTable = document.getElementById(`${location}${time}`)
    if(!locationTable){
        locationTable = returnLocationTable(location, time)
        locationsTableTbody.append(locationTable)
    }

    let methodTable = document.getElementById(`${location}${method}`)
    if(time == method){
        methodTable = document.getElementById(`${location}Land${method}`)
    }
    if(!methodTable){
        methodTable = returnMethodTable(location, method, time)
        locationTable.children[1].append(methodTable)
    }

    appendSpeciesEl(location, method, speciesKey, methodTable)

    return true
}







function appendSpeciesEl(location, method, speciesKey, methodTable){
    const row = document.createElement("tr"); row.setAttribute("ID", `${location}\\${method}\\${speciesKey}`); row.classList = "locationSpeciesRow"

    const rarity = document.createElement("td"); rarity.classList = "locationRarity"
    if(locationsMoveFilter){
        moveMethod = speciesCanLearnMove(species[speciesKey], locationsMoveFilter)
        const moveFilter = document.createElement("div"); moveFilter.className = "bold"
        if(Number.isInteger(moveMethod)){
            moveFilter.innerText = `Lv ${moveMethod}`; moveFilter.classList.add("levelUpLearnsets")
        }
        else if(moveMethod === "eggMovesLearnsets"){
            moveFilter.innerText = "Egg"; moveFilter.classList.add("eggMovesLearnsets")
        }
        else if(moveMethod === "TMHMLearnsets"){
            moveFilter.innerText = "TM"; moveFilter.classList.add("TMHMLearnsets")
        }            
        else if(moveMethod === "tutorLearnsets"){
            moveFilter.innerText = "Tutor"; moveFilter.classList.add("tutorLearnsets")
        }
        rarity.append(moveFilter)
    }
    else{
        rarity.innerText = locations[location][method][speciesKey]
        if(Number.isInteger(parseInt(locations[location][method][speciesKey]))){
            rarity.innerText += "%"
            rarity.style.color = `hsl(${locations[location][method][speciesKey]*2},85%,45%)`
        }
    }

    const spriteContainer = document.createElement("td"); spriteContainer.classList = "locationSpriteContainer"
    const sprite = document.createElement("img"); sprite.src = getSpeciesSpriteSrc(speciesKey); sprite.className = `sprite${speciesKey} miniSprite3`
    const speciesNameHidden = document.createElement("div"); speciesNameHidden.innerText = sanitizeString(speciesKey); speciesNameHidden.classList = "locationSpeciesNameHidden hide"
    const rarityHidden = rarity.cloneNode(true); rarityHidden.classList.add("hide"); rarityHidden.classList.add("locationRarityHidden")
    spriteContainer.append(sprite)
    spriteContainer.append(speciesNameHidden)
    spriteContainer.append(rarityHidden)
    row.append(spriteContainer)

    const speciesName = document.createElement("td"); speciesName.innerText = sanitizeString(speciesKey); speciesName.classList = "locationSpeciesName"
    row.append(speciesName)

    row.append(rarity)

    row.addEventListener("click", () => {
        createSpeciesPanel(speciesKey)
        document.getElementById("speciesPanelMainContainer").scrollIntoView(true)
    })

    methodTable.children[1].append(row)
}








function returnMethodTable(location, method, time){
    const methodTable = document.createElement("table"); methodTable.setAttribute("ID", `${location}${method}`); methodTable.classList = "methodTable"
    if(time == method){
        methodTable.setAttribute("ID", `${location}Land${method}`)
    }
    const methodTableTbody = document.createElement("tbody"); methodTableTbody.classList = "methodTableTbody"

    methodTable.append(returnMethodTableThead(method, time))
    methodTable.append(methodTableTbody)

    return methodTable
}
function returnMethodTableThead(method, time){
    const methodTableThead = document.createElement("thead"); methodTableThead.className = "methodTableThead"
    const row = document.createElement("tr"); row.classList = "methodTableTheadRow"

    const spriteContainer = document.createElement("th")
    const sprite = document.createElement("img"); sprite.src = `https://raw.githubusercontent.com/ydarissep/dex-core/main/sprites/${returnMethodSprite(method).replaceAll(" ", "_")}.png`; sprite.classList = "locationSprite"
    spriteContainer.append(sprite)
    row.append(spriteContainer)

    let methodContainer = document.createElement("th"); methodContainer.innerText = method; methodContainer.classList = "methodContainer"
    if(time){
        methodContainer.innerText = methodContainer.innerText.replace(time, "").trim()
        if(time == method){
            methodContainer.innerText = "Land"
        }
    }
    row.append(methodContainer)

    methodTableThead.append(row)

    return methodTableThead
}








function returnLocationTable(location, time){
    const locationTable = document.createElement("table"); locationTable.setAttribute("ID", `${location}${time}`); locationTable.classList = "locationTable"
    const locationTableTbody = document.createElement("tbody"); locationTableTbody.classList = "locationTableTbody"

    locationTable.append(returnLocationTableThead(location, time))
    locationTable.append(locationTableTbody)
    
    return locationTable
}
function returnLocationTableThead(location, time){
    const locationTableThead = document.createElement("thead"); locationTableThead.classList = "locationTableThead"
    const row = document.createElement("tr")

    const locationName = document.createElement("h1"); locationName.innerText = location
    if(time){
        locationName.innerText += ` ${time}`
    }
    row.append(locationName)
    locationTableThead.append(row)

    return locationTableThead
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