import businesses from "./businesses.js"

const outEl = document.querySelector("#output")
outEl.innerHTML = "<h1>Active Businesses</h1>"

businesses.businesses.forEach(business => {
  outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
      ${business.addressCity}
    </section>
    <section>
      ${business["addressStateCode"]}
    </section>
    <section>
      ${business["addressZipCode"]}
    </section>
  `
  outEl.innerHTML += "<hr/>"
});


const manufacturingBusinesses = businesses.businesses.filter(business => {
    let manufacturing = false
  
    if (business.companyIndustry === "Manufacturing") {
        manufacturing = true
    }
  
    return manufacturing
  })
  
outEl.innerHTML += "<h1>Manufacturing Businesses</h1>"
manufacturingBusinesses.forEach(business => {
  outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
      ${business.addressCity}
    </section>
    <section>
      ${business["addressStateCode"]}
    </section>
    <section>
      ${business["addressZipCode"]}
    </section>
  `
  outEl.innerHTML += "<hr/>"
});



outEl.innerHTML += "<h1>Purchasing Agents</h1>";

/*
    Using map(), you extract the purchasing agent object
    from each business and store it in a new array
*/
const agents = businesses.businesses.map(business => {
    return {
        fullName: business.purchasingAgent,
        company: business.companyName,
        phoneNumber: business.phoneWork
    }
})

console.table(agents)

agents.forEach(agent => {
  outEl.innerHTML += `<h2>${agent.fullName.nameFirst} ${agent.fullName.nameLast}</h2>`;
  outEl.innerHTML += `<h3>${agent.company}</h3>`;
  outEl.innerHTML += `<h3>${agent.phoneNumber}</h3>`;

  outEl.innerHTML += "<hr/>";
});




document
    .querySelector("#companySearch")
    .addEventListener("keypress", keyPressEvent => {
        if (keyPressEvent.charCode === 13) {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */
            const foundAgent = agents.find(
                agent => {
                    if (agent.fullName.nameLast.includes(keyPressEvent.target.value) || agent.fullName.nameFirst.includes(keyPressEvent.target.value)){
                    return true
                    }
                    return false
                });

            outEl.innerHTML = `
                <h2>
                ${foundAgent.fullName.nameFirst} ${foundAgent.fullName.nameLast}
                </h2>
                <section>
                ${foundAgent.company}

                </section>
                <section>
                ${foundAgent.phoneNumber}
                </section>
            `;
        }
    });

// let totalOrders = businesses.businesses.orders.reduce((currentTotal, nextValue) => currentTotal += nextValue, 0)

let totalOrders = businesses.businesses.map(business => {
  return business.orders.reduce((currentTotal, nextValue) => currentTotal += nextValue, 0).toPrecision(7)
})
console.log(totalOrders)