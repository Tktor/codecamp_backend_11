import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';

interface IFilesServiceUpload {
  file: FileUpload;
}

@Injectable()
export class FilesService {
  async upload({ file }: IFilesServiceUpload): Promise<string> {
    console.log(file);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'still-primer-377405',
      keyFilename: 'gcp-file-storage.json',
    }).bucket('khj-storage');

    // 1-2) 스토리지에 파일 올리기
    await new Promise((resolve, reject) => {
      file.createReadStream().pipe(
        storage
          .file(file.filename)
          .createWriteStream()
          .on('finish', () => {
            resolve('성공');
            console.log('성공');
          })
          .on('error', () => {
            reject('실패');
            console.log('실패');
          }),
      );
    });

    console.log('파일 전송이 완료되었습니다.');

    return '끝!';
  }
}
