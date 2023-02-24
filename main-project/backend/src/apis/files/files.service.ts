import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { getToday } from 'src/commons/liberies/utills';
import { IFilesServiceUpload } from './interfaces/files-service.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async fileUpload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files);

    const bucket = process.env.BUCKET_NAME;
    const storage = new Storage({
      projectId: process.env.STROAGE_ID,
      keyFilename: process.env.STROAGE_KEYNAME,
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            const filename = `${getToday()}/${uuidv4()}/origin/${el.filename}`;

            el.createReadStream()
              .pipe(storage.file(filename).createWriteStream())
              .on('finish', () => resolve(`${bucket} / ${filename}`))
              .on('error', (error) => {
                reject('실패');
                console.log(error);
              });
          }),
      ),
    );

    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
