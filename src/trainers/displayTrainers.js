function appendTrainersToTable(key){
    const zone = key.split("\\")[0]
    const trainer = key.split("\\")[1]

    if(!trainers[zone][trainer]["rematch"]){
        let trainerMainContainer = document.createElement("table"); trainerMainContainer.setAttribute("id", key); trainerMainContainer.className = "trainerTable"
        const trainerThead = document.createElement("thead")
        const formatContainer = document.createElement("th"); formatContainer.className = "trainerFormat"
        const trainerNameContainer = document.createElement("th")
        const trainerLocation = document.createElement("th")

        let format = "Singles"
        if(trainers[zone][trainer]["double"]){
            format = "Doubles"
        }
        formatContainer.innerText = `${format} ${checkTrainerDifficulty(zone, trainer)}`
        if(trainers[zone][trainer]["backup"]){
            formatContainer.innerText += " Backup[!]"
        }
        trainerLocation.innerText = zone

        const trainerSpriteContainer = document.createElement("span")
        const trainerSprite = document.createElement("img"); trainerSprite.className = `sprite${trainers[zone][trainer]["sprite"]}`; trainerSprite.src = getTrainerSpriteSrc(trainers[zone][trainer]["sprite"]);
        const trainerName = document.createElement("span"); trainerName.innerText = trainers[zone][trainer]["ingameName"]; trainerName.className = "trainerName"
        const trainerRematchContainer = document.createElement("div"); trainerRematchContainer.className = "trainerRematchContainer hide"
        const trainerRematch = document.createElement("button"); trainerRematch.innerText = "1"; trainerRematch.className = `trainerRematch activeRematch`; trainerRematch.name = trainer
        if(trainers[zone][trainer]["match"]){
            trainerRematch.classList.add("trainerRematchMatch")
        }

        trainerSpriteContainer.append(trainerSprite)
        trainerRematchContainer.append(trainerRematch)
        trainerNameContainer.append(trainerRematchContainer)
        trainerNameContainer.append(trainerSpriteContainer)
        trainerNameContainer.append(trainerName)

        trainerThead.append(formatContainer)
        trainerThead.append(trainerNameContainer)
        trainerThead.append(trainerLocation)

        trainerMainContainer.append(trainerThead)
        trainerMainContainer.append(createTrainerSpeciesTbody(trainers[zone][trainer]))

        trainersTableTbody.append(trainerMainContainer)

        trainerRematch.addEventListener("click", () => {
            replaceTbody(key, zone, trainer)
            setActiveRematch(zone, trainer)
        })

        if(trainers[zone][trainer]["activeRematch"]){
            setActiveRematch(zone, trainer)
        }

        return true
    }
    else{
        const rematch = trainers[zone][trainer]["rematch"]
        const rematchKey = `${zone}\\${rematch}`

        if(document.getElementById(rematchKey)){
            const trainerRematchContainer = document.getElementById(rematchKey).getElementsByClassName("trainerRematchContainer")[0]
            const trainerRematch = document.createElement("button"); trainerRematch.innerText = trainerRematchContainer.children.length + 1; trainerRematch.className = `trainerRematch ${key}`; trainerRematch.name = trainer
            if(trainers[zone][trainer]["match"]){
                trainerRematch.classList.add("trainerRematchMatch")
            }

            if(!trainerRematchContainer.getElementsByClassName(key)[0]){
                trainerRematch.addEventListener("click", () => {
                    replaceTbody(rematchKey, zone, trainer)
                    setActiveRematch(zone, trainer)
                })
        
                trainerRematchContainer.append(trainerRematch)
                trainerRematchContainer.classList.remove("hide")
            }

            if(trainers[zone][trainer]["activeRematch"]){
                replaceTbody(rematchKey, zone, trainer)
                setActiveRematch(zone, trainer)
            }
        }

        return false
    }
}


function createTrainerSpeciesTbody(trainerObj){
    const trainerTbody = document.createElement("tbody"); trainerTbody.className = "trainerTbody"
    let difficulty = "Normal"
    if(trainerObj["party"][trainersDifficulty]){
        difficulty = trainersDifficulty
    }

    for(let i = 0; i < trainerObj["party"][difficulty].length; i++){
        const trainerSpeciesObj = trainerObj["party"][difficulty][i]
        if(species[trainerSpeciesObj["name"]]["baseSpeed"] > 0){
            const trainerSpeciesContainer = document.createElement("td")

            const speciesSpriteContainer = document.createElement("div"); speciesSpriteContainer.className = "trainerSpeciesSprite"
            let speciesName = trainerSpeciesObj["name"]
            const speciesSprite = document.createElement("img"); speciesSprite.className = `sprite${speciesName}`; speciesSprite.src = getSpeciesSpriteSrc(speciesName)
            speciesSpriteContainer.append(speciesSprite)
            trainerSpeciesContainer.append(speciesSpriteContainer)
            speciesSpriteContainer.addEventListener("click", () => {
                createSpeciesPanel(trainerSpeciesObj["name"])
                document.getElementById("speciesPanelMainContainer").scrollIntoView(true)
            })

            const trainerSpeciesAbility = document.createElement("div"); trainerSpeciesAbility.innerText = abilities[species[trainerSpeciesObj["name"]]["abilities"][trainerSpeciesObj["ability"]]]["ingameName"]; trainerSpeciesAbility.className = "hyperlink bold trainerSpeciesAbility"
            trainerSpeciesAbility.addEventListener('click', () => {
            let abilityArray = [species[trainerSpeciesObj["name"]]["abilities"][trainerSpeciesObj["ability"]]]
                if(typeof innatesDefined !== "undefined"){
                    abilityArray = abilityArray.concat(species[trainerSpeciesObj["name"]]["innates"])
                }
                createPopupAbility(abilityArray)
            }) 
            trainerSpeciesContainer.append(trainerSpeciesAbility)

            trainerSpeciesContainer.append(getLvlNatureEl(trainerSpeciesObj))

            const trainerSpeciesItem = document.createElement("div"); trainerSpeciesItem.innerText = sanitizeString(trainerSpeciesObj["item"]); trainerSpeciesItem.className = "bold trainerSpeciesItem"
            trainerSpeciesContainer.append(trainerSpeciesItem)

            trainerSpeciesContainer.append(returnEVsObj(trainerSpeciesObj["evs"]))

            trainerSpeciesContainer.append(returnIVsObj(trainerSpeciesObj["ivs"]))

            trainerSpeciesContainer.append(returnMovesObj(trainerSpeciesObj))

            trainerTbody.append(trainerSpeciesContainer)
        }
    }

    return trainerTbody
}











function returnMovesObj(trainerSpeciesObj){
    const trainerSpeciesMovesContainer = document.createElement("div"); trainerSpeciesMovesContainer.className = "trainerSpeciesMovesContainer"
    for(let i = 0; i < trainerSpeciesObj["moves"].length; i++){
        if(trainerSpeciesObj["moves"][i] != "MOVE_NONE"){
            const trainerSpeciesMoveContainer = document.createElement("div")
            const trainerSpeciesMoveType = document.createElement("span"); trainerSpeciesMoveType.innerText = sanitizeString(moves[trainerSpeciesObj["moves"][i]]["type"]).slice(0,3); trainerSpeciesMoveType.className = `backgroundSmall ${moves[trainerSpeciesObj["moves"][i]]["type"]} trainersSpeciesMoveType`
            const trainerSpeciesMoveName = document.createElement("span"); trainerSpeciesMoveName.className = "trainerSpeciesMoveName hyperlink"

            let moveName = moves[trainerSpeciesObj["moves"][i]]["ingameName"]
            let resized = false
            while(getTextWidth(moveName + ".") >= 90){
                moveName = moveName.slice(0, -1)
                resized = true
            }
            if(resized){
                moveName = moveName + "."
            }
            
            trainerSpeciesMoveName.innerText = moveName

            trainerSpeciesMoveContainer.append(trainerSpeciesMoveType)

            trainerSpeciesMoveName.addEventListener("click", () => {
                createPopupTrainerMoves(moves[trainerSpeciesObj["moves"][i]])
                overlay.style.display = 'block'
                body.classList.add("fixed")
            })

            trainerSpeciesMoveContainer.append(trainerSpeciesMoveName)

            trainerSpeciesMovesContainer.append(trainerSpeciesMoveContainer)
        }
    }

    return trainerSpeciesMovesContainer
}






function returnEVsObj(array){
    const trainerSpeciesEVsContainer = document.createElement("div"); trainerSpeciesEVsContainer.className = "trainerSpeciesEVsContainer"

    const trainerSpeciesEVs = document.createElement("span"); ; trainerSpeciesEVs.className = "trainerSpeciesEVs"

    const indexToString = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"]

    if(allAreEqual(array)){
        const stat = document.createElement("span"); stat.innerText = `${array[0]}\nAll`; stat.className = "trainerSpeciesStat"
        trainerSpeciesEVs.append(stat)
    }
    else{
        for(let i = 0; i < array.length; i++){
            if(i < 6){
                if(array[i] > 0){
                    const stat = document.createElement("span"); stat.innerText = `${array[i]}\n${indexToString[i]}`; stat.className = "trainerSpeciesStat"
                    trainerSpeciesEVs.append(stat)
                }
            }
        }
        if(trainerSpeciesEVs.children.length === 0){
            const stat = document.createElement("span"); stat.innerText = `0\nAll`; stat.className = "trainerSpeciesStat"
            trainerSpeciesEVs.append(stat)
        }
    }

    trainerSpeciesEVsContainer.append(trainerSpeciesEVs)

    return trainerSpeciesEVsContainer
}





function returnIVsObj(array){
    const trainerSpeciesIVs = document.createElement("div"); trainerSpeciesIVs.innerText = ""; trainerSpeciesIVs.className = "trainerSpeciesIVs"

    for(let i = 0; i < array.length; i++){
        if(i < 6){
            trainerSpeciesIVs.innerText += `${array[i]} `
        }
    }
    if(trainerSpeciesIVs.innerText === ""){
        trainerSpeciesIVs.innerText = "0"
    }

    return trainerSpeciesIVs
}






function getLvlNatureEl(trainerSpeciesObj){
    const natureArray = {
        "NATURE_ADAMANT": ["Atk", "SpA"],
        "NATURE_BASHFUL": ["-", "-"],
        "NATURE_BOLD": ["Def", "Atk"],
        "NATURE_BRAVE": ["Atk", "Spe"],
        "NATURE_CALM": ["SpD", "Atk"],
        "NATURE_CAREFUL": ["SpD", "SpA"],
        "NATURE_DOCILE": ["-", "-"],
        "NATURE_GENTLE": ["SpD", "Def"],
        "NATURE_HARDY": ["-", "-"],
        "NATURE_HASTY": ["Spe", "Def"],
        "NATURE_IMPISH": ["Def", "SpA"],
        "NATURE_JOLLY": ["Spe", "SpA"],
        "NATURE_LAX": ["Def", "SpD"],
        "NATURE_LONELY": ["Atk", "Def"],
        "NATURE_MILD": ["SpA", "Def"],
        "NATURE_MODEST": ["SpA", "Atk"],
        "NATURE_NAIVE": ["Spe", "SpD"],
        "NATURE_NAUGHTY": ["Atk", "SpD"],
        "NATURE_QUIET": ["SpA", "Spe"],
        "NATURE_QUIRKY": ["-", "-"],
        "NATURE_RASH": ["SpA", "SpD"],
        "NATURE_RELAXED": ["Def", "Spe"],
        "NATURE_SASSY": ["SpD", "Spe"],
        "NATURE_SERIOUS": ["-", "-"],
        "NATURE_TIMID": ["Spe", "Atk"]
    }

    const lvlNatureContainer = document.createElement("div")
    if(trainerSpeciesObj["lvl"] != 0){
        const trainerSpeciesLvl = document.createElement("span"); trainerSpeciesLvl.innerText = `Lvl ${trainerSpeciesObj["lvl"]} | `
        lvlNatureContainer.append(trainerSpeciesLvl)
    }

    if(!natureArray[trainerSpeciesObj["nature"]]){
        natureContainer.innerText = sanitizeString(nature)
        return natureContainer
    }
    else{
        const statsBuffed = document.createElement("span"); statsBuffed.innerText = natureArray[trainerSpeciesObj["nature"]][0]; statsBuffed.className = "buff"
        const separator = document.createElement("span"); separator.innerText = " / "
        const statsNerfed = document.createElement("span"); statsNerfed.innerText = natureArray[trainerSpeciesObj["nature"]][1]; statsNerfed.className = "nerf"

        lvlNatureContainer.append(statsBuffed)
        lvlNatureContainer.append(separator)
        lvlNatureContainer.append(statsNerfed)
        return lvlNatureContainer
    }
}




function createPopupAbility(abilityArray){
    overlayAbilities.style.display = 'block'
    body.classList.add("fixedAbilities")

    while(popupAbilities.firstChild){
        popupAbilities.removeChild(popupAbilities.firstChild)
    }

    const abilityMainContainer = document.createElement("ul")

    for(let i = 0; i < abilityArray.length; i++){
        const abilityContainer = document.createElement("li")
        const abilityName = document.createElement("span"); abilityName.innerText = `${abilities[abilityArray[i]]["ingameName"]}: `; abilityName.className = "bold"
        const abilityDescription = document.createElement("span"); abilityDescription.innerText = abilities[abilityArray[i]]["description"]
        abilityContainer.append(abilityName)
        abilityContainer.append(abilityDescription)
        abilityMainContainer.append(abilityContainer)
        if(i < abilityArray.length - 1){
            abilityMainContainer.innerHTML += "<br />"
        }
    }

    popupAbilities.append(abilityMainContainer)
}





function createPopupTrainerMoves(move){
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
    if(move["power"] == 0){
        movePower.innerText = "-\nPower"
    }
    popup.append(movePower)

    const movePP = document.createElement("span"); movePP.innerText = `${move["PP"]}\nPP`; movePP.className = "popupTrainerMoveStat"
    popup.append(movePP)

    const moveAccuracy = document.createElement("span"); moveAccuracy.innerText = `${move["accuracy"]}\nAcc`; moveAccuracy.className = "popupTrainerMoveStat"
    if(move["accuracy"] == 0){
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
    const flagsListContainer = document.createElement("ul")
    for(let i = 0; i < move["flags"].length; i++){
        if(move["flags"][i] !== ""){
            const flagName = document.createElement("li"); flagName.innerText = sanitizeString(move["flags"][i])
            flagsListContainer.append(flagName)
        }
    }

    if(flagsListContainer.childElementCount > 0){
        flagsContainer.append(flagsListContainer)
    }
    popup.append(flagsContainer)
}





async function spriteRemoveTrainerBgReturnBase64(trainerSprite, url){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    sprite.crossOrigin = 'anonymous'
    sprite.src = url

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = async () => {
        context.drawImage(sprite, 0, 0)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const backgroundColor = []
        for (let i = 0; i < 4; i++) {
          backgroundColor.push(imageData.data[i])
        }
        for (let i = 0; i < imageData.data.length; i += 4) {
          if (
            imageData.data[i] === backgroundColor[0] &&
            imageData.data[i + 1] === backgroundColor[1] &&
            imageData.data[i + 2] === backgroundColor[2]
          ) imageData.data[i + 3] = 0
        }
        context.putImageData(imageData, 0, 0)

        if(!localStorage.getItem(`${trainerSprite}`)){
            await localStorage.setItem(`${trainerSprite}`, LZString.compressToUTF16(canvas.toDataURL()))
            sprites[trainerSprite] = canvas.toDataURL()
        }
        if(document.getElementsByClassName(`sprite${trainerSprite}`).length > 0){
            const els = document.getElementsByClassName(`sprite${trainerSprite}`)
            for(let i = 0; i < els.length; i++){
                els[i].src = canvas.toDataURL()
            }
        }
    }
}





function replaceTbody(key, zone, trainer){
    const trainerEl = document.getElementById(key)
    if(trainerEl){
        let format = "Singles"

        trainerEl.getElementsByClassName("trainerTbody")[0].replaceWith(createTrainerSpeciesTbody(trainers[zone][trainer]))

        if(trainers[zone][trainer]["double"]){
            format = "Doubles"
        }

        trainerEl.getElementsByClassName("trainerFormat")[0].innerText = `${format} ${checkTrainerDifficulty(zone, trainer)}`
        if(trainers[zone][trainer]["backup"]){
            trainerEl.getElementsByClassName("trainerFormat")[0].innerText.innerText += " Backup[!]"
        }
    }
    
}




function checkTrainerDifficulty(zone, trainer){
    if(trainers[zone][trainer]["party"][trainersDifficulty]){
        return trainersDifficulty
    }
    else{
        return "Normal"
    }
}






function setActiveRematch(zone, trainer){
    let trainerName = trainer
    if(trainers[zone][trainer]["rematch"]){
        trainerName = trainers[zone][trainer]["rematch"]
    }
    const key = `${zone}\\${trainerName}`

    let baseTrainer = trainer
    if(trainers[zone][trainer]["rematch"]){
        baseTrainer = trainers[zone][trainer]["rematch"]
    }
    if(trainers[zone][baseTrainer]["rematchArray"]){
        delete trainers[zone][baseTrainer]["activeRematch"]
        trainers[zone][baseTrainer]["rematchArray"].forEach(rematch => {
            delete trainers[zone][rematch]["activeRematch"]
        })
    }

    trainers[zone][trainer]["activeRematch"] = true


    try{
        document.getElementById(key).getElementsByClassName("activeRematch")[0].classList.remove("activeRematch")
        document.getElementsByName(trainer)[0].classList.add("activeRematch")
    }
    catch{
    }
}





function showRematch(){
    for(let i = 0, j = trainersTracker.length; i < j; i++){
        const zone = trainersTracker[i]["key"].split("\\")[0]
        const trainer = trainersTracker[i]["key"].split("\\")[1]
        if((trainers[zone][trainer]["rematch"] || trainers[zone][trainer]["rematchArray"]) && trainersTracker[i]["filter"].length === 0){
            let rememberI = i
            let baseTrainer = trainer
            if(trainers[zone][trainer]["rematch"]){
                baseTrainer = trainers[zone][trainer]["rematch"]
            }
            //setActiveRematch(zone, trainer)
            if(trainers[zone][baseTrainer]["rematchArray"]){
                const rematchArray = trainers[zone][baseTrainer]["rematchArray"].concat(baseTrainer)
                for(let k = 0; k < rematchArray.length; k++){
                    if((i - k) > 0 && rematchArray.includes(trainersTracker[i - k]["key"].split("\\")[1])){
                        trainersTracker[i - k]["show"] = true
                    }
                    if((i + k) < j && rematchArray.includes(trainersTracker[i + k]["key"].split("\\")[1])){
                        trainersTracker[i + k]["show"] = true
                        rememberI = i + k + 1
                    }
                }
                i = rememberI
            }
        }
    }
}