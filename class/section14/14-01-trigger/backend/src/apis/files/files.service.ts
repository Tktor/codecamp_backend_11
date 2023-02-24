import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { FileUpload } from 'graphql-upload';
import { resolve } from 'path';

interface IFilesServiceUpload {
  files: FileUpload[];
}

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    console.log(files);

    const waitedFiles = await Promise.all(files);

    console.log(waitedFiles); // [File, File]

    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'khj-storage';
    const storage = new Storage({
      projectId: 'still-primer-377405',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    console.time('시간을 확인해보자!');

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket} / ${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    console.timeEnd('시간을 확인해보자!');
    console.log('파일 전송이 완료되었습니다.');

    return results;
  }
}
