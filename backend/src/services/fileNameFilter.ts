import fs from 'fs';
import path from 'path';

const fileNameFilter = (fileName: string) => {
    const filesList = fs.readdirSync(path.join(__dirname,'../uploads'));

    const filteredImages = filesList.filter(names => {
        if (names.toLowerCase().includes(fileName.toLowerCase())){
            return names
        }

    })

    return filteredImages
}

export default fileNameFilter