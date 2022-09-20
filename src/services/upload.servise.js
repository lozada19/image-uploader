import service from "./config.services"

const uploadService = (img) => {
    return service.post("/upload", img)
}

export {
    uploadService
}