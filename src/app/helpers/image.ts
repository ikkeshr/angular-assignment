export class Image {

    async imgUrlToFile(imgUrl: string): Promise<File> {
        const imgName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
        const response = await fetch(imgUrl); // param: url/location
        const blob = await response.blob();
        const file = new File([blob], imgName, {type: blob.type});
        // console.log(file);
        return file;
    }

}
