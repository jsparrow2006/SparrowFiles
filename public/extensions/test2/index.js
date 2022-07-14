function main (context){
    // const {a, b} = context;
    let qq = setInterval(() => {
        // console.log(context)
    }, 500)

    return function (){
        this.click = () => {
            console.log('click extention 2')
        }

        this.stop = () => {
            clearInterval(qq)
            console.log('stop extention')
        }
    }
}
