export const deepCopy = (target) => {
    return JSON.parse(JSON.stringify(target));
}

export const createUniqueString = (type = 'ID') => {
    const RANDOM_STRING_LENGTH = 5;

    const randomString = createRandomString(RANDOM_STRING_LENGTH);
    return `${type}-${Date.now()}${randomString}`;

    function createRandomString(length) {
        let result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}