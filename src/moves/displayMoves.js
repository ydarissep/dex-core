function appendMovesToTable(moveName){

    if(moves[moveName]["PP"] <= 0 || moves[moveName]["description"] == ""){
        return false
    }

    let tBody = movesTableTbody

    let row = document.createElement("tr")

    row.setAttribute("id", `${moveName}`)

    if(moves[moveName]["ID"]){
        let movesID = document.createElement("td")
        movesID.className = "moveID"
        movesID.innerText = moves[moveName]["ID"]
        row.append(movesID)
    }

    let nameContainer = document.createElement("td")
    let name = document.createElement("div")
    let ingameName = document.createElement("div")
    nameContainer.className = "nameContainer"
    name.className = "key hide"
    name.innerText = moves[moveName]["name"]
    ingameName.className = "move"
    ingameName.innerText = moves[moveName]["ingameName"]
    nameContainer.append(name)
    nameContainer.append(ingameName)

    row.append(nameContainer)




    let typeContainer = document.createElement("td")
    let type = document.createElement("div")
    let hiddenSplit = document.createElement("div")
    typeContainer.className = "type"
    type.className = `${moves[moveName]["type"]} background`
    type.innerText = sanitizeString(moves[moveName]["type"])
    hiddenSplit.innerText = sanitizeString(moves[moveName]["split"])
    hiddenSplit.className = "hide"
    typeContainer.append(type)
    typeContainer.append(hiddenSplit)
    row.append(typeContainer)


    let splitContainer = document.createElement("td")
    let split = document.createElement("div")
    let hiddenType = document.createElement("div")
    let splitIcon = document.createElement("img")
    splitContainer.className = "split"
    split.className = "hide"
    split.innerText = sanitizeString(moves[moveName]["split"])
    hiddenType.innerText = moves[moveName]["type"]
    hiddenType.className = "hide"
    splitIcon.className = `${sanitizeString(moves[moveName]["split"])} splitIcon`
    splitIcon.src = `src/moves/${moves[moveName]["split"]}.png`
    splitContainer.append(split)
    splitContainer.append(hiddenType)
    splitContainer.append(splitIcon)
    row.append(splitContainer)




    const moveObj = moves[moveName]

    row.append(createInputContainer("Power", "power", moveObj))

    row.append(createInputContainer("Acc", "accuracy", moveObj))

    row.append(createInputContainer("PP", "PP", moveObj))





    let effectContainer = document.createElement("td")
    let descriptionContainer = document.createElement("div")


    descriptionContainer.className = "description"
    let description = document.createElement("div")
    description.innerText = moves[moveName]["description"].join("")
    descriptionContainer.append(description)


    effectContainer.append(descriptionContainer)

    let effect = document.createElement("div")
    effect.className = "effect"
    effect.innerText = `${sanitizeString(moves[moveName]["effect"])}`


    let chance = moves[moveName]["chance"]
    if(chance > 0 && chance < 100){
        effect.innerText += ` ${chance}%`
    }
    else{
        effect.classList.add("hide")
    }

    effectContainer.append(effect)

    row.append(effectContainer)

    row.addEventListener('click', function () {
        createPopupForMove(moves[moveName])
        overlay.style.display = 'block'
        body.classList.add("fixed")
    }) 

    tBody.append(row)
    return true
}



function createInputContainer(headerText, input, moveObj){
    let inputContainer = document.createElement("td")
    let inputValue = document.createElement("div")
    let inputHeader = document.createElement("div") //only used for mobile view


    inputHeader.innerText = headerText //only used for mobile view
    inputHeader.style.display = "none" //only used for mobile view
    inputHeader.className = "movesHeader" //only used for mobile view

    inputValue.className = `movesBold ${input}` //only used for mobile view

    if(moveObj[input] <= 0 || moveObj[input] === undefined)
        inputValue.innerText = "-"
    else
        inputValue.innerText = moveObj[input]

    inputContainer.append(inputHeader)
    inputContainer.append(inputValue)
    inputContainer.className = `${input}Container`

    return inputContainer
}






function createPopupForMove(move, interactAble = true){
    while(popup.firstChild){
        popup.removeChild(popup.firstChild)
    }

    const moveName = document.createElement("h2"); moveName.classList.add("bold"); moveName.innerText = move["ingameName"]
    popup.append(moveName)

    const moveTypeSplitContainer = document.createElement("div"); moveTypeSplitContainer.className = "popupTrainerMoveTypeSplitContainer"
    const moveType = document.createElement("span"); moveType.innerText = sanitizeString(move["type"]); moveType.className = `background ${move["type"]} popupTrainerMoveType`
    moveTypeSplitContainer.append(moveType)

    const moveSplit = document.createElement("img"); moveSplit.src = `src/moves/${move["split"]}.png`; moveSplit.className = `${sanitizeString(move["split"])} splitIcon`
    moveTypeSplitContainer.append(moveSplit)
    popup.append(moveTypeSplitContainer)

    const movePower = document.createElement("span"); movePower.innerText = `${move["power"]}\nPower`; movePower.className = "popupTrainerMoveStat"
    if(move["power"] <= 0){
        movePower.innerText = "-\nPower"
    }
    popup.append(movePower)

    const movePP = document.createElement("span"); movePP.innerText = `${move["PP"]}\nPP`; movePP.className = "popupTrainerMoveStat"
    popup.append(movePP)

    const moveAccuracy = document.createElement("span"); moveAccuracy.innerText = `${move["accuracy"]}\nAcc`; moveAccuracy.className = "popupTrainerMoveStat"
    if(move["accuracy"] <= 0){
        moveAccuracy.innerText = "-\nAcc"
    }
    popup.append(moveAccuracy)

    if(moves[move["name"]]["chance"] > 0 && moves[move["name"]]["chance"] < 100){
        const moveEffect = document.createElement("div"); moveEffect.innerText = `${sanitizeString(moves[move["name"]]["effect"])} ${moves[move["name"]]["chance"]}%`; moveEffect.className = "bold popupTrainerMoveEffect"
        popup.append(moveEffect)
    }

    const moveDescription = document.createElement("div"); moveDescription.innerText = move["description"].join(""); moveDescription.className = "popupTrainerMoveDescription"
    popup.append(moveDescription)

    const flagsContainer = document.createElement("div")
    const flagsListContainer = document.createElement("ul"); flagsListContainer.setAttribute("margin-bottom", "0px")
    for(let i = 0; i < move["flags"].length; i++){
        if(move["flags"][i] !== ""){
            const flagName = document.createElement("li"); flagName.innerText = sanitizeString(move["flags"][i])
            if(interactAble){
                flagName.classList.add("hyperlink")

                flagName.addEventListener("click", async() => {
                    if(!movesButton.classList.contains("activeButton")){
                        tracker = movesTracker
                        await tableButtonClick("moves")
                    }
                    deleteFiltersFromTable()
                    createFilter(sanitizeString(move["flags"][i]), "Flag")
                    overlay.style.display = 'none'
                    body.classList.remove("fixed")
                    speciesPanel("hide")
                    window.scrollTo({ top: 0})
                })
            }

            flagsListContainer.append(flagName)
        }
    }

    if(flagsListContainer.childElementCount > 0){
        flagsContainer.append(flagsListContainer)
    }
    popup.append(flagsContainer)

    if(interactAble){
        const filterButton = document.createElement("button"); filterButton.classList.add("popupFilterButton")
        filterButton.innerText = "FILTER"

        filterButton.addEventListener("click", async() => {
            if(!speciesButton.classList.contains("activeButton")){
                tracker = speciesTracker
                await tableButtonClick("species")
            }
            overlay.style.display = 'none'
            speciesPanel("hide")
            deleteFiltersFromTable()
            createFilter(move["ingameName"], "Move")
            window.scrollTo({ top: 0})
        })

        popup.append(filterButton)
    }
}