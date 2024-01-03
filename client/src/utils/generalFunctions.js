export function shortName(image, username) {
    if(image?.length === 0){
        const noOfWords = username.split(" ");
        switch(noOfWords.length){
            case 1: 
                return noOfWords[0].slice(0,2).toUpperCase();
            case 2: 
                return noOfWords[0].slice(0,1).toUpperCase() + noOfWords[1].slice(0,1).toUpperCase();
            case noOfWords.length:
                return noOfWords[0].slice(0,1).toUpperCase() + noOfWords[noOfWords.length - 1].slice(0,1).toUpperCase();
            default: 
                return "NO"
        }
    }
}

export function getUserName(username) {
        const noOfWords = username.split(" ");
        switch(noOfWords.length){
            case 1: 
                return noOfWords[0].toUpperCase();
            case 2: 
                return noOfWords[0].toUpperCase() + noOfWords[1].toUpperCase();
            case noOfWords.length:
                return noOfWords[0].toUpperCase() + noOfWords[noOfWords.length - 1].toUpperCase();
            default: 
                return "NO"
        }
}