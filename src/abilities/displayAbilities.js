function appendAbilitiesToTable(abilitiesName){

    if(!abilities[abilitiesName]["description"] || abilities[abilitiesName]["description"]?.length <= 0 || abilitiesName === "ABILITY_NONE"){
        return false
    }
    
    let tBody = abilitiesTableTbody

    let row = document.createElement("tr")

    row.setAttribute("id", `${abilitiesName}`)

    if(abilities[abilitiesName]["ID"]){
        let abilityID = document.createElement("td")
        abilityID.className = "abilityID"
        abilityID.innerText = abilities[abilitiesName]["ID"]
        row.append(abilityID)
    }

    let ability = document.createElement("td")
    const abilityName = document.createElement("span")
    ability.className = "ability"
    ability.innerText = abilities[abilitiesName]["ingameName"]
    abilityName.className = "key hide"
    abilityName.innerText = abilities[abilitiesName]["name"]
    ability.append(abilityName)

    row.append(ability)

    let description = document.createElement("td")
    description.className = "description"
    description.innerText = abilities[abilitiesName]["description"]
    row.append(description)

    row.addEventListener("click", async() => {
        if(!speciesButton.classList.contains("activeButton")){
            tracker = speciesTracker
            await tableButtonClick("species")
        }
        window.scrollTo({ top: 0})
        deleteFiltersFromTable()
        createFilter(abilities[abilitiesName]["ingameName"], "Ability")
    })

    tBody.append(row)
    return true
}
