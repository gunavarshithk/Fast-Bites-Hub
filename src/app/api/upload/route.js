import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req){
    const data=await req.formData();
    if(data.get('file')){
        const file=data.get('file');
        const s3Client=new S3Client(
            {
                region:'us-east-1',
                credentials:{
                    accessKeyId:process.env.MY_AWS_ACCESS_KEY,
                    secretAccessKey:process.env.MY_AWS_SECRET_KEY,
                },
            }
        );
        const ext=file.name.split('.').slice(-1)[0];//to get extension of the file
        const newFileName=uniqid()+'.'+ext;//to generate random name of file
        
        const chunks=[];
        for await(const chunk of file.stream()){
            chunks.push(chunk);
        }
        const buffer=Buffer.concat(chunks);
        const bucketName='fastbiteshub'
        await s3Client.send(new PutObjectCommand({
            Bucket:bucketName,
            Key:newFileName,
            ACL:'public-read',//learn about this
            ContentType:file.type,
            Body:buffer
        }));
        const link='https://'+bucketName+'.s3.amazonaws.com/'+newFileName;
        
        return Response.json(link);
    }
    return Response.json(true);
}