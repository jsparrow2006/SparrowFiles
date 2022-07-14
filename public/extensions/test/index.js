function main (context){
    const { modalService, views } = context;
    const { testModalView } = views;
    let counter = 0;
    setInterval(() => {
        counter++;
        let count = testModalView.querySelector('#count')
        count.innerHTML = counter;
    }, 1000)

    return function (){
        this.click = () => {
            console.log('click extention')
            modalService.prepareModal('Test modal view', views.testModalView)
            modalService.openModal()
        }

        this.stop = () => {
            console.log('stop extention')
        }

        this.aa = {
            type: 'method',
            name: 'Some method',
            description: 'some description method',
            call: () => {
                console.log('aa')
            }
        }
    }
}
