let allAiData = [];
let displayedCount = 6;
const loadAi = async() =>{
       const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
       const data = await res.json();
       allAiData = data.data.tools
       DisplayAiData(allAiData.slice(0, displayedCount))
}
const DisplayAiData = (AiData) =>{
       // console.log(AiData)
       const AiSectionContainer = document.getElementById("Ai-Section-Container")
       // AiData = AiData.slice(0, 6);
       AiData.forEach((AiCard) =>{
              console.log(AiCard)
              const aiCardDiv = document.createElement("div")
              aiCardDiv.classList = "card bg-gray-100 w-80 pt-5 shadow-xl"
              aiCardDiv.innerHTML = `
                     <figure>
                            <img class="px-5" src="${AiCard.image}" />
                     </figure>
                     <div class="card-body">
                            <h2 class="card-title">Features:</h2>
                            <ul>
                                   <li>1. ${AiCard.features[0]}</li>
                                   <li>2. ${AiCard.features[1]}</li>
                                   <li>3. ${AiCard?.features[2] || ""}</li>
                            </ul>
                            <hr class="border-t-[2px] border-gray-300 border-dotted">
                            <p class="font-semibold text-2xl">${AiCard.name}</p>
                            <p>Publish Date: ${AiCard.published_in}</p>
                            <div class="card-actions justify-center mt-2">
                            <button onclick = "handleShowDetails('${AiCard.id}')" class="btn btn-primary">Show Details</button>
                            </div>
                     </div>
              `;
              AiSectionContainer.appendChild(aiCardDiv)
       })
}
const handleShowDetails = async(aiCardID) =>{
       console.log("click", aiCardID)
       const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${aiCardID}`)
       const data = await res.json();
       const aiDetails = data.data;
       showAiDetails(aiDetails)
}
const showAiDetails = (aiDetails) =>{
       console.log(aiDetails)
       const modelBox1 = document.getElementById("Model-Box1")
       const modelBox2 = document.getElementById("Model-Box2")
       modelBox1.innerHTML = `
              <h2>${aiDetails.description}</h2>
       `
       modelBox2.innerHTML = `
              <h2>${aiDetails.pricing}</h2>
              <span>${aiDetails.pricing[1].plan}:</span> <span>${aiDetails.pricing[1].price}</span>
       `;
       my_modal_3.showModal();
}

const loadMoreAi = () =>{
       displayedCount += 6;
       const newAiData = allAiData.slice(displayedCount - 6, displayedCount)
       DisplayAiData(newAiData);
       if (displayedCount >= allAiData.length) {
              document.getElementById('see-more-btn').style.display = 'none';
       }
}

loadAi()