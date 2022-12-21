const body = document.querySelector('body')

export function openModal (content){
    const backgroundContainer = document.createElement('section')
    backgroundContainer.classList.add('modal-background')

    const mainContainer = document.createElement('section')
    mainContainer.classList.add('modal-container')

    const closeModalButton = document.createElement('button')
    closeModalButton.classList.add('modal-close')
    closeModalButton.innerText = "X"
    
    backgroundContainer.addEventListener('click',(event)=>{
        const {className} = event.target
        if(className === "modal-background" || className === "modal-close" ){
            backgroundContainer.remove()
        }
    })


    mainContainer.append(closeModalButton)
    mainContainer.append(content)
    backgroundContainer.append(mainContainer)
    body.append(backgroundContainer)

}