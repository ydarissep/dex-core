window.tracker
window.panelSpecies = ""
window.historyObj = []
window.trainersDifficulty = "Normal"
window.regexSpChar = new RegExp("-|'|’| |,|\\.|_|!|\\?", "g")




window.tableFilter = document.getElementById("tableFilter")



window.body = document.getElementById("body")
window.settingsButton = document.getElementById("settings")
window.credits = document.getElementById("credits")
window.modal = document.getElementById("modal")
window.update = document.getElementById("update")
window.overlay = document.getElementById('overlay')
window.popup = document.getElementById('popup')
window.overlayAbilities = document.getElementById('overlayAbilities')
window.popupAbilities = document.getElementById('popupAbilities')
window.overlaySpeciesPanel = document.getElementById('overlaySpeciesPanel')

window.changelogMode = document.getElementById("changelogMode")
window.onlyShowChangedPokemon = document.getElementById("onlyShowChangedPokemon")
window.onlyShowStrategyPokemon = document.getElementById("onlyShowStrategyPokemon")


window.graph = document.getElementById("statsGraph")
window.graphStats = [...graph.children]
window.statDisplays = [...document.querySelectorAll(".statsGraphHeader")]


window.speciesPanelMainContainer = document.getElementById("speciesPanelMainContainer")
window.speciesPanelHistoryContainer = document.getElementById("speciesPanelHistoryContainer")
window.speciesName = document.getElementById("speciesName")
window.speciesID = document.getElementById("speciesID")
window.speciesPanelInputSpecies = document.getElementById("speciesPanelInputSpecies")
window.speciesPanelInputSpeciesDataList = document.getElementById("speciesPanelInputSpeciesDataList")
window.shinyToggle = document.getElementById("shinyToggle")
window.speciesSprite = document.getElementById("speciesSprite")
window.speciesType1 = document.getElementById("speciesType1")
window.speciesType2 = document.getElementById("speciesType2")
window.speciesAbilities = document.getElementById("speciesAbilities")
window.speciesInnatesMainContainer = document.getElementById("speciesInnatesMainContainer")
window.speciesInnates = document.getElementById("speciesInnates")
window.speciesBaseStatsGraph = document.getElementById("speciesBaseStatsGraph")
window.speciesEvolutionsText = document.getElementById("speciesEvolutionsText")
window.speciesEvoTable = document.getElementById("speciesEvoTable")
window.speciesFormes = document.getElementById("speciesFormes")
window.speciesFormesText = document.getElementById("speciesFormesText")
window.speciesEggGroups = document.getElementById("speciesEggGroups")
window.speciesHeldItems = document.getElementById("speciesHeldItems")
window.speciesChanges = document.getElementById("speciesChanges")
window.speciesHeldItemsContainer = document.getElementById("speciesHeldItemsContainer")
window.speciesChangesContainer = document.getElementById("speciesChangesContainer")
window.speciesDefensiveTypeChart = document.getElementById("speciesDefensiveTypeChart")
window.speciesOffensiveTypeChart = document.getElementById("speciesOffensiveTypeChart")
window.speciesStrategiesContainer = document.getElementById("speciesStrategiesContainer")
window.speciesStrategies = document.getElementById("speciesStrategies")
window.speciesPanelLevelUpFromPreviousEvoTable = document.getElementById("speciesPanelLevelUpFromPreviousEvoTable")
window.speciesPanelLevelUpFromPreviousEvoTableTbody = document.getElementById("speciesPanelLevelUpFromPreviousEvoTableTbody")
window.hideLevelUpFromPreviousEvolution = document.getElementById("hideLevelUpFromPreviousEvolution")
window.speciesPanelLevelUpTable = document.getElementById("speciesPanelLevelUpTable")
window.speciesPanelLevelUpTableTbody = document.getElementById("speciesPanelLevelUpTableTbody")
window.hideLevelUp = document.getElementById("hideLevelUp")
window.speciesPanelTMHMTable = document.getElementById("speciesPanelTMHMTable")
window.speciesPanelTMHMTableTbody = document.getElementById("speciesPanelTMHMTableTbody")
window.hideTMHM = document.getElementById("hideTMHM")
window.speciesPanelTutorTable = document.getElementById("speciesPanelTutorTable")
window.speciesPanelTutorTableTbody = document.getElementById("speciesPanelTutorTableTbody")
window.hideTutor = document.getElementById("hideTutor")
window.speciesPanelEggMovesTable = document.getElementById("speciesPanelEggMovesTable")
window.speciesPanelEggMovesTableTbody = document.getElementById("speciesPanelEggMovesTableTbody")
window.hideEggMoves = document.getElementById("hideEggMoves")







window.speciesInput = document.getElementById("speciesInput")
window.speciesButton = document.getElementById("speciesButton")
window.speciesTable = document.getElementById("speciesTable")
window.speciesTableThead = document.getElementById("speciesTableThead")
window.speciesTableTbody = document.getElementById("speciesTableTbody")


window.abilitiesInput = document.getElementById("abilitiesInput")
window.abilitiesButton = document.getElementById("abilitiesButton")
window.abilitiesTable = document.getElementById("abilitiesTable")
window.abilitiesTableThead = document.getElementById("abilitiesTableThead")
window.abilitiesTableTbody = document.getElementById("abilitiesTableTbody")


window.locationsInput = document.getElementById("locationsInput")
window.locationsButton = document.getElementById("locationsButton")
window.locationsTable = document.getElementById("locationsTable")
window.locationsTableTbody = document.getElementById("locationsTableTbody")


window.movesInput = document.getElementById("movesInput")
window.movesButton = document.getElementById("movesButton")
window.movesTable = document.getElementById("movesTable")
window.movesTableThead = document.getElementById("movesTableThead")
window.movesTableTbody = document.getElementById("movesTableTbody")


window.trainersInput = document.getElementById("trainersInput")
window.trainersButton = document.getElementById("trainersButton")
window.trainersTable = document.getElementById("trainersTable")
window.difficultyButtonContainer = document.getElementById("difficultyButtonContainer")
window.trainersTableTbody = document.getElementById("trainersTableTbody")
window.trainersFilter = document.getElementById("trainersFilter")


window.itemsInput = document.getElementById("itemsInput")
window.itemsButton = document.getElementById("itemsButton")
window.itemsTable = document.getElementById("itemsTable")
window.itemsTableTbody = document.getElementById("itemsTableTbody")
window.itemsFilter = document.getElementById("itemsFilter")


window.abilitiesInputDataList = document.getElementById("abilitiesInputDataList")
window.speciesInputDataList = document.getElementById("speciesInputDataList")
window.movesInputDataList = document.getElementById("movesInputDataList")



window.table = document.querySelector("#table")

window.headerAbilitiesName = document.querySelector("#abilitiesTableThead th.ability")
window.headerAbilitiesDescription = document.querySelector("#abilitiesTableThead th.description")

window.headerMovesMove = document.querySelector("#movesTableThead th.move")
window.headerMovesType = document.querySelector("#movesTableThead th.type")
window.headerMovesSplit = document.querySelector("#movesTableThead th.split")
window.headerMovesPower = document.querySelector("#movesTableThead th.power")
window.headerMovesAccuracy = document.querySelector("#movesTableThead th.accuracy")
window.headerMovesPP = document.querySelector("#movesTableThead th.PP")
window.headerMovesEffect = document.querySelector("#movesTableThead th.effect")

window.headerSpeciesID = document.querySelector("#speciesTableThead th.ID")
window.headerSpeciesSprite = document.querySelector("#speciesTableThead th.sprite")
window.headerSpeciesName = document.querySelector("#speciesTableThead th.species")
window.headerSpeciesTypes = document.querySelector("#speciesTableThead th.types")
window.headerSpeciesAbilities = document.querySelector("#speciesTableThead th.abilities")
window.headerSpeciesInnates = document.querySelector("#speciesTableThead th.innates")
window.headerSpeciesStarterCost = document.querySelector("#speciesTableThead th.starterCost")
window.headerSpeciesHP = document.querySelector("#speciesTableThead th.baseHP")
window.headerSpeciesAtk = document.querySelector("#speciesTableThead th.baseAttack")
window.headerSpeciesDef = document.querySelector("#speciesTableThead th.baseDefense")
window.headerSpeciesSpA = document.querySelector("#speciesTableThead th.baseSpAttack")
window.headerSpeciesSpD = document.querySelector("#speciesTableThead th.baseSpDefense")
window.headerSpeciesSpe = document.querySelector("#speciesTableThead th.baseSpeed")
window.headerSpeciesBST = document.querySelector("#speciesTableThead th.BST")

window.headerLocationsSprite = document.querySelector("#locationsTableThead th.sprite")
window.headerLocationsSpecies = document.querySelector("#locationsTableThead th.species")
window.headerLocationsRarity = document.querySelector("#locationsTableThead th.rarity")
window.headerLocationsZone = document.querySelector("#locationsTableThead th.zone")

window.utilityButton = document.querySelector(".utilityButton")




shinyToggle.addEventListener("click", async () => {
    fetchShinySprite(true)
})




hideLevelUpFromPreviousEvolution.addEventListener("click", () => {
    hideLevelUpFromPreviousEvolution.classList.toggle("activeSetting")
    changeSetting("hideLevelUpFromPreviousEvolution", hideLevelUpFromPreviousEvolution.classList.contains("activeSetting"))
})

hideLevelUp.addEventListener("click", () => {
    hideLevelUp.classList.toggle("activeSetting")
    changeSetting("hideLevelUp", hideLevelUp.classList.contains("activeSetting"))
})

hideTMHM.addEventListener("click", () => {
    hideTMHM.classList.toggle("activeSetting")
    changeSetting("hideTMHM", hideTMHM.classList.contains("activeSetting"))
})

hideTutor.addEventListener("click", () => {
    hideTutor.classList.toggle("activeSetting")
    changeSetting("hideTutor", hideTutor.classList.contains("activeSetting"))
})

hideEggMoves.addEventListener("click", () => {
    hideEggMoves.classList.toggle("activeSetting")
    changeSetting("hideEggMoves", hideEggMoves.classList.contains("activeSetting"))
})





headerAbilitiesName.addEventListener("click", () => {
    sortTableByClassName(abilitiesTable, abilities, ["name"], "ability", asc = headerAbilitiesName.classList.contains("th-sort-desc"))
})
headerAbilitiesDescription.addEventListener("click", () => {
    sortTableByClassName(abilitiesTable, abilities, ["description"], "description", asc = headerAbilitiesDescription.classList.contains("th-sort-desc"))
})






headerMovesMove.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["name"], "move", asc = headerMovesMove.classList.contains("th-sort-desc"))
})
headerMovesType.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["type", "split"], "type", asc = headerMovesType.classList.contains("th-sort-desc"))
})
headerMovesSplit.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["split", "type"], "split", asc = headerMovesSplit.classList.contains("th-sort-desc"))
})
headerMovesPower.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["power"], "power", asc = headerMovesPower.classList.contains("th-sort-desc"))
})
headerMovesAccuracy.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["accuracy"], "accuracy", asc = headerMovesAccuracy.classList.contains("th-sort-desc"))
})
headerMovesPP.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["PP"], "PP", asc = headerMovesPP.classList.contains("th-sort-desc"))
})
headerMovesEffect.addEventListener("click", () => {
    sortTableByClassName(movesTable, moves, ["effect"], "effect", asc = headerMovesEffect.classList.contains("th-sort-desc"))
})







headerSpeciesID.addEventListener("click", () => {
    if(speciesMoveFilter){
        sortTableByLearnsets(asc = !headerSpeciesID.classList.contains("th-sort-asc"))
    }
    else{
        sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = headerSpeciesID.classList.contains("th-sort-desc"))
    }
})
headerSpeciesSprite.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["ID"], "ID", asc = headerSpeciesSprite.classList.contains("th-sort-desc"))
})
headerSpeciesName.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["name"], "species", asc = headerSpeciesName.classList.contains("th-sort-desc"))
})
headerSpeciesTypes.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["type1", "type2"], "types", asc = headerSpeciesTypes.classList.contains("th-sort-desc"))
})
headerSpeciesAbilities.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["abilities"], "abilities", asc = headerSpeciesAbilities.classList.contains("th-sort-desc"))
})
headerSpeciesInnates.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["innates"], "innates", asc = headerSpeciesInnatestrue.classList.contains("th-sort-desc"))
})
headerSpeciesStarterCost.addEventListener("click", () => {
		sortTableByClassName(speciesTable, species, ["starterCost"], "starterCost", asc = headerSpeciesStarterCost.classList.contains("th-sort-desc"))
})
headerSpeciesHP.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseHP"], "baseHP", asc = headerSpeciesHP.classList.contains("th-sort-desc"))
})
headerSpeciesAtk.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseAttack"], "baseAttack", asc = headerSpeciesAtk.classList.contains("th-sort-desc"))
})
headerSpeciesDef.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseDefense"], "baseDefense", asc = headerSpeciesDef.classList.contains("th-sort-desc"))
})
headerSpeciesSpA.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseSpAttack"], "baseSpAttack", asc = headerSpeciesSpA.classList.contains("th-sort-desc"))
})
headerSpeciesSpD.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseSpDefense"], "baseSpDefense", asc = headerSpeciesSpD.classList.contains("th-sort-desc"))
})
headerSpeciesSpe.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["baseSpeed"], "baseSpeed", asc = headerSpeciesSpe.classList.contains("th-sort-desc"))
})
headerSpeciesBST.addEventListener("click", () => {
    sortTableByClassName(speciesTable, species, ["BST"], "BST", asc = headerSpeciesBST.classList.contains("th-sort-desc"))
})







let typingTimer
let doneTypingInterval = 300
speciesInput.addEventListener("input", e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        filterFilters(value)
        filterTableInput(value, species, ["name", "abilities", "innates"])
    }, doneTypingInterval)
})
abilitiesInput.addEventListener("input", e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        if(abilitiesIngameNameArray.includes(value)){
            abilitiesInput.blur()
        }
        filterFilters(value)
        filterTableInput(value, abilities, ["name", "ingameName", "description"])
    }, doneTypingInterval)
})
movesInput.addEventListener("input", e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        filterFilters(value)
        filterTableInput(value, moves, ["name", "ingameName", "effect", "description"])
    }, doneTypingInterval)
})
locationsInput.addEventListener("input", e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        filterFilters(value)
        filterLocationsTableInput(value, species, ["evolutionLine"])
    }, doneTypingInterval)
})
trainersInput.addEventListener('input', e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        filterFilters(value)
        filterTrainersTableInput(value)
    }, doneTypingInterval)
})
itemsInput.addEventListener('input', e => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(function(){
        const value = e.target.value
        filterFilters(value)
        filterItemsTableInput(value, ["description", "name"])
    }, doneTypingInterval)
})
speciesPanelInputSpecies.addEventListener("input", e => {
    const value = e.target.value
    if(speciesIngameNameArray.includes(value)){
        const species = `SPECIES_${value.replaceAll(" ", "_").toUpperCase()}`
        createSpeciesPanel(species)
        speciesPanelInputSpecies.blur()
        speciesPanelInputSpecies.value = ""
    }
})


speciesButton.addEventListener("click", async () => {
    if(!speciesButton.classList.contains("activeButton")){
        await tableButtonClick("species")
    }
})
abilitiesButton.addEventListener("click", async () => {
    if(!abilitiesButton.classList.contains("activeButton")){
        await tableButtonClick("abilities")
    }
})
locationsButton.addEventListener("click", async () => {
    if(!locationsButton.classList.contains("activeButton")){
        await tableButtonClick("locations")
    }
})
movesButton.addEventListener("click", async () => {
    if(!movesButton.classList.contains("activeButton")){
        await tableButtonClick("moves")
    }
})
trainersButton.addEventListener("click", async () => {
    if(!trainersButton.classList.contains("activeButton")){
        await tableButtonClick("trainers")
    }
})
itemsButton.addEventListener("click", async () => {
    if(!itemsButton.classList.contains("activeButton")){
        await tableButtonClick("items")
    }
})







changelogMode.addEventListener("click", () => {
    changelogMode.classList.toggle("activeSetting")
    lazyLoading(true)
})

onlyShowChangedPokemon.addEventListener("click", () => {
    onlyShowChangedPokemon.classList.toggle("activeSetting")

    for(let i = 0, j = speciesTracker.length; i < j; i++){
        if(onlyShowChangedPokemon.classList.contains("activeSetting")){
            if(species[speciesTracker[i]["key"]]["changes"].length === 0){
                speciesTracker[i]["filter"].push("changed")
            }
        }
        else{
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "changed")
        }
    }
    lazyLoading(true)
})
onlyShowStrategyPokemon.addEventListener("click", () => {
    onlyShowStrategyPokemon.classList.toggle("activeSetting")
    for(let i = 0, j = speciesTracker.length; i < j; i++){
        if(onlyShowStrategyPokemon.classList.contains("activeSetting")){
            if(!strategies[speciesTracker[i]["key"]]){
                speciesTracker[i]["filter"].push("strategy")
            }
        }
        else{
            tracker[i]["filter"] = tracker[i]["filter"].filter(value => value !== "strategy")
        }
    }
    lazyLoading(true)
})















const options = {
        root: null,
        rootMargins: "0px",
        threshold: 0
}

function footerIsTouching(entries){
    if(entries[0].isIntersecting){
        lazyLoading(false)
        settingsButton.classList.remove("hide")
        credits.classList.remove("hide")
        update.classList.remove("hide")
    }
    else{
        settingsButton.classList.add("hide")
        credits.classList.add("hide")   
        update.classList.add("hide")
    }
}


function speciesPanelIsTouching(entries){
    if(entries[0].isIntersecting){
        utilityButton.innerText = "X"
    }
    else{
        speciesPanel("hide")
        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}

function tableIsTouching(entries){
    if(entries[0].isIntersecting && tableInput.getBoundingClientRect().top <= 0){
        utilityButton.innerText = "☰"
    }
    else{
        if(table.getBoundingClientRect().top < 0){
            utilityButton.innerText = "↑"
        }
        else if(tableInput.getBoundingClientRect().top < 0){
            utilityButton.innerText = "☰"
        }
    }
}

function CreditsIsTouching(entries){
    if(entries[0].isIntersecting){
        lazyLoading(false)
    }
}

const observerFooter = new IntersectionObserver(footerIsTouching, options)
observerFooter.observe(document.getElementById("footer"))

const observeTable = new IntersectionObserver(tableIsTouching, options)
observeTable.observe(document.getElementById("observerCheck"))

const observeSpeciesPanel = new IntersectionObserver(speciesPanelIsTouching, options)
observeSpeciesPanel.observe(speciesPanelMainContainer)

const observeCredits = new IntersectionObserver(CreditsIsTouching, options)
observeCredits.observe(credits)




utilityButton.onclick = () => {
    utilityButtonOnClick()
}
document.addEventListener("keydown", e => {
    if(speciesPanelMainContainer.classList.contains("hide") && ((e.code == "F3") || (e.ctrlKey && e.code == "KeyF"))){ 
        // Block CTRL + F event
        e.preventDefault()
        document.getElementsByClassName("activeInput")[0].focus({focusVisible: true})
        document.getElementsByClassName("activeInput")[0].select()
    }
    if(e.target.nodeName !== "INPUT"){
        //e.preventDefault()
        if(e.code === "Space"){
            e.preventDefault()
            utilityButtonOnClick()
            if(typeof refreshURLParams !== "undefined"){
                refreshURLParams()
            }
        }    
        else if(e.code === "Enter" && panelSpecies !== ""){
            speciesPanel("toggle")
            if(typeof refreshURLParams !== "undefined"){
                refreshURLParams()
            }
        }
        else if(e.code === "Escape" || e.code === "Delete"){
            speciesPanel("hide")
            if(typeof refreshURLParams !== "undefined"){
                refreshURLParams()
            }
        }
    }
})
function utilityButtonOnClick(){
    if(utilityButton.innerText === "☰" && panelSpecies !== ""){
        speciesPanel("show")
        document.getElementById("speciesPanelMainContainer").scrollIntoView(true)
    }
    else if(utilityButton.innerText === "X"){
        speciesPanel("hide")
    }
    else{
        window.scrollTo({top: 0})
        utilityButton.innerText = "☰"
    }
}



overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
        overlay.style.display = 'none'
        body.classList.remove("fixed")
    }
})
overlayAbilities.addEventListener('click', function (event) {
    if (event.target === overlayAbilities) {
        overlayAbilities.style.display = 'none'
        body.classList.remove("fixedAbilities")
    }
})
overlaySpeciesPanel.addEventListener('click', function (event) {
    if (event.target === overlaySpeciesPanel) {
        speciesPanel("hide")
    }
})




settingsButton.addEventListener("click", async () => {
    while(popup.firstChild){
        popup.removeChild(popup.firstChild)
    }

    manageSettings()

    overlay.style.display = 'block'
    body.classList.add("fixed")
})

credits.addEventListener("click", () => {
    while(popup.firstChild){
        popup.removeChild(popup.firstChild)
    }
    const creditMainContainer = document.createElement("div")
    const creditRis = document.createElement("div"); creditRis.className = "credits"; creditRis.innerText = `Credit to ris (previously ris#0000 on discord) for:\n- Night theme\n- Sprite background removal function\n- Red button design\n- Species stats graph\n- Helping with CSS\n- Bitching and moaning about my CSS while this is literally my first ever website.`
    creditMainContainer.append(creditRis)
    popup.append(creditMainContainer)

    overlay.style.display = 'block'
    body.classList.add("fixed")
})

update.addEventListener("click", () => {
    clearLocalStorage()
    window.location.reload()
})

window.onbeforeunload = () => {  
    window.scrollTo(0, 0)
}


window.addEventListener('popstate', async () => {
    historyObj.pop()
    const temp = historyObj.length
    await displayHistoryObj(historyObj.slice(-1)[0])
    if(historyObj.length > 0){
        window.history.pushState(null, null, await refreshURLParams())
    }
    else{
        window.history.replaceState(null, null, await refreshURLParams())
    }

    while(historyObj.length > temp && temp > 0){
        historyObj.pop()
    }
})




const searchParams = new URLSearchParams(window.location.search)
let fetchDatainterval = setInterval(function() {
    if (typeof fetchData == 'undefined'){
        return
    }
    clearInterval(fetchDatainterval);

    if(window === window.parent){
        fetchData(searchParams)
    }
    else{
        footerP(`For the best experience, please visit ${window.location.href}`)
    }
}, 100)  