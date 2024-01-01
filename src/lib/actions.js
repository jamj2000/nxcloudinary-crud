'use server'
// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function getImages() {
  const result = await cloudinary.api.resources({
    max_results: 500,
    type: 'upload',
    prefix: 'galeria'
  });

  return result;
}


export async function imgCreate(formData) {
  const file = formData.get('file')

  console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {

        // Transformamos imagen al subirla
        // width: 600, height: 370, aspect-ratio: 1.62
        cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          folder: "galeria",
          public_id: file.name,
          aspect_ratio: "1.62",
          width: 600,
          crop: "fill",
          gravity: "center"
        })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result = await uploadToCloudinary();

    revalidatePath('/');
    return { type: 'success', message: `Imagen subida a ${result.public_id}` }
  } catch (error) {
    return { type: 'error', message: error.message }
  }
}



export async function imgUpdate(formData) {
  const public_id = formData.get('public_id')

  console.log(public_id);

  // try {
  //   const result = await cloudinary.uploader.destroy(public_id);
  //   console.log(result);
  //   revalidatePath('/');
  //   return { type: 'success', message: `Imagen eliminada de ${public_id}` }
  // } catch (error) {
  //   console.log(error);
  //   return { type: 'error', message: error.message }
  // }
  return
}



export async function imgDelete(formData) {
  const public_id = formData.get('public_id')

  console.log(public_id);

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log(result);
    revalidatePath('/');
    return { type: 'success', message: `Imagen eliminada de ${public_id}` }
  } catch (error) {
    console.log(error);
    return { type: 'error', message: error.message }
  }


}