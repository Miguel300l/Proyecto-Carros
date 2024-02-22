import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: 'dmzhkgiwu',
    api_key: '861822588542563',
    api_secret: 'xJwUK8yfgjsuIj77UXESHU2rpQc'
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'alejandra'
    }
});
