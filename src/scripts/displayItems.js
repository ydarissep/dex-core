let itemsLocations = []
if(localStorage.getItem("itemsLocations")){
    itemsLocations = JSON.parse(localStorage.getItem("itemsLocations"))
}

function appendItemsToTable(key){
    if(items[key]["description"] == "" || items[key]["sprite"] === "" || /_MAIL$|ITEM_NONE/i.test(items[key]["name"])){
        return false
    }
    if(settings.includes(items[key]["pocket"])){
        return false
    }

    const tBody = itemsTableTbody

    const itemTable = document.createElement("table"); itemTable.setAttribute("ID", key)
    itemTable.append(returnItemTableThead(key))
    itemTable.append(returnItemTableTbody(key))

    if(itemTable.children[1].children.length === 0 && settings.includes("hideEmptyItems")){
        return false
    }

    tBody.append(itemTable)
    return true
}





function returnItemTableThead(key){
    const itemTableThead = document.createElement("thead")

    const row = document.createElement("tr")
    const itemSpriteContainer = document.createElement("th")
    const itemSprite = document.createElement("img"); itemSprite.src = getItemSpriteSrc(key); itemSprite.classList = `itemSprite sprite${key}`
    const itemNameDescContainer = document.createElement("th")
    const itemName = document.createElement("span"); itemName.innerText = items[key]["ingameName"]; itemName.classList = "itemName"
    if(/^TM\d+$|^HM\d+$/i.test(itemName.innerText)){
        itemName.innerText = sanitizeString(items[key]["name"]).replace("Tm", "TM").replace("Hm", "HM")
    }
    const itemDescription = document.createElement("th"); itemDescription.innerText = items[key]["description"]; itemDescription.classList = "itemDescription"

    itemSpriteContainer.append(itemSprite)
    itemNameDescContainer.append(itemName)
    itemNameDescContainer.append(itemDescription)
    row.append(itemSpriteContainer)
    row.append(itemNameDescContainer)

    itemTableThead.append(row)

    return itemTableThead
}








function returnItemTableTbody(key){
    const itemsTableTbody = document.createElement("tbody")

    Object.keys(items[key]["locations"]).forEach(method => {
        if(!settings.includes(method)){
            for(let i = 0; i < items[key]["locations"][method].length; i++){
                if((!settings.includes("hideCrossedItems") || !itemsLocations.includes(`${key}${method}${items[key]["locations"][method][i]}`)) && items[key]["locations"][method][i] !== "Debug"){
                    const row = document.createElement("tr")
                    const methodContainer = document.createElement("td"); methodContainer.innerText = method
                    const location = document.createElement("td"); location.innerText = items[key]["locations"][method][i]
        
                    row.append(methodContainer)
                    row.append(location)

                    if(itemsLocations.includes(`${key}${method}${items[key]["locations"][method][i]}`)){
                        row.classList.add("itemCrossed")
                    }
        
                    itemsTableTbody.append(row)
        
                    row.addEventListener("click", () => {
                        row.classList.toggle("itemCrossed")
                        const itemLocationMethodString = `${key}${method}${items[key]["locations"][method][i]}`

                        if(row.classList.contains("itemCrossed")){
                            itemsLocations.push(itemLocationMethodString)
                            if(settings.includes("hideCrossedItems")){
                                row.classList.add("hide")

                                if(settings.includes("hideEmptyItems")){
                                    row.closest("table").classList.add("hide")
                                    for(let j = 0; j < row.parentElement.children.length; j++){
                                        if(!row.parentElement.children[j].classList.contains("hide")){
                                            row.closest("table").classList.remove("hide")
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            itemsLocations = itemsLocations.filter(filter => filter !== itemLocationMethodString)
                        }

                        localStorage.setItem("itemsLocations", JSON.stringify(itemsLocations))
                    })   
                }
            }
        }
    })

    return itemsTableTbody
}










let getItemsButtons = setInterval(function() {
    if(!document.getElementById("hideCrossedItems") || !document.getElementById("hideEmptyItems") || !document.getElementById("resetCrossedItems")){
        return
    }
    clearInterval(getItemsButtons)


    document.getElementById("hideCrossedItems").addEventListener("click", () => {
        const hideCrossedItems = document.getElementById("hideCrossedItems")
        hideCrossedItems.classList.toggle("activeSetting")
    
        if(hideCrossedItems.classList.contains("activeSetting")){
            settings.push("hideCrossedItems")
        }
        else{
            settings = settings.filter(filter => filter !== "hideCrossedItems")
        }
    
        localStorage.setItem("DEXsettings", JSON.stringify(settings))
        lazyLoading(true)
    })
    
    document.getElementById("hideEmptyItems").addEventListener("click", () => {
        const hideEmptyItems = document.getElementById("hideEmptyItems")
        hideEmptyItems.classList.toggle("activeSetting")
    
        if(hideEmptyItems.classList.contains("activeSetting")){
            settings.push("hideEmptyItems")
        }
        else{
            settings = settings.filter(filter => filter !== "hideEmptyItems")
        }
    
        localStorage.setItem("DEXsettings", JSON.stringify(settings))
        lazyLoading(true)
    })
    
    let resetTimer = 0
    function resetItemsHandler(event, preventDefault = true){
        if(preventDefault){
            event.preventDefault()
        }
        if(event.type == "mousedown" || event.type == "mouseup"){
            if(event.which == 2 || event.which == 3){ // if right click or mousewheel
                return false
            }
        }
        if(event.type == "mousedown" || event.type == "touchstart"){
            document.getElementById("resetCrossedItems").classList.add("clicked")
            resetTimer = setTimeout(lockSpecies,1500)
        }
        else if(event.type == "mouseup" || event.type == "touchend"){
            document.getElementById("resetCrossedItems").classList.remove("clicked")
            clearTimeout(resetTimer)
        }
    
        function lockSpecies(){
            itemsLocations = []
            localStorage.setItem("itemsLocations", JSON.stringify(itemsLocations))
            document.getElementById("resetCrossedItems").classList.remove("clicked")
            lazyLoading(true)
        }
    }
    document.getElementById("resetCrossedItems").addEventListener("touchstart", (event) => {resetItemsHandler(event)})
    document.getElementById("resetCrossedItems").addEventListener("touchend", (event) => {resetItemsHandler(event)})
    document.getElementById("resetCrossedItems").addEventListener("mousedown", (event) => {resetItemsHandler(event)})
    document.getElementById("resetCrossedItems").addEventListener("mouseup", (event) => {resetItemsHandler(event)})
    document.body.addEventListener("mouseup", (event) => {resetItemsHandler(event, false)})
}, 100)  











async function setupItemsButtonFilters(){
    if(settings.includes("hideCrossedItems")){
        document.getElementById("hideCrossedItems").classList.add("activeSetting")
    }
    if(settings.includes("hideEmptyItems")){
        document.getElementById("hideEmptyItems").classList.add("activeSetting")
    }

    const pocketButtonsContainer = document.getElementById("pocketContainer")
    const methodButtonsContainer = document.getElementById("methodContainer")
    
    let pocketsName = []
    let methods = []
    Object.keys(items).forEach(itemName => {
        if(!pocketsName.includes(items[itemName]["pocket"]) && itemName != "ITEM_NONE"){
            pocketsName.push(items[itemName]["pocket"])
        }
        Object.keys(items[itemName]["locations"]).forEach(method => {
            if(!methods.includes(method)){
                methods.push(method)
            }
        })
    })

    pocketsName.forEach(pocketName => {
        const pocketButton = document.createElement("button"); pocketButton.innerText = sanitizeString(pocketName); pocketButton.classList = "pocketButton activeSetting"; pocketButton.setAttribute("ID", pocketName)
        if(settings.includes(pocketName)){
            pocketButton.classList.remove("activeSetting")
        }
        pocketButton.addEventListener("click", () => {
            pocketButton.classList.toggle("activeSetting")

            if(pocketButton.classList.contains("activeSetting")){
                settings = settings.filter(filter => filter !== pocketName)
            }
            else{
                settings.push(pocketName)
            }

            localStorage.setItem("DEXsettings", JSON.stringify(settings))
            lazyLoading(true)
        })

        if(pocketButton.innerText !== ""){
            pocketButtonsContainer.append(pocketButton)
        }
    })

    methods.forEach(method => {
        if(method != "Tutor"){
            const methodButton = document.createElement("button"); methodButton.innerText = method; methodButton.classList = "methodButton activeSetting"; methodButton.setAttribute("ID", method)
            if(settings.includes(method)){
                methodButton.classList.remove("activeSetting")
            }
            methodButton.addEventListener("click", () => {
                methodButton.classList.toggle("activeSetting")

                if(methodButton.classList.contains("activeSetting")){
                    settings = settings.filter(filter => filter !== method)
                }
                else{
                    settings.push(method)
                }

                localStorage.setItem("DEXsettings", JSON.stringify(settings))
                lazyLoading(true)
            })

            if(methodButton.innerText !== ""){
                methodButtonsContainer.append(methodButton)
            }
        }
    })
}























async function spriteRemoveItemBgReturnBase64(itemName){
    let sprite = new Image()
    let canvas = document.createElement("canvas")
    canvas.width = 24
    canvas.height = 24
    sprite.crossOrigin = 'anonymous'
    sprite.src = items[itemName]["url"]

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)

    sprite.onload = async () => {
        context.drawImage(sprite, 0, 0)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const backgroundColor = []
        for (let i = 0; i < 4; i++) {
          backgroundColor.push(imageData.data[i])
        }
        if(backgroundColor[3] === 255){
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (
                  imageData.data[i] === backgroundColor[0] &&
                  imageData.data[i + 1] === backgroundColor[1] &&
                  imageData.data[i + 2] === backgroundColor[2]
                ) imageData.data[i + 3] = 0
              }
              context.putImageData(imageData, 0, 0)
      
              if(!localStorage.getItem(`${itemName}`)){
                  await localStorage.setItem(`${itemName}`, LZString.compressToUTF16(canvas.toDataURL()))
                  sprites[itemName] = canvas.toDataURL()
              }
              if(document.getElementsByClassName(`sprite${itemName}`).length > 0){
                  const els = document.getElementsByClassName(`sprite${itemName}`)
                  for(let i = 0; i < els.length; i++){
                      els[i].src = canvas.toDataURL()
                  }
              }
        }
    }
}